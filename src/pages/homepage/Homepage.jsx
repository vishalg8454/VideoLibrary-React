import { useState } from "react";
import { ChipBar } from "../../components";
import { VideoCard } from "../../components";
import styles from "./Homepage.module.css";

const categories = ["All", "CSS", "Tech Talk"];
const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <main>
      <ChipBar
        categories={categories}
        activeCategory={activeCategory}
        onClickHandler={setActiveCategory}
      />
      <VideoCard
        thumbnailUrl={
          "https://i.ytimg.com/vi/7u4H9Bto8rQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCTRVl9LK8ftFXRWgx41pJjIgpXEw"
        }
        channelUrl={
          "https://yt3.ggpht.com/nJ_qEs0fXmUkSdlIlEvFkeA5KzCa1a1vPAYYHmhQVfix10m_EdH0TiNfEuUvxf6CySD5iCZkGqQ=s176-c-k-c0x00ffffff-no-rj"
        }
        videoTitle={"This cave kicked my ass. I went back for a rematch."}
        channelName={"Tom Scott Plus"}
        viewCount={"3M Views"}
        publishedDate={"5 Days ago"}
      />
    </main>
  );
};

export { Homepage };
