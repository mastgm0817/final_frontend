"use client"
import React, { useState } from 'react';
import KakaoMap from '../../components/Kakaomap';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const { data: session } = useSession();
  const userName = `${session ? session.user?.name : null}`;

return (
  <div>
    
    <KakaoMap />
  </div>
  );
};

export default Home;