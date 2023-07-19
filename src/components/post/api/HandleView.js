import axios from "axios";
import FetchPosts from "./FetchPosts";
import { useEffect } from "react";



const HandleView = async (post, setPosts) => {

    const IncreaseViewCount = async (pid) => {
        try {
          const response = await axios.put(`https://your-api-url/posts/${pid}/increase-view`);
          return response.data;
        } catch (error) {
          console.error('Failed to increase view count:', error);
          throw error;
        }
      };


    useEffect(() => {
    const increasementView = async () =>{
        try{
            await IncreaseViewCount(post.pid);
            const updatedPosts = await FetchPosts();
            setPosts(updatedPosts);
        }catch(error){
            console.error("Error increasing view count:", error);
        }
    };
    
    increasementView();
}, [post,setPosts]);

return null;
}


export default HandleView;


// const HandleUpdatePost = async (postId, updatedPost, refreshPosts) => {
//     try {
//         const response = await axios.put(`/api/posts/${postId}`, updatedPost, {
//             headers: {
//                 'Content-Type': 'application/json; charset=utf-8'
//             }
//         });
//         console.log('Post updated:', response.data);
//         refreshPosts();
//     } catch (error) {
//         console.error('Error updating post:', error);
//         throw error;
//     }
// };  