import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPosition } from '../store/position';
import '../public/css/kakaomap.css';

const Map: React.FC = () => {
  const [kakaoMapLoaded, setKakaoMapLoaded] = useState(false);
  const [userPosition, setUserPosition] = useState<GeolocationPosition | null>(null);

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
        level: 5,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      var mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      var zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [kakaoMapLoaded, userPosition]);

  return (
    <div>
      <div id="map-container">
        <div id="map" className="map"></div>
      </div>

    </div>
  );
};

export default Map;
