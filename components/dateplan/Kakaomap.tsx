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
  // 마커 좌표를 저장할 상태
  const [markerPositions, setMarkerPositions] = useState<any[]>([]);
  // 라인을 관리할 상태
  const [line, setLine] = useState<any>(null);

  const [map, setMap] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const session = useSession();
  const token = session.data?.user.id;

  const handleSubmitForm = async (formData: RecommendFormData) => {
    try {
      const predictionResult = await predict(formData, token);
      setResult(predictionResult);
      handleShowMarkers(0);
      
    } catch (error) {
      console.error("Error while predicting:", error);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
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
  const OFFSET = 0.0001; // 적절한 값을 선택하세요.
  const [courseIndex, setCourseIndex] = useState<number>(0);
  // 현재 표시할 코스의 인덱스를 저장하는 state
  const [markers, setMarkers] = useState<any[]>([]); // 마커들을 저장하는 state

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
  // 마커 좌표를 저장할 배열

  useEffect(() => {
    if (
      showMarkers &&
      map &&
      Array.isArray(result) &&
      courseIndex !== null &&
      result.length > courseIndex
    ) {
      const restaurantPredictions = result[courseIndex].restaurant_prediction;

      // 이전에 생성된 마커들을 지도에서 제거합니다.
      markers.forEach((marker) => marker.setMap(null));
      // 이전에 그려진 라인을 지도에서 제거합니다.
      if (line) {
        line.setMap(null);
        setLine(null);
      }
      // 마커의 좌표 배열을 초기화합니다.
      setMarkerPositions([]);

      const newMarkers: any[] = [];
      // 마커 생성 로직에서
      restaurantPredictions.forEach((restaurant: any, index: number) => {
        if (restaurant.latitude && restaurant.longitude) {
          const restaurantPosition = new window.kakao.maps.LatLng(
            restaurant.latitude + OFFSET * index,
            restaurant.longitude + OFFSET * index
          );
          const restaurantMarker = new window.kakao.maps.Marker({
            position: restaurantPosition,
          });

          // 인포윈도우를 생성합니다.
          const infowindowContent = `<div style="width:200px; padding:10px; font-size:14px;">${restaurant.사업장명} (${restaurant.업태구분명})</div>`;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: infowindowContent,
            removable: true,
            zIndex: 1,
          });

          // 마커에 마우스를 올렸을 때의 이벤트를 추가합니다.
          window.kakao.maps.event.addListener(
            restaurantMarker,
            "mouseover",
            function () {
              infowindow.open(map, restaurantMarker);
            }
          );

          // 마커에서 마우스를 제거했을 때의 이벤트를 추가합니다.
          window.kakao.maps.event.addListener(
            restaurantMarker,
            "mouseout",
            function () {
              infowindow.close();
            }
          );

          // 마커 클릭 이벤트를 추가합니다.
          window.kakao.maps.event.addListener(
            restaurantMarker,
            "click",
            function () {
              const places = new window.kakao.maps.services.Places();
              places.keywordSearch(
                restaurant.사업장명,
                function (results: any, status: any) {
                  if (
                    status === window.kakao.maps.services.Status.OK &&
                    results &&
                    results[0]
                  ) {
                    const place = results[0];
                    window.open(place.place_url, "_blank"); // 새 탭에서 상세 페이지를 엽니다.
                  } else {
                    console.error("검색 결과가 없습니다.");
                  }
                }
              );
            }
          );
          // 좌표를 배열에 저장
          setMarkerPositions((prevPositions) => [
            ...prevPositions,
            restaurantPosition,
          ]);
          newMarkers.push(restaurantMarker);
          restaurantMarker.setMap(map);
        }
      });

      setMarkers(newMarkers);
    } else if (markers.length > 0) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    }
  }, [result, map, showMarkers, courseIndex]);

  const handleShowRoute = () => {
    if (userPosition) {
      const userLatLng = new window.kakao.maps.LatLng(
        userPosition.coords.latitude,
        userPosition.coords.longitude
      );

      // 사용자의 좌표와 나머지 마커의 좌표들을 결합
      const path = [userLatLng, ...markerPositions];

      const polyline = new window.kakao.maps.Polyline({
        path: path, // 결합된 경로로 변경
        strokeWeight: 3,
        strokeColor: "#db4040",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });

      polyline.setMap(map);

      // 상태에 현재 그려진 라인을 저장한다.
      setLine(polyline);
    }
  };

  return (
    <div className="flex justify-center items-center">
    <div className="form-container top-2 left-2 p-4 w-80 mx-auto mt-12">
      <RecommendForm onSubmit={handleSubmitForm} />
      {[0, 1, 2].map((courseIndex) => (
        <button
          key={courseIndex}
          onClick={() => handleShowMarkers(courseIndex)}
          className="block px-2 py-1 mt-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
        >
          코스 {courseIndex + 1}
        </button>
      ))}
      <button
        onClick={handleShowRoute}
        className="block px-2 py-1 mt-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
      >
        경로 보기
      </button>
      </div>
      <div
        className="kakao-map-container"
        style={{ height: "2300px", width: "100%" }}
      >
        <div
          id="map"
          className="flex w-full h-500px"
          style={{ height: "30%", width: "100%" }}
        ></div>
        <div id="result-container" className="flex w-full">
          <RecommendResult
            results={
              result && result.length > courseIndex ? [result[courseIndex]] : []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
