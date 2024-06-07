import { useRef } from 'react';
import './TinyEditor.css';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey='TINY_MCE_API_KEY'
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'link image code markdown math a11ychecker tinymcespellchecker wordcount autocorrect fullscreen powerpaste preview',
        toolbar: 'undo redo | spellchecker language math spellcheckdialog a11ycheck wordcount | inserttemplate addtemplate | aidialog aishortcuts | bold italic | alignleft aligncenter alignright | addcomment showcomments | fullscreen preview',
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'prompt',
        powerpaste_html_import: 'prompt',
        powerpaste_googledocs_imports: 'prompt',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}