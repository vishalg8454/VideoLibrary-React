import styles from "./VideoPage.module.css";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

const VideoPage = () => {
  let { videoId } = useParams();
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/video/${videoId}`);
        setVideoData(res.data.video);
        console.log(res.data.video);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <main className={styles.videoPage}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"100%"}
        controls={true}
        style={{ aspectRatio: "9/16" }}
      />

      <h2 className={styles.videoTitle}>{videoData.videoTitle}</h2>
      <div className={styles.channelDesc}>
        <img className={styles.channelImg} src={videoData.channelUrl} />
        <div className={styles.channelName}>{videoData.channelName}</div>
        <div className={styles.buttons}>
          <div>
            <ThumbUpOutlinedIcon
              className={styles.button}
              sx={{ fontSize: 32 }}
            />
          </div>
          <div>
            <PlaylistAddOutlinedIcon
              className={styles.button}
              sx={{ fontSize: 32 }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export { VideoPage };
