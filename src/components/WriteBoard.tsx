import { useState } from "react"
import { Grid,
        TextField,
        FormControl,
        Button } from "@mui/material"
import "./../app/board.css"

export default function(props:any){

    const [board, setBoard] = useState({b_title: props.b_title, b_content: props.b_content})
    
    return(
        <div id="board-form" className={props.formClass}>
            <div>
                <h2 style={{ textAlign: 'center' }}>{props.FormTitle}</h2>
                <div className="close-icon" onClick={props.handleXButton}>X</div>

                <form>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
                    <TextField
                        id="outlined-basic-required"
                        label="제목"
                        variant="standard"
                        type="text"
                        value={props.b_title}
                        onChange={ (event:React.ChangeEvent<HTMLInputElement>) => setBoard({ ...board, b_title: event.target.value })}
                    />
                    </div>
                <br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl fullWidth variant="standard">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
                            <TextField
                                id="outlined-basic-required"
                                label="내용"
                                variant="standard"
                                type="text"
                                value={props.b_content}
                                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setBoard({ ...board, b_content: event.target.value })}/>
                            </div>
                        </FormControl>
                </div>
                </form>


            </div>
        </div>
    )
}