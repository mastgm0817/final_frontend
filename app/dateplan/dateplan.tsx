import React from 'react';
import { useState } from 'react';
import KakaoMap from '../../components/Kakaomap';
import { useSelector } from 'react-redux';
import { PositionState } from '../../store/position';
import { createPosition } from '../../store/position';

const Home: React.FC = () => {
  const { latitude, longitude } = useSelector((state) => state.position);
  


  // 이제 이 컴포넌트에서 Redux 스토어의 latitude와 longitude를 사용할 수 있습니다.

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    
      <KakaoMap userPosition={{ latitude, longitude }} /> 
    </div>
  );

};

export default Home;
