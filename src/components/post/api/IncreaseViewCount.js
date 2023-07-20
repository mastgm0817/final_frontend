import axios from "axios";

const IncreaseViewCount = async (postId) => {
  const postIdString = postId.toString();
    try {
      const response = await axios.get(`/api/posts/${postIdString}`);
      return response.data;
    } catch (error) {
      console.error('Failed to increase view count:', error);
      throw error;
    }
  };

export default IncreaseViewCount;