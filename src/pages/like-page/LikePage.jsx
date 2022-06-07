import { useEffect, useState } from "react";
import styles from "./LikePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../../store/likeSlice";
import { VideoCard, Loader } from "../../components";

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
    <main>
      {status === "loading" ? (
        <div className={styles.likeCount}>
          <Loader />
        </div>
      ) : (
        <p
          className={styles.likeCount}
        >{`You have ${likes.length} liked videos.`}</p>
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
