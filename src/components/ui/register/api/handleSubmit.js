import axios from 'axios';

const handleSubmit = async (e, state, setSuccessMessage, navigate) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8080/api/users', state);
        console.log(response.data);
        setSuccessMessage("회원가입이 성공적으로 완료되었습니다.");
        navigate("/join");
    } catch (error) {
        console.error(error);
    }
};

export default handleSubmit;
