// pages/index.tsx
"use client"
import type { NextPage } from 'next';
import LineChartComponent from '../../../components/admin/LineChart';
import useFetchData from '../../api/analyticsdata/useFetchData';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import DatePicker from "react-datepicker";
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from '../../../components/admin/Sidebar';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const Home: NextPage = () => {
    const dim = 'date';  // 필요에 따라 변경
    const met = 'active1DayUsers';     // 필요에 따라 변경
    const [startDate, setStartDate] = useState(new Date());  // 현재 날짜로 초기화
    const [endDate, setEndDate] = useState(new Date());      // 현재 날짜로 초기화

    const { data, loading, error } = useFetchData(dim, met, startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10));

    console.log(data);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow bg-gray-100 p-8 flex-grow-1">
                <h1>대시보드</h1>
                <div>
                    <label>Start Date:</label>
                    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
                </div>

                <div>
                    <label>End Date:</label>
                    <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} dateFormat="yyyy-MM-dd" />
                </div>

                {loading ? <p>Loading...</p> :
                    error ? <p>날짜를 선택하세요</p> :
                        <LineChartComponent data={data} />}
            </div>
        </div>
    );
};

export default Home;
