import React from 'react';
import axios from 'axios';

const LoginPage = () => {
    const handleLogin = async () => {
        try {
            // 카카오톡 로그인 요청을 보내는 URL로 수정해주세요.
            const response = await axios.get('http://localhost:8080/auth/kakao');
            console.log(response.data);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Kakao</button>
        </div>
    );
};

export default LoginPage;
