import { useEffect, useState } from "react";
import { ChipBar } from "../../components";
import { VideoCard } from "../../components";
import { useVideo } from "../../context/video-context";
import styles from "./Homepage.module.css";

const categories = ["All", "CSS", "Tech Talk"];
const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { videoList } = useVideo();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log(videoList);
    setVideos(videoList);
  }, [videoList]);

  return (
    <main>
      <ChipBar
        categories={categories}
        activeCategory={activeCategory}
        onClickHandler={setActiveCategory}
      />
      {videoList.map(
        ({
          thumbnailUrl,
          channelUrl,
          videoTitle,
          channelName,
          viewCount,
          publishedDate,
        }) => (
          <VideoCard
            thumbnailUrl={thumbnailUrl}
            channelUrl={channelUrl}
            videoTitle={videoTitle}
            channelName={channelName}
            viewCount={viewCount}
            publishedDate={publishedDate}
          />
        )
      )}
    </main>
  );
};

export { Homepage };
