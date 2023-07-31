import { useState } from "react"
import { Grid,
        TextField,
        FormControl,
        Button } from "@mui/material"
import "./../app/board.css"
import React from "react"

export default function WriteBoard(props:any){

    const [newBoard, setNewBoard] = useState({b_title: props.b_title, b_content: props.b_content})

    return(
        <Grid container spacing={50}>
        <div id="board-form" className={props.formClass}>
            <h2 style={{ textAlign: 'center' }}>{props.FormTitle}</h2>
            <div className="close-icon" onClick={props.handleXButton}>X</div>

                <form>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
                    <TextField
                        id="outlined-basic"
                        label="제목"
                        variant="standard"
                        type="text"
                        // value={props.b_title===""?"":props.b_title}
                        onChange={ (event:React.ChangeEvent<HTMLInputElement>) => setNewBoard({ ...newBoard, b_title: event.target.value })}
                    />
                    </div>
                <br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl fullWidth variant="standard">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
                            <TextField
                                id="outlined-basic"
                                label="내용"
                                variant="standard"
                                type="text"
                                // value={props.b_content}
                                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setNewBoard({ ...newBoard, b_content: event.target.value })}/>
                            </div>
                        </FormControl>
                </div>
                </form>

                <br></br>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={props.BoardComplete}>게시글 작성 완료</Button>
                </div>
            </div>
        </Grid>
    )
}