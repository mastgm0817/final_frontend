"use client"
import React from 'react';
import KakaoMap from '../../components/Kakaomap';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const Home: React.FC = () => {
  const { latitude, longitude } = useSelector((state:RootState) => state.position);
  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    
      <KakaoMap /> 
    </div>
  );
  };
export default Home;