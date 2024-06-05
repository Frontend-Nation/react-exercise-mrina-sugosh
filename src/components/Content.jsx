import './Content.css';

export default function Content() {

  return (
    <>
        <header>
            <h1>Week 2 Q&A</h1>
            <div className="thread-info">
                <p>Each thread is based on the current module and will be available concurrently with the module. Threads will be open or closed for comments at the professor's discretion. Threads closed for comments will still be available for review at the bottom of the Discussions page. This forum will be monitored regularly by course support staff.</p>
            </div>
        </header>
        <div className="search-bar">
            <input type="text" placeholder="Search entries or author" />
            <button>Unread</button>
        </div>
        <div className="thread-header">
            <h2>Student Question: Calculus II - Homework I</h2>
            <p>Posted by: Student123</p>
        </div>
        <div className="thread-content">
            <p>I am stuck and not sure how to proceed on the Problem 1 on how to integrate ∫ x e^x dx. Also, this class is so hard that I am worried how much the homework will affect my grades.</p>
        </div>
    </>
  );
}