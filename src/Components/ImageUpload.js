import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Button } from "antd";

const baseUrl = 'http://localhost:5223/api';

const ImageUpload = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = 5;

  const openModal = () => {
    setModalIsOpen(true);
    retrieveProfilePhoto(userId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const retrieveProfilePhoto = (userId) => {
    axios
      .get(`${baseUrl}/Team/getImageByID/${userId}`, {
        responseType: 'blob', // Request binary data as a Blob
      })
      .then((response) => {
        setImageBlob(response.data); // Set the Blob in the state
      })
      .catch((error) => {
        console.error('Error retrieving profile photo:', error);
      });
  };

  const handleImageUpload = () => {
    console.log(userId);
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios
        .post(`${baseUrl}/Team/setImage?id=${userId}`, formData, config)
        .then((response) => {
          // Handle successful upload if needed
          retrieveProfilePhoto(userId);
          closeModal();
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>
       <Button type="primary" className="btn-container"  
       onClick={openModal}>Open Image Upload
      </Button>      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {imageBlob ? (
          <img src={URL.createObjectURL(imageBlob)} alt="Car" />
        ) : (
          <div>No image found.</div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="primary" onClick={handleImageUpload}>Upload</Button>
        <Button type="primary" onClick={closeModal}>Close</Button>
      </Modal>
    </div>
  );
};

export default ImageUpload;