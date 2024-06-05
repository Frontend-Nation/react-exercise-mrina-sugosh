import './Sidebar.css';

export default function Sidebar() {

  return (
    <nav id="sidebar">
        <div className="sidebar-header">
            <h2>Courses</h2>
        </div>
        <ul className="list-unstyled components">
            <li><a href="#">Home</a></li>
            <li><a href="#">Announcements</a></li>
            <li><a href="#">Syllabus</a></li>
            <li><a href="#">Modules</a></li>
            <li><a href="#">Assignments</a></li>
            <li><a href="#">Quizzes</a></li>
            <li><a href="#">Discussions</a></li>
            <li><a href="#">Grades</a></li>
        </ul>
    </nav>
  );
}