import styles from "./Palette.module.css";

export default function Palette() {
  return (
    <div>
      <button className={styles.button}>Check my BG</button>
      <button className={styles.button}>Check my BG</button>
      <button className={styles.button}>Check my BG</button>

      <div className={styles.colorBox}>
        <h1 className={styles.title}>Primary</h1>
        <div className={`${styles.colors} ${styles.primary}`}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div>
      </div>
      <div className={styles.colorBox}>
        <h1 className={styles.title}>Accent</h1>
        <div className={`${styles.colors} ${styles.accent}`}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div>
      </div>
      <div className={styles.colorBox}>
        <h1 className={styles.title}>Green</h1>
        <div className={`${styles.colors} ${styles.green}`}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div>
      </div>
      <div className={styles.colorBox}>
        <h1 className={styles.title}>Red</h1>
        <div className={`${styles.colors} ${styles.red}`}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div>
      </div>
      <div className={styles.colorBox}>
        <h1 className={styles.title}>Yellow</h1>
        <div className={`${styles.colors} ${styles.yellow}`}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div>
      </div>
      <div className={styles.colorBox}>
        <h1 className={styles.title}>Greys</h1>
        <div className={`${styles.colors} ${styles.grey}`}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div>
      </div>
    </div>
  );
}
