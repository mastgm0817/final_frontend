"use client"
import React from 'react';
import KakaoMap from '../../components/Kakaomap';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const Home: React.FC = () => {
  const { latitude, longitude } = useSelector((state:RootState) => state.position);
  return (
    <div>
      <KakaoMap /> 
    </div>
  );
  };
export default Home;