import styles from "./HeaderTasksInfo.module.scss";

interface HeaderTasksInfoProps {
  tasks: {
    id: string;
    text: string;
    isCompleted: boolean;
  }[];
}

export function HeaderTasksInfo({ tasks }: HeaderTasksInfoProps) {
  const tasksCompletedLength = tasks.filter(
    (task) => task.isCompleted === true
  ).length;

  return (
    <header className={styles.header}>
      <div>
        <strong className={styles.tasksCreated}>Tarefas criadas</strong>
        <span>{tasks.length}</span>
      </div>
      <div>
        <strong className={styles.tasksFinished}>Concluídas</strong>
        <span>
          {tasksCompletedLength === 0
            ? "0"
            : `${tasksCompletedLength} de ${tasks.length}`}
        </span>
      </div>
    </header>
  );
}
