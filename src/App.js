import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './Components/Post/PostList';
import UserList from './Components/User/UserList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>,
    </div>
  );
}

export default App;
