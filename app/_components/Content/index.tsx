// Styles
import styles from "../../index.module.css";

export function Content({ children, className }) {
  return (
    <main className={`${styles.content} basis-1/2 ${className}`}>
      {children}
    </main>
  );
}
