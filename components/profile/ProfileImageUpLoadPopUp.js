import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function ProfileImageUploadPopup ({ open, onClose, onSave, profileImage }) {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleSave = async () => {
    if (!selectedImage) {
      return;
    }
      onSave(selectedImage);
      setSelectedImage(null);
      onClose();
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
        <input type="file" accept="image/*" name="imageFiles" onChange={handleImageChange} />
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