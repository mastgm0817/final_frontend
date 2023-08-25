import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import UserManager from "../../../components/admin/UserManager";
const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content */}
      <div className="flex-grow bg-gray-100 p-8"> 
        <UserManager />
      </div>
    </div>
  );
};

export default App;
