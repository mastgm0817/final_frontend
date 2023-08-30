"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPosition } from "../../store/position";
import predict from "../../app/api/dateplan/dateplanApi";
import RecommendForm from "./RecommendForm";
import RecommendResult from "./RecommendResult";
import { useSession } from "next-auth/react";
import "./../../public/css/dateplan.css";
import random from "../../app/api/dateplan/dateRandomPlanApi";
import RandomRecommendForm from "./RandomRecommendForm";
import RandomRecommendResult from "./RandomRecommendResult";

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

interface RandomRecommendFormData {
  selected_region: string;
}

declare const window: typeof globalThis & {
  kakao: any;
};

const KakaoMap: React.FC = () => {
  const [kakaoMapLoaded, setKakaoMapLoaded] = useState(false);
  const [userPosition, setUserPosition] = useState<GeolocationPosition | null>(
    null
  );
  const [recommendationSubmitted, setRecommendationSubmitted] = useState(false);
  const [selectedRecommendType, setSelectedRecommendType] =
    useState<string>(""); // Track selected recommendation type
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
      setRecommendationSubmitted(true);
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
    // 기존 마커와 라인 제거
    markers.forEach((marker) => marker.setMap(null));
    if (line) {
      line.setMap(null);
      setLine(null);
    }
    setMarkers([]);

    if (selectedRecommendType === "region" && result?.random) {
      // 지역구 선택 기반 랜덤 코스 추천 결과 처리
      const newMarkers: any[] = [];

      result.random.forEach((restaurant: any) => {
        if (restaurant.latitude && restaurant.longitude) {
          const position = new window.kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map
          });
          newMarkers.push(marker);
        }
      });

      setMarkers(newMarkers);
    } else if (
        showMarkers &&
        map &&
        Array.isArray(result) &&
        courseIndex !== null &&
        result.length > courseIndex
    ) {
      // 위치 기반 데이트 코스 추천 결과 처리
      const restaurantPredictions = result[courseIndex].restaurant_prediction;
      const newMarkers: any[] = [];
      const path: any[] = [];

      if (userPosition) {
        path.push(
            new window.kakao.maps.LatLng(
                userPosition.coords.latitude,
                userPosition.coords.longitude
            )
        );
      }

      restaurantPredictions.forEach((restaurant: any, index: any) => {
        if (restaurant.latitude && restaurant.longitude) {
          const restaurantPosition = new window.kakao.maps.LatLng(
              restaurant.latitude + OFFSET * index,
              restaurant.longitude + OFFSET * index
          );

          if (userPosition) {
            path.push(restaurantPosition);
          }

          const restaurantMarker = new window.kakao.maps.Marker({
            position: restaurantPosition,
          });

          // 인포윈도우와 마커 이벤트 리스너 설정
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

          setMarkerPositions((prevPositions) => [
            ...prevPositions,
            restaurantPosition,
          ]);
          newMarkers.push(restaurantMarker);
          restaurantMarker.setMap(map);
        }
      });

      // 사용자 위치와 마커 위치로 경로 그리기 함수 호출
      handleShowRoute(path);

      setMarkers(newMarkers);
    } else if (markers.length > 0) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    }
  }, [result, map, showMarkers, courseIndex, selectedRecommendType]);
  const handleShowRoute = (path: any[]) => {
    // any 대신에 카카오 맵 LatLng 객체 타입을 지정할 수 있으면 더 좋습니다.
    if (userPosition && path.length > 1) {
      const polyline = new window.kakao.maps.Polyline({
        path: path,
        strokeWeight: 3,
        strokeColor: "#db4040",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });

      polyline.setMap(map);
      setLine(polyline);
    }
  };

  const handleShowMarkers = (courseIndex: any) => {
    setShowMarkers(true);
    setCourseIndex(courseIndex);
  };

  const handleRandomSubmitForm = async (formData: RandomRecommendFormData) => {
    try {
      const randomPredictionResult = await random(formData, token);
      setResult(randomPredictionResult);
      setSelectedRecommendType("region");
    } catch (error) {
      console.error("Error while handling random form submission:", error);
    }
  };

  const handleRecommendTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRecommendType(event.target.value);
  };

  const maxCourseIndex =
    result && result.length >= 3 ? 2 : result ? result.length - 1 : -1;

  // useEffect(() => {
  //   // 기존 마커와 라인 제거
  //   markers.forEach((marker) => marker.setMap(null));
  //   if (line) {
  //     line.setMap(null);
  //     setLine(null);
  //   }
  //   setMarkers([]);
  //
  //   // 지역구 선택 기반 랜덤 코스 추천 결과 처리
  //   if (selectedRecommendType === "region" && result && result.random) {
  //     const newMarkers = [];
  //
  //     result.random.forEach((restaurant) => {
  //       if (restaurant.latitude && restaurant.longitude) {
  //         const position = new window.kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
  //         const marker = new window.kakao.maps.Marker({
  //           position: position,
  //           map: map
  //         });
  //         newMarkers.push(marker);
  //       }
  //     });
  //
  //     setMarkers(newMarkers);
  //   }
  // }, [result, map, selectedRecommendType]);

  return (
    <div className="kakao-map-container">
      <div id="map"></div>

      {/* Recommend Type Dropdown */}
      <div className="recommend-type-dropdown">
        <select
          value={selectedRecommendType}
          onChange={handleRecommendTypeChange}
          className="block px-2 py-1 bg-gray-200 rounded-md"
        >
          <option value="">데이트 코스 추천 유형 선택</option>
          <option value="location">위치 기반 데이트 코스 추천</option>
          <option value="region">지역구 선택 기반</option>
        </select>
      </div>

      {/* Forms */}
      <div className="random-course-container">
        {selectedRecommendType === "region" && (
          <RandomRecommendForm onSubmit={handleRandomSubmitForm} />
        )}
      </div>
      <div className="course-container">
        {selectedRecommendType === "location" && (
          <RecommendForm onSubmit={handleSubmitForm} />
        )}
        {selectedRecommendType === "location" && (
          <div className="course-button">
            {recommendationSubmitted &&
              maxCourseIndex >= 0 &&
              [0, 1, 2].map(
                (courseIndex) =>
                  courseIndex <= maxCourseIndex && (
                    <button
                      key={courseIndex}
                      onClick={() => handleShowMarkers(courseIndex)}
                      className="block px-2 py-1 mt-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                    >
                      코스 {courseIndex + 1}
                    </button>
                  )
              )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="result-container">
        {selectedRecommendType === "location" && (
          <RecommendResult
            results={
              result && result.length > courseIndex ? [result[courseIndex]] : []
            }
          />
        )}
      </div>
      {selectedRecommendType === "region" && (
        <RandomRecommendResult results={result} />
      )}
    </div>
  );
};
export default KakaoMap;
