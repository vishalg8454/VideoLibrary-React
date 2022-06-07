import styles from "./HistoryPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHistory } from "../../store/historySlice";
import { VideoCard, Loader } from "../../components";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { histories, status } = useSelector((store) => store.history);
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const { data: videosFromStore } = useSelector((state) => state.video);

  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const filteredVideos = videosFromStore.filter((video) =>
      histories.some((it) => it._id === video._id)
    );
    setVideoList(filteredVideos);
  }, [histories]);

  useEffect(() => {
    dispatch(fetchHistory({ token: token }));
  }, []);

  return (
    <main className={styles.historyPage}>
      {status === "loading" && (
        <p className={styles.count}>
          <Loader />
        </p>
      )}
      {status !== "loading" && histories.length === 0 && (
        <p className={styles.count}>
          Your history is empty. Time to <Link to="/">Explore</Link> some
          videos.
        </p>
      )}
      {histories.length !== 0 && (
        <p className={styles.count}>{histories.length} videos</p>
      )}
      <div className={styles.videoContainer}>
        {videoList?.map(
          ({
            thumbnailUrl,
            channelUrl,
            videoTitle,
            channelName,
            viewCount,
            publishedDate,
            _id,
          }) => (
            <VideoCard
              key={_id}
              _id={_id}
              thumbnailUrl={thumbnailUrl}
              channelUrl={channelUrl}
              videoTitle={videoTitle}
              channelName={channelName}
              viewCount={viewCount}
              publishedDate={publishedDate}
              showRemoveFromHistory = {true}
            />
          )
        )}
      </div>
    </main>
  );
};

export { HistoryPage };
