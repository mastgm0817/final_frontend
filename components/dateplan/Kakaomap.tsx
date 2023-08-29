"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPosition } from "../../store/position";
import predict from "../../app/api/dateplan/dateplanApi";
import RecommendForm from "./RecommendForm";
import RecommendResult from "./RecommendResult";
import { useSession } from "next-auth/react";
import "./../../public/css/dateplan.css";

interface RecommendFormData {
  user_latitude: string;
  user_longitude: string;
  food: string;
  storeCondition: number;
  service: number;
  ambiance: number;
  taste: number;
  kindness: number;
  quantity: number;
}

declare const window: typeof globalThis & {
  kakao: any;
};

const KakaoMap: React.FC = () => {
  const [kakaoMapLoaded, setKakaoMapLoaded] = useState(false);
  const [userPosition, setUserPosition] = useState<GeolocationPosition | null>(
      null
  );
  const [map, setMap] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const session = useSession();
  const token = session.data?.user.id;

  

  const handleSubmitForm = async (formData: RecommendFormData) => {
    try {
      const predictionResult = await predict(formData, token);
      setResult(predictionResult);
    } catch (error) {
      console.error("Error while predicting:", error);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const mapScript = document.createElement("script");
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
            console.error("Error getting user location:", error);
          }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, [dispatch]);
  const [showMarkers, setShowMarkers] = useState(false); // 마커 보여줄지 말지 결정하는 state

  const handleShowMarkers = (index: number) => {
    setShowMarkers(true);
    setCourseIndex(index);
    
  };
  const OFFSET = 0.0001;  // 적절한 값을 선택하세요.
  const [courseIndex, setCourseIndex] = useState<number | null>(null);  // 현재 표시할 코스의 인덱스를 저장하는 state
  const [markers, setMarkers] = useState<any[]>([]);  // 마커들을 저장하는 state

  useEffect(() => {
    if (kakaoMapLoaded && userPosition) {
      const { latitude, longitude } = userPosition.coords;
      const mapContainer = document.getElementById("map");

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(kakaoMap);

      var mapTypeControl = new window.kakao.maps.MapTypeControl();
      kakaoMap.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
      );

      var zoomControl = new window.kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(kakaoMap);
    }
  }, [kakaoMapLoaded, userPosition]);

  useEffect(() => {
    if (showMarkers && map && Array.isArray(result) && courseIndex !== null && result.length > courseIndex) {
      const restaurantPredictions = result[courseIndex].restaurant_prediction;

      // 이전에 생성된 마커들을 지도에서 제거합니다.
      markers.forEach(marker => marker.setMap(null));

      const newMarkers: any[] = [];
      restaurantPredictions.forEach((restaurant: any, index: number) => {
        if (restaurant.latitude && restaurant.longitude) {
          const restaurantPosition = new window.kakao.maps.LatLng(restaurant.latitude + OFFSET * index, restaurant.longitude + OFFSET * index);
          const restaurantMarker = new window.kakao.maps.Marker({
            position: restaurantPosition,
          });
          newMarkers.push(restaurantMarker);
          restaurantMarker.setMap(map);
        }
      });

      setMarkers(newMarkers);
    } else if (markers.length > 0) {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
    }
  }, [result, map, showMarkers, courseIndex]);

  return (
      <div className="flex justify-center items-center">
        <div className="form-container top-2 left-2">
          <RecommendForm onSubmit={handleSubmitForm} />
          <button onClick={() => handleShowMarkers(0)}>코스1</button>
          <button onClick={() => handleShowMarkers(1)}>코스2</button>
          <button onClick={() => handleShowMarkers(2)}>코스3</button>
        </div>
        <div
            id="map-container"
            className="relative"
            style={{ height: "2000px", width: "100%" }}
        >
          <div
              id="map"
              className="flex w-full h-500px"
              style={{ height: "35%", width: "100%" }}
          >
          </div>
          <div id="result-container" className="flex w-full">
            <RecommendResult results={result} />
          </div>
        </div>
      </div>
  );
};

export default KakaoMap;
