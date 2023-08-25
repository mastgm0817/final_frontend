import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import BoardManager from "../../../components/admin/BoardManager"
const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content */}
      <div className="flex-grow bg-gray-100 p-8">
        게시판 관리 페이지  
        <BoardManager />
      </div>
    </div>
  );
};

export default App;
