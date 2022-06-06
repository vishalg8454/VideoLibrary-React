import styles from "./PlaylistDetailPage.module.css";
import { useSelector } from "react-redux";
import { VideoCard } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlaylistDetailPage = () => {
  const { data: videosFromStore } = useSelector((state) => state.video);
  const { playlists } = useSelector((state) => state.playlist);
  let { playlistId } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    const playlist = playlists.find((playlist) => playlist._id === playlistId);
    const filteredVideos = videosFromStore.filter((video) =>
      playlist.videos.some((it) => it._id === video._id)
    );
    setVideoList(filteredVideos);
    playlist && setPlaylistName(playlist.title);
  }, []);

  return (
    <main>
      <p className={styles.playlistCount}>{`${playlistName}: ${videoList.length} videos`}</p>
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

export { PlaylistDetailPage };
