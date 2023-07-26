// import { useSession } from "next-auth/react"

// import { useState } from "react";

// const FetchPost = () => 
// {
//     const { data: session } = useSession();
//     const [post, setPosts] = useState();
//     const fetchPost = async () => {
//         const res = await fetch("http://localhost:8080/api/boards/1", {
//             method: "Get",
//             headers: {
//                 authorization : `bearer ${session?user.accessToken}`,
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