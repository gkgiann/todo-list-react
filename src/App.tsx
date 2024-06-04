import "./global.scss";
import styles from "./App.module.scss";

import axios from "axios";

import clipboard from "./assets/clipboard.svg";
import { PlusCircle } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Task } from "./components/Task/Task";
import { HeaderTasksInfo } from "./components/HeaderTasksInfo/HeaderTasksInfo";
import { ThreeDots } from "react-loader-spinner";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TaskResponse {
  id: string;
  text: string;
  is_completed: boolean;
}

export function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3333/tasks").then((response) => {
      const data: TaskResponse[] = response.data;

      const dataTasks = data.map((task) => {
        const taskFormatted: Task = {
          isCompleted: task.is_completed,
          ...task,
        };

        return taskFormatted;
      });

      dataTasks.reverse();
      setTasks(dataTasks);
      setLoading(false);
    });
  }, []);

  function handleAddNewTask(e: FormEvent) {
    e.preventDefault();

    axios
      .post("http://localhost:3333/tasks", {
        text: newTaskText,
      })
      .then((response) => {
        const newTask = response.data;

        setTasks([newTask, ...tasks]);
        setNewTaskText("");
      });
  }

  function deleteTask(taskId: string) {
    axios.delete(`http://localhost:3333/tasks/${taskId}`).then(() => {
      const tasksWithoutDeletedTask = tasks.filter(
        (task) => task.id !== taskId
      );
      setTasks(tasksWithoutDeletedTask);
    });
  }

  function toogleTaskIsCompleted(taskId: string) {
    const taskToToggle = tasks.find((task) => task.id === taskId);

    axios
      .put(`http://localhost:3333/tasks/${taskToToggle?.id}`, {
        text: taskToToggle?.text,
        isCompleted: !taskToToggle?.isCompleted,
      })
      .then(() => {
        const tasksWithTaskIsCompletedUpdated = tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }

          return task;
        });

        setTasks(tasksWithTaskIsCompletedUpdated);
      });
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form className={styles.formNewTask} onSubmit={handleAddNewTask}>
          <input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            type="text"
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit" disabled={newTaskText.trim().length === 0}>
            Criar <PlusCircle size={16} weight="bold" />
          </button>
        </form>

        <div className={styles.tasksContainer}>
          <HeaderTasksInfo tasks={tasks} />

          {loading && (
            <div className={styles.loader}>
              <ThreeDots width="100" color="#4ea8de" />
            </div>
          )}

          {tasks.length === 0 ? (
            <main className={styles.tasksMainEmpty}>
              <img src={clipboard} alt="Clipboard" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </main>
          ) : (
            <main className={styles.tasks}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    handleDeleteTask={deleteTask}
                    handleToogleTaskIsCompleted={toogleTaskIsCompleted}
                  />
                );
              })}
            </main>
          )}
        </div>
      </div>
    </>
  );
}
