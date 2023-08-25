import React from 'react';
import "../../public/css/admin.css"
const Sidebar: React.FC = () => {
  return (
    <div className="bg-color-#e5e7eb text-black w-40 h-screen flex flex-col shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Sidebar</h1>
      </div>
      <nav className="flex-grow">
        <ul className="p-4">
          <li className="mb-2">
            <a href="/admin/BoardManager" className="text-blue-300 hover:text-blue-500">게시판 관리</a>
          </li>
          <li className="mb-2">
            <a href="/admin/CouponManager" className="text-blue-300 hover:text-blue-500">쿠폰 발급/현황</a>
          </li>
          <li className="mb-2">
            <a href="/admin/UserManager" className="text-blue-300 hover:text-blue-500">사용자 정보 조회</a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
