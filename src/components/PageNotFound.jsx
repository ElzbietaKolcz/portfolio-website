import styles from "../style";

export default function PageNotFound() {
  return (
    <div className={`${styles.flexCenter}`}>
      <img
        className={`${styles.flexCenter} p-20`}
        src="/404.png"
        alt="404-error"
      />
    </div>
  );
}

