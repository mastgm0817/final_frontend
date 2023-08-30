"use client"
import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import CouponManager from "../../../components/admin/CouponManager";
const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content */}
      <div className="flex-grow bg-gray-100 p-8"> 
        <CouponManager />
      </div>
    </div>
  );
};

export default App;
