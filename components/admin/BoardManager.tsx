"use client";

import React, { useState, useRef, useEffect } from "react";

const Container: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("작성자");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // 타입 명시

  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      // contains 오류 수정
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 border-b">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            type="button"
            className="py-2 px-4 bg-gray-100 text-gray-800 rounded-md shadow-md focus:ring focus:ring-opacity-50"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            {selectedOption}
          </button>
          {/* Dropdown content */}
          {dropdownVisible && (
            <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1">
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => handleDropdownChange("작성자")}
                >
                  작성자
                </li>
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => handleDropdownChange("제목")}
                >
                  제목
                </li>
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => handleDropdownChange("내용")}
                >
                  내용
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Search input */}
        <div className="flex items-center">
          <input
            type="text"
            className="py-2 px-4 rounded-l-md border border-r-0 focus:ring focus:ring-opacity-50"
            placeholder={`Search by ${selectedOption}`}
          />
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 text-white rounded-r-md shadow-md focus:ring focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </div>
      {/* Separator */}
      <hr className="w-full border-t mb-4" />
      {/* Table */}
      <div className="w-full p-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">작성자</span>
          <span className="text-gray-600">제목</span>
          <span className="text-gray-600">내용</span>
          <span className="text-gray-600">생성/수정일</span>
        </div>
        {/* Render data here */}
        {/* Example row */}
        <div className="flex justify-between items-center py-2">
          <span>John Doe</span>
          <span>Example Title</span>
          <span>Example Content</span>
          <span>2023-08-25</span>
        </div>
        {/* Add more rows */}
      </div>
    </div>
  );
};

export default Container;
