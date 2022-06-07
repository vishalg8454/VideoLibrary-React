import styles from "./PlaylistPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { PlaylistCard, Loader } from "../../components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchPlaylist } from "../../store/playlistSlice";

const PlaylistPage = () => {
  const dispatch = useDispatch();
  const { playlists, status } = useSelector((state) => state.playlist);
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchPlaylist(token));
  }, []);

  return (
    <>
      {status === "loading" ? (
        <div className={styles.playlistCount}>
          <Loader />
        </div>
      ) : (
        <div
          className={styles.playlistCount}
        >{`${playlists.length} Playlists`}</div>
      )}
      <div className={styles.playlistFlex}>
        {playlists.map(({ _id, title }) => (
          <Link key={_id} to={`/playlist/${_id}`}>
            <PlaylistCard title={title} />
          </Link>
        ))}
      </div>
    </>
  );
};

export { PlaylistPage };
