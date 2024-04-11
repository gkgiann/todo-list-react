import { CheckCircle, Circle, Trash } from "phosphor-react";
import styles from "./Task.module.scss";

interface TaskProps {
  task: {
    id: string;
    text: string;
    isCompleted: boolean;
  };
  handleToogleTaskIsCompleted: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

export function Task({
  task,
  handleToogleTaskIsCompleted,
  handleDeleteTask,
}: TaskProps) {
  return (
    <div className={styles.task}>
      <div>
        {task.isCompleted ? (
          <button
            onClick={() => handleToogleTaskIsCompleted(task.id)}
            className={styles.checked}
          >
            <CheckCircle
              className={styles.checkedIcon}
              size={24}
              weight="fill"
            />
          </button>
        ) : (
          <button
            onClick={() => handleToogleTaskIsCompleted(task.id)}
            className={styles.check}
          >
            <Circle size={24} />
          </button>
        )}

        <span className={task.isCompleted ? styles.textThrough : ""}>
          {task.text}
        </span>
      </div>
      <button
        title="Deletar"
        className={styles.delete}
        onClick={() => handleDeleteTask(task.id)}
      >
        <Trash size={16} />
      </button>
    </div>
  );
}
