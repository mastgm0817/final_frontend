import axios from "axios";

export default async function HandleFilterBoard(requester:String){
    try {
        const response = await axios.put(`http://localhost:8080/api/boards/myboard/${requester}`, requester, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Board updated:', response.data);
    } catch (error) {
        console.error('Error updating Board:', error);
        throw error;
    }
}