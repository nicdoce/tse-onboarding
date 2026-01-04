import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [task, setTask] = useState<Task>();
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const id = useParams().id;
  useEffect(() => {
    if (id) {
      getTask(id)
        .then((result) => {
          if (result.success) {
            setTask(result.data);
          }
        })
        .catch(setErrorModalMessage);
    }
  }, [id]);

  const handleSubmit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (updatedTask: Task) => {
    setIsEditing(false);
    setTask(updatedTask);
  };

  const taskTitle = task ? task.title : "This task doesn't exist!";
  const taskDescription = task?.description ? task.description : "(No description)";
  const done = task?.isChecked ? "Done" : "Not done";
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(task?.dateCreated);

  if (isEditing) {
    return (
      <Page>
        <div className={styles.pageContent}>
          <title>{taskTitle} | TSE Todos</title>
          <p>
            <Link to="/">Back to home</Link>
          </p>
          <TaskForm mode="edit" task={task} onSubmit={handleEditSubmit} />
        </div>
      </Page>
    );
  }
  return (
    <Page>
      <div className={styles.pageContent}>
        <title>{taskTitle} | TSE Todos</title>
        <p>
          <Link to="/">Back to home</Link>
        </p>
        <div className={styles.titleContainer}>
          <span className={styles.taskTitle}>{taskTitle}</span>
          {task && <Button className={styles.button} label="Edit task" onClick={handleSubmit} />}
        </div>
        {task && <p className={styles.taskDescription}>{taskDescription}</p>}
        <div className={styles.container}>
          {task && <p className={styles.item}>Assignee</p>}
          {task && <UserTag assignee={task?.assignee}></UserTag>}
        </div>
        <div className={styles.container}>
          {task && <p className={styles.item}>Status</p>}
          {task && <p className={styles.taskText}>{done}</p>}
        </div>
        <div className={styles.container}>
          {task && <p className={styles.item}>Date created</p>}
          {task && <p className={styles.taskText}>{date}</p>}
        </div>
      </div>
    </Page>
  );
}
