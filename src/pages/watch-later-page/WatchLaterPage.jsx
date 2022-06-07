import styles from "./WatchLaterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchLater } from "../../store/watchlaterSlice";
import { useState, useEffect } from "react";
import { VideoCard, Loader } from "../../components";

const WatchLaterPage = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const { data: videosFromStore } = useSelector((state) => state.video);
  const { watchLaters, status } = useSelector((store) => store.watchLater);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const filteredVideos = videosFromStore.filter((video) =>
      watchLaters.some((it) => it._id === video._id)
    );
    setVideoList(filteredVideos);
  }, [watchLaters]);

  useEffect(() => {
    dispatch(fetchWatchLater({ token: token }));
  }, []);
  return (
    <main>
      {status === "loading" && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      {status !== "loading" && (
        <p
          className={styles.likeCount}
        >{`You have ${watchLaters.length} Watch-Later videos.`}</p>
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
            />
          )
        )}
      </div>
    </main>
  );
};

export { WatchLaterPage };
