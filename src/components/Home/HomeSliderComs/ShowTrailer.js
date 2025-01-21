import { Dialog } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";

function ShowTrailer({ open, handleClose, movieTrailerUrl }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="trailer_dialog_container"
    >
      <ReactPlayer url={movieTrailerUrl} controls={true} />
    </Dialog>
  );
}

export default ShowTrailer;
