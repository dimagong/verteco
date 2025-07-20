import styles from "./page.module.css";

import NoteTable from "./components/NotesTable";

export default async function Home() {
  return (
    <div className={styles.page}>
      <NoteTable />
    </div>
  );
}
