"use client"
import React, { useState } from 'react';
import KakaoMap from '../../components/Kakaomap';
import RecommendResult from '../../components/RecommendResult';
import { useSession } from 'next-auth/react';
import RecommendForm from '../../components/RecommendForm';
import { json } from 'stream/consumers';

const Home: React.FC = () => {
  const { data: session } = useSession();
  const userName = `${session ? session.user?.name : null}`;

return (
    <div className="relative h-full w-full">
      <KakaoMap />
    </div>
  );
};

export default Home;