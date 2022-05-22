import styles from "./ChipBar.module.css";

const Chip = ({ categoryName, activeCategory, onClickHandler }) => {
  return (
    <button
      className={
        activeCategory === categoryName
          ? styles.chipActive
          : styles.chipInActive
      }
      onClick={()=>onClickHandler(categoryName)}
    >
      {categoryName}
    </button>
  );
};
const ChipBar = ({ categories = [], activeCategory, onClickHandler }) => {
  return (
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
  );
};

export { ChipBar };
