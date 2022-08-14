import styles from "./VideoPage.module.scss";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import axios from "axios";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import {
  PortalWithPositioning,
  PlaylistModal,
  RequireAuthToast,
} from "../../components/";
import { addToLikes, removeFromLikes } from "../../store/likeSlice";
import { addToHistory } from "../../store/historySlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const checkIfPresentInLikes = (likes: any[], videoId: string | undefined) => {
  return likes.some((item) => item._id === videoId);
};

const VideoPage = () => {
  const {
    user: { token },
  } = useAppSelector((store) => store.auth);

  const { likes, status } = useAppSelector((store) => store.like);

  const dispatch = useAppDispatch();
  let { videoId } = useParams();
  const [videoData, setVideoData] = useState({
    videoTitle: "",
    channelUrl: "",
    channelName: "",
    description:"",
  });
  const [playlistMenuOn, setPlaylistMenuOn] = useState(false);
  const ref:MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [presentInLikes, setPresentInLikes] = useState(
    checkIfPresentInLikes(likes, videoId)
  );

  const likeHandler = () => {
    if (token) {
      if (checkIfPresentInLikes(likes, videoId)) {
        if (videoId !== undefined) {
          dispatch(removeFromLikes({ videoId: videoId, token: token }));
        }
      } else {
        if (videoId !== undefined) {
          dispatch(addToLikes({ videoId: videoId, token: token }));
        }
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
    if (token && videoId !== undefined) {
      dispatch(addToHistory({ token: token, videoId: videoId }));
    }
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
            <PlaylistModal videoId={videoId as string} />
          </RequireAuthToast>
        </PortalWithPositioning>
      )}
    </main>
  );
};

export { VideoPage };
