import styles from "./PlaylistModal.module.scss";
import { useEffect, useState } from "react";
import {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
} from "../../../store/playlistSlice";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

const checkIfVideoPresentInPlaylist = (
  playlists: any[],
  _id: string,
  videoId: string
) => {
  const playlist = playlists.find((playlist) => playlist._id === _id);
  if (playlist === undefined) {
    return false;
  }
  if (playlist.videos.some((video: { _id: string }) => video._id === videoId)) {
    return true;
  }
  return false;
};

const PlaylistItem = ({
  _id,
  title,
  videoId,
  token,
}: {
  _id: string;
  title: string;
  videoId: string;
  token: string;
}) => {
  const { playlists, status: playlistStatus } = useAppSelector(
    (store) => store.playlist
  );
  const [isChecked, setIsChecked] = useState(
    checkIfVideoPresentInPlaylist(playlists, _id, videoId)
  );
  const dispatch = useAppDispatch();

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (checkIfVideoPresentInPlaylist(playlists, _id, videoId)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [playlists]);

  useEffect(() => {
    if (isChecked === true) {
      dispatch(
        addToPlaylist({
          playlistName: "",
          playlistId: _id,
          videoId: videoId,
          token: token,
        })
      );
    } else {
      if (checkIfVideoPresentInPlaylist(playlists, _id, videoId)) {
        dispatch(
          removeFromPlaylist({
            playlistName: "",
            playlistId: _id,
            videoId: videoId,
            token: token,
          })
        );
      }
    }
  }, [isChecked]);
  return (
    <div className={styles.playlistItemContainer}>
      <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
      <div>{title}</div>
    </div>
  );
};

const PlaylistModal = ({ videoId }: { videoId: string }) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();
  const { playlists, status: playlistStatus } = useAppSelector(
    (store) => store.playlist
  );
  const {
    user: { token },
  } = useAppSelector((state) => state.auth);

  const addPlaylistHandler = () => {
    if (inputText.length === 0) {
      return;
    }
    setInputText("");

    if (token) {
      dispatch(
        createPlaylist({
          token: token,
          playlistName: inputText,
          playlistId: "",
          videoId: "",
        })
      );
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputText}
            placeholder="Create new playlist..."
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={addPlaylistHandler}
            disabled={playlistStatus === "loading" && true}
            className={styles.addButton}
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <div className={styles.playlistContainer}>
        {playlists.map(({ _id, title }) => (
          <PlaylistItem
            key={_id}
            _id={_id}
            title={title}
            videoId={videoId}
            token={token as string}
          />
        ))}
      </div>
    </div>
  );
};

export { PlaylistModal };
