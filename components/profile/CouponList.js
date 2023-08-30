import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const API_URL = process.env.NEXT_PUBLIC_URL;

function CouponList({ title, children }) {
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card>
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="#f783ac" gutterBottom>
                {title}
              </Typography>
              {children}
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
}

export default CouponList;
