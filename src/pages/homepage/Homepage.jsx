import { useEffect, useState } from "react";
import { ChipBar, VideoCard } from "../../components";
import styles from "./Homepage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos, STATUSES } from "../../store/videoSlice";
import { Link } from "react-router-dom";

const categories = ["All", "News", "Google IO", "Programming"];
const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const { data: videosFromStore, status } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  useEffect(() => {
    setVideos(videosFromStore);
  }, [videosFromStore]);

  useEffect(() => {
    activeCategory === "All"
      ? setVideos(videosFromStore)
      : setVideos(
          videosFromStore.filter((it) => it.category === activeCategory)
        );
  }, [activeCategory]);

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Error...</h2>;
  }

  return (
    <main>
      <ChipBar
        categories={categories}
        activeCategory={activeCategory}
        onClickHandler={setActiveCategory}
      />
      <div className={styles.videoContainer}>
        {videos?.map(
          ({
            thumbnailUrl,
            channelUrl,
            videoTitle,
            channelName,
            viewCount,
            publishedDate,
            _id,
          }) => (
            <Link
              key={_id}
              to={`video/${_id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <VideoCard
                thumbnailUrl={thumbnailUrl}
                channelUrl={channelUrl}
                videoTitle={videoTitle}
                channelName={channelName}
                viewCount={viewCount}
                publishedDate={publishedDate}
              />
            </Link>
          )
        )}
      </div>
    </main>
  );
};

export { Homepage };
