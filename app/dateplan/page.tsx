"use client"
import React, { useState } from 'react';
import KakaoMap from '../../components/dateplan/Kakaomap';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
return (
  <div>
    <KakaoMap />
  </div>
  );
};

export default Home;