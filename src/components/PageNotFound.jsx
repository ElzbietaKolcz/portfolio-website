import styles from "../style";

export default function PageNotFound() {
  return (
    <div className={`${styles.flexCenter}`}>
      <img
        className={`${styles.flexCenter} p-20`}
        src="https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/404.png?alt=media&token=dd331f69-6bb3-48bf-b5af-e02e4ac2f135"
        alt="404-error"
      />
    </div>
  );
}

