// import Box from "@mui/material/Box/Box";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Button from "@mui/material/Button/Button";
// import * as React from 'react';

// const BoardDetail = (props:any) => {
//     // console.log(props.boardToShow)
//     console.log(props.boardToShow.b_title)
//     return(
//         <Box sx={{align:"center"}} className={"Board-to-show"}>
//             <div style={{marginLeft:"30"}}>

//                 <h2>{props.boardToShow.b_title}</h2>

//                 <table style={{ borderCollapse: 'collapse' }}>
//                 <tbody><tr className="detail-additional"><td style={{ width: '10%' }}>작성자&nbsp; {props.boardToShow.nickName}</td></tr>
//                     <tr className="detail-additional"><td style={{ width: '10%' }}>작성일&nbsp; {props.boardToShow.b_createdAt}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>최근 수정&nbsp; {props.boardToShow.b_updatedAt}</td></tr>
//                     <tr className="detail-additional"><td>조회수&nbsp; {props.boardToShow.b_views+1}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
//                     <tr></tr>

//                     {/* 수정 */}
//                     <tr><td><EditIcon onClick={(event) => {props.ToggleUpdateForm(event, props.boardToShow);}}></EditIcon></td>
//                     {}
//                     {/* 삭제 */}
//                         <td><DeleteIcon onClick={(event) => {event.stopPropagation(); props.handleDeleteClick(props.board);}}/></td>
//                     </tr>

//                     <tr><td><p style={{ marginBottom: '1em' }}>{props.boardToShow.b_content}</p></td></tr>
                    
//                     {/* 추천 */}
//                     {/* <tr><td><Button onClick={(event) => {event.stopPropagation(); props.HandleRecommendButton(props.board.bid)}}>추천 {props.board.b_recommendations}</Button></td></tr> */}
//                     <tr><td><Button></Button></td></tr>
//                     {/* <tr><td><p style={{ wordBreak: 'break-all' }}>{Board.comments}</p></td></tr> */}
//                 </tbody>
//                 </table>
//             </div>
//              <h4>댓글 목록</h4>
//         </Box>
//     );
// }

// export default BoardDetail;