import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VideoContext = createContext(null);

const useVideo = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`api/videos`);
        setVideoList(response.data.videos);
      } catch (error) {}
    })();
  }, []);
  return <VideoContext.Provider value={{videoList}}>{children}</VideoContext.Provider>;
};

export { VideoProvider, useVideo };
