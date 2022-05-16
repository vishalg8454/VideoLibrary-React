import { useState } from "react";
import { ChipBar } from "../../components";
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
    </main>
  );
};

export { Homepage };
