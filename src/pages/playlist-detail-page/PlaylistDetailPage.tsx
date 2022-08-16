import styles from "./PlaylistDetailPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { VideoCard } from "../../components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePlaylist } from "../../store/playlistSlice";
import {useAppDispatch,useAppSelector} from "../../store/hooks";

const PlaylistDetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: videosFromStore } = useAppSelector((state) => state.video);
  const {
    user: { token },
  } = useAppSelector((store) => store.auth);
  const { playlists } = useAppSelector((state) => state.playlist);
  let { playlistId } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const deletePlaylistHandler = () => {
    if(playlistId && token)
    dispatch(deletePlaylist({ playlistId: playlistId, token: token }));
    navigate("/playlist");
  };
  useEffect(() => {
    const playlist = playlists.find((playlist) => playlist._id === playlistId);
    const filteredVideos = videosFromStore.filter((video) =>
      playlist?.videos?.some((it: { _id: any; }) => it._id === video._id)
    );
    setVideoList(filteredVideos as []);
    playlist && setPlaylistName(playlist.title);
  }, []);

  return (
    <main>
      <p
        className={styles.playlistCount}
      >{`${playlistName}: ${videoList.length} videos`}</p>
      <div className={styles.buttonContainer}>
        <button onClick={deletePlaylistHandler} className={styles.button}>
          Delete Playlist
        </button>
      </div>
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
