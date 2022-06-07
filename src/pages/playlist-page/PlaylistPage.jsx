import styles from "./PlaylistPage.module.css";
import { useSelector } from "react-redux";
import { PlaylistCard, Loader } from "../../components";
import { Link } from "react-router-dom";

const PlaylistPage = () => {
  const { playlists, status } = useSelector((state) => state.playlist);

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
