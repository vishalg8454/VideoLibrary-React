import styles from "./PlaylistPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { PlaylistCard, Loader } from "../../components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchPlaylist } from "../../store/playlistSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const PlaylistPage = () => {
  const dispatch = useAppDispatch();
  const { playlists, status } = useAppSelector((state) => state.playlist);
  const {
    user: { token },
  } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchPlaylist({ token: token }));
    }
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
          Your do not have any playlists. Time to <Link to="/">Explore</Link>{" "}
          some videos.
        </p>
      )}
      {playlists.length !== 0 && (
        <p className={styles.count}>{playlists.length} Playlists</p>
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
