import { useRef } from 'react';
import './TinyEditor.css';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey='TINYMCE_API_KEY'
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'advcode code editimage fullscreen preview wordcount math',
        toolbar: 'undo redo blocks |  bold italic underline | strikethrough forecolor backcolor align subscript superscript | charmap blockquote | fullscreen preview math',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}