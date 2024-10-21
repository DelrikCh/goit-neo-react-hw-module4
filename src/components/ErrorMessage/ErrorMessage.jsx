import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  return <div className={styles.errorMessage}>{message}</div>;
}

export default ErrorMessage;
