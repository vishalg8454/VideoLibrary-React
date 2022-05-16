import { useEffect, useState } from "react";
import { ChipBar } from "../../components";
import { VideoCard } from "../../components";
import { useVideo } from "../../context/video-context";
import styles from "./Homepage.module.css";

const categories = ["All", "News", "Google IO", "Programming"];
const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { videoList } = useVideo();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log(videoList);
    setVideos(videoList);
  }, [videoList]);

  useEffect(() => {
    activeCategory === "All"
      ? setVideos(videoList)
      : setVideos(videoList.filter((it) => it.category === activeCategory));
  }, [activeCategory]);

  return (
    <main>
      <ChipBar
        categories={categories}
        activeCategory={activeCategory}
        onClickHandler={setActiveCategory}
      />
      <div className={styles.videoContainer}>
        {videos.map(
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
              thumbnailUrl={thumbnailUrl}
              channelUrl={channelUrl}
              videoTitle={videoTitle.length > 39 ? videoTitle.slice(0,39)+'...' : videoTitle}
              channelName={channelName}
              viewCount={viewCount}
              publishedDate={publishedDate}
              key={_id}
            />
          )
        )}
      </div>
    </main>
  );
};

export { Homepage };
