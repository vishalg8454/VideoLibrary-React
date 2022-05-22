import styles from "./VideoCard.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const VideoCard = ({thumbnailUrl,channelUrl,videoTitle,channelName,viewCount,publishedDate}) => {
  return (
    <div className={styles.videoCard}>
      <img
        className={styles.thumbnail}
        src={thumbnailUrl}
      />
      <div className={styles.flex}>
        <img
          className={styles.channelImg}
          src={channelUrl}
        />
        <div>
          <div className={styles.videoTitle}>
            {videoTitle}
          </div>
          <div className={styles.channelName}>
            {channelName}
          </div>
          <div className={styles.videoDetail}>
              <span>{viewCount}</span>
              <span>{publishedDate}</span>
          </div>
        </div>
        <MoreVertIcon className={styles.threeDotMenu}/>
      </div>
    </div>
  );
};

export { VideoCard };
