import axios from 'axios';

export const predict = async (formData: any) => {
  const response = await axios.post('http://localhost:8080/predict', JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  return response.data;
};
export default predict;