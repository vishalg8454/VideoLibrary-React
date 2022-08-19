import { Dispatch, SetStateAction, useRef } from "react";
import styles from "./ChipBar.module.scss";

type ChipProps = {
  categoryName: string;
  activeCategory: string;
  onClickHandler: Dispatch<SetStateAction<string>>;
};

type ChipBarProps = {
  categories: string[];
  activeCategory: string;
  onClickHandler: Dispatch<SetStateAction<string>>;
};

const Chip = ({ categoryName, activeCategory, onClickHandler }: ChipProps) => {
  return (
    <button
      className={
        activeCategory === categoryName
          ? styles.chipActive
          : styles.chipInActive
      }
      onClick={() => onClickHandler(categoryName)}
    >
      {categoryName}
    </button>
  );
};
const ChipBar = ({
  categories,
  activeCategory,
  onClickHandler,
}: ChipBarProps) => {

  return (
    <div data-foo="10px" className={styles.chipContainerWrapper}>
      <div className={styles.chipContainer}>
        {categories.map((it) => (
          <Chip
            categoryName={it}
            activeCategory={activeCategory}
            key={it}
            onClickHandler={onClickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export { ChipBar };
