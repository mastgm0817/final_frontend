import axios from 'axios';

const headers = {
    'Content-Type': 'application/json; charset=utf-8'
};

const SendData = async (method:string, sendurl:string, data:any, msg:string) => {
    const targetURL="http://localhost:8080"+sendurl;
    // console.log(data.nickName);
    // console.log(data.cContent);
    try {
        const response = await axios({method,url:targetURL,data,headers});
        console.log(method, response.data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

};

export default SendData;