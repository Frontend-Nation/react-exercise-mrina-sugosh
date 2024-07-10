import { useRef } from 'react';
import './TinyEditor.css';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey='jv324dncax6j46m2cpy54igo82jhhziwdpmurp3x84e5kyuq'
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'advcode code image editimage fullscreen preview wordcount math',
        toolbar: 'undo redo blocks |  bold italic underline | strikethrough forecolor backcolor align subscript superscript | charmap blockquote | code fullscreen preview | image math',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}