import { ChangeEvent, useEffect, useState } from "react";
import { ChipBar, VideoCard, Loader } from "../../components";
import styles from "./Homepage.module.scss";
import { STATUSES } from "../../store/videoSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const categories = ["All", "News", "Google IO", "Programming", "Technology"];
const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { data: videosFromStore, status } = useAppSelector(
    (state) => state.video
  );

  const searchVideo = (searchText: string) => {
    let filteredVideos = videosFromStore.filter(
      (video) =>
        video.videoTitle.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
    if (activeCategory !== "All") {
      filteredVideos = filteredVideos.filter(
        (video) => video.category === activeCategory
      );
    }
    setVideos(filteredVideos as []);
  };

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "relevance") {
      const deepCopy = JSON.parse(JSON.stringify(videosFromStore));
      setVideos(deepCopy);
    }
    if (value === "newToOld") {
      const deepCopy = JSON.parse(JSON.stringify(videos));
      deepCopy.sort(
        (a: { uploadDate: Date }, b: { uploadDate: Date }) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
      setVideos(deepCopy);
    }
    if (value === "oldToNew") {
      const deepCopy = JSON.parse(JSON.stringify(videos));
      deepCopy.sort(
        (a: { uploadDate: Date }, b: { uploadDate: Date }) =>
          new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
      );
      setVideos(deepCopy);
    }
  };

  useEffect(() => {
    // console.log(videos);
  }, [videos]);

  useEffect(() => {
    searchVideo(searchText);
  }, [searchText]);

  useEffect(() => {
    setVideos(videosFromStore as []);
  }, [videosFromStore]);

  useEffect(() => {
    activeCategory === "All"
      ? setVideos(videosFromStore as [])
      : setVideos(
          videosFromStore.filter((it) => it.category === activeCategory) as []
        );
  }, [activeCategory]);

  if (status === STATUSES.LOADING) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
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
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Type to search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select onChange={selectHandler}>
          <option value="">Sort by</option>
          <option value="newToOld">New to Old</option>
          <option value="oldToNew">Old to New</option>
          <option value="relevance">Relevance</option>
        </select>
      </div>
      {videos.length === 0 && (
        <div className={styles.noResult}>No matching results</div>
      )}
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
