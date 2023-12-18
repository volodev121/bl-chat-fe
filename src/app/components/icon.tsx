import useStyles from "./styles";

export const RadioCheckedIcon = () => {
  const styles = useStyles();
  return (
    <span className={styles.radioIconContainer}>
      <span className={styles.radioUncheckedIcon}/>
    </span>
  );
};

export const RadioUncheckedIcon = () => {
  const styles = useStyles();
  return (
    <span className={styles.radioIconContainer}>
      <span className={styles.radioUncheckedIcon}>
        <span className={styles.radioCheckedIcon}/>
      </span>
    </span>
  );
};
