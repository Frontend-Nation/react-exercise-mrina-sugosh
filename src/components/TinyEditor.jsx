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
        plugins: 'advcode code editimage fullscreen preview wordcount math linkchecker lists markdown powerpaste typography charmap checklist emoticons footnotes image link media mediaembed mergetags table tableofcontents',
        toolbar: 'undo redo blocks |  bold italic underline | strikethrough forecolor backcolor align subscript superscript | bullist numlist checklist link  | typography charmap blockquote | image media math | footnotes mergetags table charmap emoticons | code fullscreen preview',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}