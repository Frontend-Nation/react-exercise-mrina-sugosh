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
  return (
    <Editor
      apiKey='TINY_MCE_API_KEY'
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'link code math a11ychecker advtemplate tinymcespellchecker wordcount autocorrect fullscreen powerpaste preview',
        toolbar: 'undo redo | spellchecker language math spellcheckdialog a11ycheck wordcount | inserttemplate | bold italic | alignleft aligncenter alignright | fullscreen preview',
        contextmenu: 'advtemplate',
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'prompt',
        powerpaste_html_import: 'prompt',
        powerpaste_googledocs_imports: 'prompt',
        advtemplate_templates,
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}