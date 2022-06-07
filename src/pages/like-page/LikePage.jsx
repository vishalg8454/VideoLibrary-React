import { useEffect, useState } from "react";
import styles from "./LikePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../../store/likeSlice";
import { VideoCard, Loader } from "../../components";
import { Link } from "react-router-dom";

const LikePage = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const { data: videosFromStore } = useSelector((state) => state.video);
  const { likes, status } = useSelector((store) => store.like);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const filteredVideos = videosFromStore.filter((video) =>
      likes.some((it) => it._id === video._id)
    );
    setVideoList(filteredVideos);
  }, [likes]);

  useEffect(() => {
    dispatch(fetchLikes({ token: token }));
  }, []);
  return (
    <main className={styles.likePage}>
      {status === "loading" && (
        <p className={styles.count}>
          <Loader />
        </p>
      )}
      {status !== "loading" && likes.length === 0 && (
        <p className={styles.count}>
          Your do not have any Liked videos. Time to <Link to="/">Explore</Link> some videos.
        </p>
      )}
      {likes.length !== 0 && (
        <p className={styles.count}>{likes.length} videos</p>
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

export { LikePage };
