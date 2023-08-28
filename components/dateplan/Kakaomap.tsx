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

  return (
    <div className="flex justify-center items-center">
       <div className="form-container top-2 left-2">
            <RecommendForm onSubmit={handleSubmitForm} />
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
