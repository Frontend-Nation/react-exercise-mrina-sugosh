import Sidebar from './components/Sidebar.jsx';
import Content from './components/Content.jsx';
import Button from './components/Button.jsx';
import TinyEditor from './components/TinyEditor.jsx';
import './App.css';

export default function App() {
  return (
    <div id="app">
      <Sidebar />
      <div className='content'>
        <Content />
        <TinyEditor />
        <Button />
      </div>
    </div>
  );
}