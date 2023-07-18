import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }
  const goToPost = () => {
    navigate('/posts');
  }
  const goToUser = () => {
    navigate('/users');
  }
    
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={goToHome}>Go Home </button>
      <button onClick={goToPost}>Go to Post page</button>
      <button onClick={goToUser}>Go to User page</button>
      </header>
    </div>
  );
}

export default App;
