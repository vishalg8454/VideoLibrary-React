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
    <main className={styles.playlistPage}>
      {status === "loading" && (
        <p className={styles.count}>
          <Loader />
        </p>
      )}
      {status !== "loading" && playlists.length === 0 && (
        <p className={styles.count}>
          Your do not have any playlists. Time to <Link to="/">Explore</Link> some videos.
        </p>
      )}
      {playlists.length !== 0 && (
        <p className={styles.count}>{playlists.length} videos</p>
      )}

      <div className={styles.videoContainer}>
        {playlists.map(({ _id, title }) => (
          <Link key={_id} to={`/playlist/${_id}`}>
            <PlaylistCard title={title} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export { PlaylistPage };
