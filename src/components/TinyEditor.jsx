import { useRef } from 'react';
import './TinyEditor.css';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
  const editorRef = useRef(null);
  const advtemplate_templates = [
    {
      title: 'Homework Help',
      items: [
        {
          title: 'Homework Help General',
          content: '<p dir="ltr">Hey {{Student.FirstName}}!</p>\n<p dir="ltr"> I received your question regarding the homework problem. This is what you need to solve this:</p>\n<p dir="ltr">If you need further clarification, please refer to the lecture notes from last week, or feel free to ask me questions on the steps you are getting stuck at.</p>\n<p dir="ltr">Regards,</p><p dir="ltr">{{Professor.FirstName}}</p>'
        },
        {
          title: 'Homework Help for exam',
          content: '<p dir="ltr">Hello {{Student.FirstName}},</p><p dir="ltr">I understand you are preparing for the upcoming exam and have some questions about the topics we have covered. Here is a detailed explanation to help you understand better:</p><p dir="ltr">For more examples and detailed explanations, please review our class notes or the recommended textbook chapters. If you have further questions, do not hesitate to reach out or schedule a one-on-one session.</p><p dir="ltr">Good luck with your studies!</p><p dir="ltr">Warm regards,</p><p dir="ltr">{{Professor.FirstName}} {{Professor.LastName}}</p>'
        }
      ]
    },
    {
      title: 'Exam Help',
      items: [
        {
          title: 'Follow up on exam preparation',
          content: ' <p dir="ltr">Hi {{Student.FirstName}},</p><p dir="ltr">I hope your exam preparation is going well. I wanted to follow up and see if you have any more questions or need further explanations on any of the topics we have discussed.</p><p dir="ltr">Remember, practicing past exam questions can be particularly helpful. Let me know if you need a list of practice questions or additional resources.</p><p dir="ltr">Do not hesitate to reach out. My goal is to ensure you feel confident and prepared for your exam.</p><p dir="ltr">Best regards,</p><p dir="ltr">{{Professor.FirstName}} {{Professor.LastName}}</p>'
        },
      ]
    },
    {
      title: 'Class Help',
      items: [
        {
          title: 'Assistance with Class Materials',
          content: '<p dir="ltr">Hello {{Student.FirstName}},</p><p dir="ltr">I have noticed you might need some extra help with the topics we have recently covered in class. Here is a brief overview to aid your understanding:</p><!-- Brief explanation of recent topics --><p dir="ltr">I strongly encourage you to attend our group study sessions every Thursday after class, where we can go over these topics in detail. Additionally, please consult the supplementary materials uploaded on the course website.</p><p dir="ltr">If you have any specific areas where you are struggling, please let me know, and we can arrange a one-on-one meeting to address them directly.</p><p dir="ltr">Looking forward to seeing you in class!</p><p dir="ltr">Best wishes,</p><p dir="ltr">{{Professor.FirstName}} {{Professor.LastName}}</p>'
        }
      ]
    }
  ];

  const fetchApi = import("https://unpkg.com/@microsoft/fetch-event-source@2.0.1/lib/esm/index.js").then(module => module.fetchEventSource);


  const openai_api_key = 'OPENAI_API_KEY';

  const ai_request =  (request, respondWith) => respondWith.stream(async (signal, streamMessage) => {
    // Adds each previous query and response as individual messages
    const conversation = request.thread.flatMap((event) => {
      if (event.response) {
        return [
          { role: 'user', content: event.request.query },
          { role: 'assistant', content: event.response.data }
        ];
      } else {
        return [];
      }
    });
  
    // System messages provided by the plugin to format the output as HTML content.
    const pluginSystemMessages = request.system.map((content) => ({
      role: 'system',
      content
    }));
  
    const systemMessages = [
      ...pluginSystemMessages,
      // Additional system messages to control the output of the AI
      { role: 'system', content: 'Do not include html\`\`\` at the start or \`\`\` at the end.' },
      { role: 'system', content: 'No explanation or boilerplate, just give the HTML response.' }
    ];
  
    // Forms the new query sent to the API
    const content = request.context.length === 0 || conversation.length > 0
      ? request.query
      : `Question: ${request.query} Context: """${request.context}"""`;
  
    const messages = [
      ...conversation,
      ...systemMessages,
      { role: 'user', content }
    ];
  
    const requestBody = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 800,
      messages,
      stream: true
    };
  
    const openAiOptions = {
      signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openai_api_key}`
      },
      body: JSON.stringify(requestBody)
    };
  
    const onopen = async (response) => {
      if (response) {
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType?.includes('text/event-stream')) {
          return;
        } else if (contentType?.includes('application/json')) {
          const data = await response.json();
          if (data.error) {
            throw new Error(`${data.error.type}: ${data.error.message}`);
          }
        }
      } else {
        throw new Error('Failed to communicate with the ChatGPT API');
      }
    };
  
    // This function passes each new message into the plugin via the `streamMessage` callback.
    const onmessage = (ev) => {
      const data = ev.data;
      if (data !== '[DONE]') {
        const parsedData = JSON.parse(data);
        const firstChoice = parsedData?.choices[0];
        const message = firstChoice?.delta?.content;
        if (message) {
          streamMessage(message);
        }
      }
    };
  
    const onerror = (error) => {
      // Stop operation and do not retry by the fetch-event-source
      throw error;
    };
  
    // Use microsoft's fetch-event-source library to work around the 2000 character limit
    // of the browser `EventSource` API, which requires query strings
    return fetchApi
    .then(fetchEventSource =>
      fetchEventSource('https://api.openai.com/v1/chat/completions', {
        ...openAiOptions,
        openWhenHidden: true,
        onopen,
        onmessage,
        onerror
      })
    )
    .then(async (response) => {
      if (response && !response.ok) {
        const data = await response.json();
        if (data.error) {
          throw new Error(`${data.error.type}: ${data.error.message}`);
        }
      }
    })
    .catch(onerror);
  });

  return (
    <Editor
      apiKey='TINY_MCE_API_KEY'
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'ai link code math a11ychecker advtemplate tinymcespellchecker wordcount autocorrect fullscreen powerpaste preview',
        toolbar: 'undo redo | spellchecker language math spellcheckdialog a11ycheck wordcount | inserttemplate aidialog aishortcuts | bold italic | alignleft aligncenter alignright | fullscreen preview',
        contextmenu: 'advtemplate',
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'prompt',
        powerpaste_html_import: 'prompt',
        powerpaste_googledocs_imports: 'prompt',
        advtemplate_templates,
        ai_request
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}