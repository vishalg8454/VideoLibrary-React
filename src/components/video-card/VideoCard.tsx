import styles from "./VideoCard.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  PortalWithPositioning,
  PortalForModal,
  RequireAuthToast,
  PlaylistModal,
} from "../../components";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../../store/watchlaterSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { removeFromHistory } from "../../store/historySlice";

const checkIfPresentInWatchLater = (watchLaters: any[], videoId: string) => {
  return watchLaters.some((item) => item._id === videoId);
};

interface VideoCardProps {
  _id: string;
  thumbnailUrl: string;
  channelUrl: string;
  videoTitle: string;
  channelName: string;
  viewCount: string;
  publishedDate: string;
  showRemoveFromHistory?: boolean;
}

const VideoCard = ({
  _id,
  thumbnailUrl,
  channelUrl,
  videoTitle,
  channelName,
  viewCount,
  publishedDate,
  showRemoveFromHistory = false,
}: VideoCardProps) => {
  const dispatch = useAppDispatch();
  const {
    user: { token },
  } = useAppSelector((state) => state.auth);
  const { watchLaters } = useAppSelector((state) => state.watchLater);

  const [watchLaterOn, setWatchLaterOn] = useState(
    checkIfPresentInWatchLater(watchLaters, _id)
  );
  const [menuOn, setMenuOn] = useState(false);
  const [playlistModalOn, setPlaylistModalOn] = useState(false);

  const ref:MutableRefObject<HTMLDivElement | null> = useRef(null);

  const playlistClickHandler = () => {
    setMenuOn(false);
    setPlaylistModalOn(true);
  };

  const removeFromHistoryHandler = () => {
    if (token) {
      dispatch(removeFromHistory({ token: token, videoId: _id }));
    }
  };

  const watchLaterClickHandler = () => {
    if (token) {
      if (checkIfPresentInWatchLater(watchLaters, _id)) {
        dispatch(removeFromWatchLater({ token: token, videoId: _id }));
      } else {
        dispatch(addToWatchLater({ token: token, videoId: _id }));
      }
    } else {
      toast.warning("SignIn to add video to Watch-Later");
    }
  };

  useEffect(() => {
    if (checkIfPresentInWatchLater(watchLaters, _id)) {
      setWatchLaterOn(true);
    } else {
      setWatchLaterOn(false);
    }
  }, [watchLaters]);

  return (
    <div className={styles.videoCard}>
      <Link to={`/video/${_id}`}>
        <img className={styles.thumbnail} src={thumbnailUrl} />
      </Link>
      <div className={styles.flex}>
        <img className={styles.channelImg} src={channelUrl} />
        <div>
          <div className={styles.videoTitle}>{videoTitle}</div>
          <div className={styles.channelName}>{channelName}</div>
          <div className={styles.videoDetail}>
            <span>{viewCount}</span>
            <span>{publishedDate}</span>
          </div>
        </div>
        <div onClick={() => setMenuOn(!menuOn)} ref={ref}>
          <MoreVertIcon className={styles.threeDotMenu} />
        </div>
      </div>
      {menuOn && (
        <PortalWithPositioning anchorRef={ref} dismiss={setMenuOn}>
          <div className={styles.menuContainer}>
            <div onClick={playlistClickHandler} className={styles.menuButton}>
              <div>
                <VideoLibraryRoundedIcon />
              </div>
              Add to Playlist
            </div>
            <div className={styles.menuButton} onClick={watchLaterClickHandler}>
              <div>
                <WatchLaterRoundedIcon />
              </div>
              {watchLaterOn ? "Remove From Watch Later" : "Add To Watch Later"}
            </div>
            {showRemoveFromHistory && (
              <div
                onClick={removeFromHistoryHandler}
                className={styles.menuButton}
              >
                <div className={styles.red}>
                  <div>
                    <DeleteForeverIcon />
                  </div>
                </div>
                <div className={styles.red}>Remove from History</div>
              </div>
            )}
          </div>
        </PortalWithPositioning>
      )}
      {playlistModalOn && (
        <RequireAuthToast message="You need to Sign-In to add to Playlists">
          <PortalForModal dismiss={setPlaylistModalOn}>
            <PlaylistModal videoId={_id} />
          </PortalForModal>
        </RequireAuthToast>
      )}
    </div>
  );
};

export { VideoCard };
