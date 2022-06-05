import styles from "./PlaylistPage.module.css";
import { useSelector } from "react-redux";
import { PlaylistCard } from "../../components";
import { Link } from "react-router-dom";

const PlaylistPage = () => {
  const { playlists } = useSelector((state) => state.playlist);

  return (
    <div className={styles.playlistFlex}>
      {playlists.map(({ _id, title }) => (
        <Link key={_id} to={`/playlist/${_id}`}>
          <PlaylistCard title={title} />
        </Link>
      ))}
    </div>
  );
};

export { PlaylistPage };
