import styles from "./PlaylistCard.module.scss";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const PlaylistCard = ({ title }: { title: string }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.flex}>{title}</div>
      <PlayCircleOutlineIcon className={styles.icon} sx={{ fontSize: 270 }} />
    </div>
  );
};

export { PlaylistCard };
