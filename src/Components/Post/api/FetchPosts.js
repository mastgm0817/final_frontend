import axios from 'axios';

const FetchPosts = () => {
    return axios.get('/api/posts')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
};

//   function fetchPosts(){
//     axios.get('/api/posts')
//       .then(response => {
//         setPosts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching posts:', error);
//       });
//   }

export default FetchPosts;