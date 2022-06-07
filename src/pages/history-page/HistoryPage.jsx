import styles from "./HistoryPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const { histories } = useSelector((store) => store.history);
  return (
    <main className={styles.historyPage}>
      {histories.length === 0 && (
        <p className={styles.count}>
          Your history is empty. Time to <Link to="/">Explore</Link> some.
        </p>
      )}
      {histories.length !== 0 && (
        <p className={styles.count}>{histories.length} videos</p>
      )}
    </main>
  );
};

export { HistoryPage };
