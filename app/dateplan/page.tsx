"use client"
import React, { useState } from 'react';
import KakaoMap from '../../components/Kakaomap';
import RecommendResult from '../../components/RecommendResult';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSession } from 'next-auth/react';
import RecommendForm from '../../components/RecommendForm';
import predict from '../api/dateplan/dateplanApi';
import { json } from 'stream/consumers';

interface RecommendFormData {
  user_latitude: string;
  user_longitude: string;
  food: string;
  storeCondition: number;
  service: number;
  ambiance: number;
  taste: number;
  kindness: number;
  quantity:number;
}
const Home: React.FC = () => {
  const position = useSelector((state: RootState) => state.position);
  const { data: session } = useSession();
  const userName = `${session ? session.user?.name : null}`;
  const [result, setResult] = useState<any>(null);

  const handleSubmitForm = async (formData: RecommendFormData) => {
    try {
      const predictionResult = await predict(formData);
      console.log('Prediction result:', result);

      setResult(predictionResult);
      // Now you have the prediction result, you can update the UI or take any other actions based on the result.
    } catch (error) {
      console.error('Error while predicting:', error);
      // Handle the error if the prediction fails.
    }
  };

return (
  <div>
    <p>{userName}</p>
      <p>Latitude: {position.latitude ?? ''}</p>
      <p>Longitude: {position.longitude ?? ''}</p>
    <KakaoMap />
    <RecommendForm position={position} onSubmit={handleSubmitForm} />
    <RecommendResult results={result} />
  </div>
);
};

export default Home;