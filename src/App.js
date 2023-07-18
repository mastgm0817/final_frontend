import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './Components/Post/PostList';
import UserList from './Components/User/UserList';


function App() {
  return (
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/posts">게시판</Link>
          </li>
          <li>
            <Link to="/users">사용자</Link>
          </li>
        </ul>
      </nav>
  );
}

export default App;
