
"use client"
import { counter } from "../../app/api/admin/visitCounterAPI"
import React,{ useEffect,useState } from 'react';

const Visitors = () =>{
    const [totalVisitors, setTotalVisitors] = useState<any>(null);
    useEffect(() => {
    // Fetch the total visitors count from the API
    const fetchTotalVisitors = async () => {
        try {
        const data = await counter(); // Call the API function
        setTotalVisitors(data); // Update the state with the fetched data
        console.log(data)
        } catch (error) {
        console.error("Error fetching total visitors:", error);
        }
    };

    fetchTotalVisitors(); // Call the fetch function
    }, []); // Empty dependency array to run the effect only once

    return (
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4" >  
              <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-800">
                  <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                        총 방문자
                  </p>
                  <div className="flex items-end my-6 space-x-2">
                      <p className="text-5xl font-bold text-black dark:text-white">
                          2
                      </p>

                  </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 shadow-md h-64">
            게시글 관련 (추천많은? 조회많은? 검색? 전체? 최신? 유해?) 
          </div>
        </div>
    );
  };

export default Visitors;