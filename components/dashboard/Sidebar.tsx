"use client";
import React from "react";

const Sidebar = () =>{
    return(
        <div className="relative bg-white dark:bg-gray-800 w-1/4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="h-screen w-72">
                    <nav className="mt-10 px-6 ">
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="visitors">
                            <span className="mx-4 text-lg font-normal">
                                방문자 통계
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-600" href="boards">
                            <span className="mx-4 text-lg font-normal">
                                게시판 관리
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="users">
                            <span className="mx-4 text-lg font-normal">
                                사용자 관리(User)
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="coupons">
                            <span className="mx-4 text-lg font-normal">
                                쿠폰 생성/발급 상태 확인
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;