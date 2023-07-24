const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const API_KEY = process.env.API_KEY;
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


const HandleKakaoLogin = async () => {
    try {
        window.location.assign(KAKAO_AUTH_URI);
    } catch (error) {
        console.error('Login failed', error);
    }
};

export default HandleKakaoLogin;
