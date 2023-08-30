import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import InquiryManager from "../../../components/admin/InquiryManager";
const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content */}
      <div className="flex-grow bg-gray-100 p-8 flex-grow-1"> 
        <InquiryManager />
      </div>
    </div>
  );
};


export default App;
