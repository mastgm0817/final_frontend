import { useSession } from "next-auth/react"
import { useState } from "react";
import Board from "../../../types/board";
import axios from "axios";

// const FetchPost = () => 
// {
//     const { data: session } = useSession();
//     const [post, setPosts] = useState();
//     const fetchPost = async () => {
//         const res = await fetch("http://localhost:8080/api/boards/1", {
//             method: "Get",
//             headers: {
//                 authorization : `bearer ${session?user.accessToken:""}`,
//             }
//         });
    
    
//     const response = await res.json();
//     setPosts(response)
//     };
    
//     return (
//         <div> 
//             {post && JSON.stringify(post)}
//         </div>
//     )
// }

// export default FetchPost

// import axios from 'axios';

const FetchBoards = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/boards');
        return response.data;
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw error;
    }
};

export default FetchBoards;

