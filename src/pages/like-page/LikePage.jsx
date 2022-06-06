import { useEffect } from "react";
import styles from "./LikePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../../store/likeSlice";

const LikePage = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const { likes } = useSelector((store) => store.like);

  useEffect(() => {
    dispatch(fetchLikes({ token: token }));
  }, []);
  return (
    <main>
      <p
        className={styles.likeCount}
      >{`You have ${likes.length} liked videos.`}</p>
    </main>
  );
};

export { LikePage };
