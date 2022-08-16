import { useEffect, useState } from "react";
import styles from "./LikePage.module.scss";
import { fetchLikes } from "../../store/likeSlice";
import { VideoCard, Loader } from "../../components";
import { Link } from "react-router-dom";
import {useAppDispatch,useAppSelector} from "../../store/hooks";

const LikePage = () => {
  const dispatch = useAppDispatch();
  const {
    user: { token },
  } = useAppSelector((store) => store.auth);
  const { data: videosFromStore } = useAppSelector((state) => state.video);
  const { likes, status } = useAppSelector((store) => store.like);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const filteredVideos = videosFromStore.filter((video) =>
      likes.some((it) => it._id === video._id)
    );
    setVideoList(filteredVideos as []);
  }, [likes]);

  useEffect(() => {
    if(token){
      dispatch(fetchLikes({ token: token }));
    }
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
