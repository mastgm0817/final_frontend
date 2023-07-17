import './App.css';
import { Link } from 'react-router-dom';
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
    </div>
  );
}

export default App;
