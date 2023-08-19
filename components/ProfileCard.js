import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const API_URL = process.env.NEXT_PUBLIC_URL;

function CardProfile ({ title, buttonText }){
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      if (session) {
        try {
          const nickName = session.user.name;
          const authToken = session.user.id;
          const response = await axios.get(
            API_URL + `/users/info/${nickName}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          setError(error);
        }
      }
    }
    fetchUserInfo();
  }, [session]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {userInfo && (
            <>
              <TextField
                id="standard-basic"
                label={userInfo.nickName}
                variant="standard"
                sx={{ display: 'flex' }}
              />
              <br />
              <TextField
                id="standard-basic"
                label={userInfo.email}
                variant="standard"
                sx={{ display: 'flex' }}
              />
            </>
          )}
          </CardContent>
          <CardActions>
            <Button size="small">{buttonText}</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );

}

export default CardProfile;