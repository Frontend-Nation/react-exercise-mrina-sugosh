import { useRef } from 'react';
import './TinyEditor.css';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor() {
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey='TINMCE_API_KEY'
      onInit={(_evt, editor) => editorRef.current = editor}
      init={{
        plugins: 'advcode code image editimage fullscreen preview wordcount math linkchecker lists markdown powerpaste typography',
        toolbar: 'undo redo blocks |  bold italic underline | strikethrough forecolor backcolor align subscript superscript | bullist numlist  | typography charmap blockquote | code fullscreen preview | image math',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}