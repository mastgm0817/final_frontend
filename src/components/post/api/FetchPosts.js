import axios from 'axios';

const FetchPosts = async () => {
    try {
        const response = await axios.get('http://180.150.207.73:8082/api/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export default FetchPosts;