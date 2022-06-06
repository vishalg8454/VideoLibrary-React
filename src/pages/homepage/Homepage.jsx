import { useEffect, useState } from "react";
import { ChipBar, VideoCard } from "../../components";
import styles from "./Homepage.module.css";
import { useSelector } from "react-redux";
import { STATUSES } from "../../store/videoSlice";

const categories = ["All", "News", "Google IO", "Programming"];
const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const { data: videosFromStore, status } = useSelector((state) => state.video);

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

export { Homepage };
