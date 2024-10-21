import { Hourglass } from "react-loader-spinner";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <Hourglass />
    </div>
  );
}

export default Loader;
