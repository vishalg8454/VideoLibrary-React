import styles from "./VideoCard.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  PortalWithPositioning,
  PortalForModal,
  RequireAuthToast,
  PlaylistModal,
} from "../../components";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";

const VideoCard = ({
  _id,
  thumbnailUrl,
  channelUrl,
  videoTitle,
  channelName,
  viewCount,
  publishedDate,
}) => {
  const [menuOn, setMenuOn] = useState(false);
  const [playlistModalOn, setPlaylistModalOn] = useState(false);

  const ref = useRef();

  const playlistClickHandler = () => {
    setMenuOn(false);
    setPlaylistModalOn(true);
  };

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
        <MoreVertIcon
          onClick={() => setMenuOn(!menuOn)}
          ref={ref}
          className={styles.threeDotMenu}
        />
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
            <div className={styles.menuButton}>
              <div>
                <WatchLaterRoundedIcon />
              </div>
              Add to Watch Later
            </div>
          </div>
        </PortalWithPositioning>
      )}
      {playlistModalOn && (
        <RequireAuthToast message="You need to Sign-In to add to Playlists">
          <PortalForModal dismiss={setPlaylistModalOn}>
            <PlaylistModal videoId={_id}/>
          </PortalForModal>
        </RequireAuthToast>
      )}
    </div>
  );
};

export { VideoCard };
