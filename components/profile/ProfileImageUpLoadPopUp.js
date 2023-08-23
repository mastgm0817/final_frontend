import axios from 'axios';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const ProfileImageUploadPopup = ({ open, onClose, onSave, profileImage }) => {

  const { data: session } = useSession();
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const authToken = session.user.id;

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleSave = async () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await await axios.patch(API_URL + '/users/uploadProfileImage', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        // Assuming the server returns a URL for the uploaded image
        const imageUrl = await response.json();

        onSave(imageUrl); // Save the image URL to the user's profile
        setSelectedImage(null);
        onClose();
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>사진 업로드</DialogTitle>
      <DialogContent>
        <Avatar
          alt="User profile"
          src={selectedImage ? URL.createObjectURL(selectedImage) : profileImage}
          sx={{ width: 200, height: 200 }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSave} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileImageUploadPopup;