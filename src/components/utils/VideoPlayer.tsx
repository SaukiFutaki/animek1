"use client";

import { button } from "@material-tailwind/react";
import React, { useState } from "react";
import YouTube from "react-youtube";

interface Props {
  youtubeId: string;
}
const VideoPlayer = ({ youtubeId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleCloseOpen = () => {
    setIsOpen((prevState) => !prevState)
  }
  const option = {
    width: '300',
    height: '300'
  }
  const Player = () => {
    return (
      <div className="fixed bottom-2 right-2">
        <button onClick={handleCloseOpen} className="text-white">X</button>
        <YouTube
          videoId={youtubeId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
          onError={()=>alert('haduh g ada vid')}
        />
      </div>
    )
  }
  return isOpen ? <Player /> : <button onClick={handleCloseOpen} className="fixed bottom-5 right-5 w-32 bg-blue-500">Watch Trailer!</button>
};

export default VideoPlayer;
