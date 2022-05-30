import styles from "./VideoPage.module.css";
import ReactPlayer from "react-player/youtube";
import {useParams} from "react-router-dom";

const VideoPage = () => {
  let {videoId} = useParams();
  return (
    <>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=cDNDVtoJhik"
      width={"100%"}
      controls={true}
      style={{ aspectRatio: "9/16" }}
    />
    {videoId}
    </>
  );
};

export { VideoPage };
