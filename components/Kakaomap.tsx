"use client"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPosition } from '../store/position';
import '../public/css/dateplan.css';
import predict from '../app/api/dateplan/dateplanApi';
import RecommendForm from './RecommendForm';
import RecommendResult from './RecommendResult';

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

declare const window: typeof globalThis & {
  kakao: any;
}


const KakaoMap: React.FC = () => {
  const [kakaoMapLoaded, setKakaoMapLoaded] = useState(false);
  const [userPosition, setUserPosition] = useState<GeolocationPosition | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    console.log("Toggling form:", !showForm); // 상태 변경 로그
  };

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


  const dispatch = useDispatch();
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        setKakaoMapLoaded(true);
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition(position);
          const { latitude, longitude } = position.coords;
          dispatch(createPosition(latitude, longitude));
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, [dispatch]);

  useEffect(() => {
    if (kakaoMapLoaded && userPosition) {
      const { latitude, longitude } = userPosition.coords;
      const mapContainer = document.getElementById('map');

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      var mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
      var zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
      if (result) {
        result.forEach((item: any) => {
          const resultMarkerPosition = new window.kakao.maps.LatLng(item.latitude, item.longitude);
          const resultMarker = new window.kakao.maps.Marker({
            position: resultMarkerPosition,
          });
          resultMarker.setMap(map); // 마커를 지도에 렌더링합니다.
       });
      }
    }
  }, [kakaoMapLoaded, userPosition]); // kakaoMapLoaded, userPosition, result가 변경될 때마다 실행됩니다.

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div id="map-container" className="relative" style={{ height: '900px', width: '100%' }}>
        <div id="map" className="flex w-full h-700px" style={{ height: '600px', width: '100%' }}>
        </div>
        <div className="button-container absolute bottom-0 right-0">
          <button
            onClick={handleToggleForm}
            className="bg-pink-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl" // text 크기 조절
          >
            {showForm ? '-' : '+'}
          </button>
        </div>
        {showForm && (
          <div className={`form-container ${showForm ? 'open' : ''}`}>
            <RecommendForm onSubmit={handleSubmitForm} />
          </div>
      )}
        <div id="result-container" className="flex w-full h-300px">
          <RecommendResult results={result} />
      </div> {/* 이 부분에서 닫는 태그 수정 */}
    </div>
    </div>
  );
};

export default KakaoMap;