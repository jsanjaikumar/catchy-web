import React from "react";
import { Modal, Box } from "@mui/material";
import "../styles/loader.css"; // Import the CSS

const Loader = ({ open }) => {
  return (
    <Modal open={open}>
      <Box className='loader-box'>
        <img
          src='https://media2.giphy.com/media/dt6yvPAiSSNsvZhJUl/giphy.gif?cid=6c09b952n5mwrojzjpxt9fsbfeewqthunpu6ipqw4u479pqk&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' // Example loading GIF
          alt='Loading...'
          className='loader-gif'
        />
      </Box>
    </Modal>
  );
};

export default Loader;
