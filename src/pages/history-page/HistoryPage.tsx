import styles from "./HistoryPage.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHistory, clearHistory } from "../../store/historySlice";
import { VideoCard, Loader } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const { histories, status } = useAppSelector((store) => store.history);
  const {
    user: { token },
  } = useAppSelector((store) => store.auth);
  const { data: videosFromStore } = useAppSelector((state) => state.video);

  const [videoList, setVideoList] = useState([]);

  const clearHistoryHandler = () => {
    if (token) {
      dispatch(clearHistory({ token: token }));
    }
  };

  useEffect(() => {
    const filteredVideos = videosFromStore.filter((video) =>
      histories.some((it) => it._id === video._id)
    );
    setVideoList(filteredVideos as []);
  }, [histories]);

  useEffect(() => {
    if (token) {
      dispatch(fetchHistory({ token: token }));
    }
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
      {videoList.length > 0 && (
        <div className={styles.buttonContainer}>
          <button onClick={clearHistoryHandler} className={styles.button}>
            Clear History
          </button>
        </div>
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
              showRemoveFromHistory={true}
            />
          )
        )}
      </div>
    </main>
  );
};

export { HistoryPage };
