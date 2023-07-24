import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HandleKakaoLoginOut from './KakaoLogout';
function Redirection() {
  const [userInfo, setUserInfo] = useState(null);
  const code = new URL(document.location.toString()).searchParams.get('code');

  useEffect(() => {
    axios.get(`http://localhost:8080/oauth/kakao?code=${code}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((r) => {
      console.log(r.data);
      const ACCESS_TOKEN = r.data.access_token;  // Assuming 'access_token' is the key of the actual token
      localStorage.setItem("token", ACCESS_TOKEN);
      setUserInfo(r.data);
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  }, [code]);  // Added 'code' to the dependency array

  if (!userInfo) {
    // UI to show while loading or in case of error
    return <div>Loading...</div>;
  }

  // UI to show when user information has been successfully received
  return (
    <div>
      <h1>Welcome, {userInfo.user.nickName}!</h1>
      <p>Email: {userInfo.user.email}</p>
      <button onClick={ HandleKakaoLoginOut }>로그아웃</button>
    </div>
  );
};

export default Redirection;
