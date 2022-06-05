import styles from "./PlaylistModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createPlaylist } from "../../../store/playlistSlice";
import AddIcon from "@mui/icons-material/Add";

const PlaylistItem = ({ _id, title }) => {
  return (
    <div className={styles.playlistItemContainer}>
      <input type="checkbox" />
      <div>{title}</div>
    </div>
  );
};

const PlaylistModal = ({ videoId }) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const { playlists, status: playlistStatus } = useSelector(
    (store) => store.playlist
  );
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const addPlaylistHandler = () => {
    if (inputText.length === 0) {
      return;
    }
    setInputText("");
    dispatch(createPlaylist({ token: token, playlistName: inputText }));
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
          <PlaylistItem key={_id} title={title} />
        ))}
      </div>
    </div>
  );
};

export { PlaylistModal };
