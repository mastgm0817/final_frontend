import axios from "axios";

const Handlerecommendations = async (postId) => {
  const postIdString = postId.toString();
    try {
      const response = await axios.get(`/api/posts/${postIdString}/Recommend`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
      return response.data;
    } catch (error) {
      console.error('Failed to increase recommend count:', error);
      throw error;
    }
  };

export default Handlerecommendations;