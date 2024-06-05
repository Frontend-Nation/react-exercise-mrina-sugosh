import Sidebar from './components/Sidebar.jsx';
import Content from './components/Content.jsx';
import Button from './components/Button.jsx';
import './App.css';

export default function App() {
  return (
    <div id="app">
      <Sidebar />
      <div className='content'>
        <Content />
        <input className="editorInput" type="text" placeholder="Replace with TinyMCE Editor" />
        <Button />
      </div>
    </div>
  );
}