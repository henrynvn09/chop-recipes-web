import { useRef, useState } from "react";
import EditIcon from "./EditIcon";
import PhotoModal from "./PhotoModal";
import axios from 'axios';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useUser } from "../contexts/UserContent";
import React, { useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ProfilePicture = ({photo, profileID}) => {
  const avatarUrl = useRef(
    {photo}
  );
  const [picture, setPicture] = useState(photo);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setPicture(photo);
  }, [photo]);
  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    let trimmedimgSrc = imgSrc.substring(22);
    const uniqueFileName = `${Date.now()}-${trimmedimgSrc.name}`;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(uniqueFileName);
    
    fileRef.putString(trimmedimgSrc,'base64').then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
            updateAvatarDB(downloadURL);
            setPicture(photo);
            force_refresh();
        });
    });

  };
 const force_refresh = () => {
  window.location.href = "/user/" + userID;
};
  const { userID } = useUser();

  const updateAvatarDB = async (downloadURL) => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/updatePhoto/" + userID
        , {downloadURL});
        console.error("uploaded that to the db");
        // window.location.href= "/user/"+userID;

    } catch (error) {
      console.error("Error update photo image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={picture}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          hidden={userID !== profileID}
          onClick={() => setModalOpen(true)}
        >
          <EditIcon />
        </button>
      </div>
      {modalOpen && (
        <PhotoModal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
