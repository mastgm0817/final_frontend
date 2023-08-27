import React from 'react';
import Sidebar from '../../components/admin/Sidebar';

const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content */}
      <div className="flex-grow bg-gray-100 p-8">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default App;
