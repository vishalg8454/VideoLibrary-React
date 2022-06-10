import styles from "./VideoPage.module.css";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import {
  PortalWithPositioning,
  PlaylistModal,
  RequireAuthToast,
} from "../../components/";
import { useDispatch, useSelector } from "react-redux";
import { addToLikes, removeFromLikes } from "../../store/likeSlice";
import { addToHistory } from "../../store/historySlice";
import { toast } from "react-toastify";

const checkIfPresentInLikes = (likes, videoId) => {
  return likes.some((item) => item._id === videoId);
};

const VideoPage = () => {
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const { likes, status } = useSelector((store) => store.like);

  const dispatch = useDispatch();
  let { videoId } = useParams();
  const [videoData, setVideoData] = useState({});
  const [playlistMenuOn, setPlaylistMenuOn] = useState(false);
  const ref = useRef();

  const [presentInLikes, setPresentInLikes] = useState(
    checkIfPresentInLikes(likes, videoId)
  );

  const likeHandler = () => {
    if (token) {
      if (checkIfPresentInLikes(likes, videoId)) {
        dispatch(removeFromLikes({ videoId: videoId, token: token }));
      } else {
        dispatch(addToLikes({ videoId: videoId, token: token }));
      }
      return;
    }
    toast.warning("You need to login to add to likes.");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/video/${videoId}`);
        setVideoData(res.data.video);
      } catch (error) {
        console.log(error);
      }
    })();
    dispatch(addToHistory({ token: token, videoId: videoId }));
  }, []);

  useEffect(() => {
    if (checkIfPresentInLikes(likes, videoId)) {
      setPresentInLikes(true);
    } else {
      setPresentInLikes(false);
    }
  }, [likes]);

  return (
    <main className={styles.videoPage}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"100%"}
        controls={true}
        style={{ aspectRatio: "9/16" }}
        playing
      />

      <h2 className={styles.videoTitle}>{videoData.videoTitle}</h2>
      <div className={styles.channelDesc}>
        <img className={styles.channelImg} src={videoData.channelUrl} />
        <div className={styles.channelName}>{videoData.channelName}</div>
        <div className={styles.buttons}>
          <div onClick={likeHandler}>
            {presentInLikes ? (
              <button
                className={styles.button}
                disabled={status === "loading" && true}
              >
                <ThumbUpRoundedIcon sx={{ fontSize: 32 }} />
              </button>
            ) : (
              <button
                className={styles.button}
                disabled={status === "loading" && true}
              >
                <ThumbUpOutlinedIcon sx={{ fontSize: 32 }} />
              </button>
            )}
          </div>
          <div ref={ref} onClick={() => setPlaylistMenuOn(!playlistMenuOn)}>
            <PlaylistAddOutlinedIcon
              className={styles.button}
              sx={{ fontSize: 32 }}
            />
          </div>
        </div>
      </div>
      <div className={styles.descr}>{videoData.description}</div>
      {playlistMenuOn && (
        <PortalWithPositioning dismiss={setPlaylistMenuOn} anchorRef={ref}>
          <RequireAuthToast message="You need to Sign-In to add to Playlists">
            <PlaylistModal videoId={videoId} />
          </RequireAuthToast>
        </PortalWithPositioning>
      )}
    </main>
  );
};

export { VideoPage };
