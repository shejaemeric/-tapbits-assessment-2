import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  completeTask,
  selectCompletedTasks,
  selectunCompletedTasks,
} from "./reducers/todoSlice";

function App() {
  const dispatch = useDispatch();
  const completedTasks = useSelector(selectCompletedTasks);
  const uncompletedTasks = useSelector(selectunCompletedTasks);

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskName = event.target.taskName.value;
    if (!taskName) return;
    dispatch(addTask(taskName));
    event.target.reset();
  };

  const handleCompleteTask = (task) => dispatch(completeTask(task));
  const handleDeleteTask = (task) => dispatch(deleteTask(task));

  const styles = {
    button: {
      background: "#106DF8",
      padding: "6px 18px",
      color: "white",
    },
    container: {
      display: "flex",
      justifyContent: "start",
      alignItems: "baseline",
      gap: "30px",
      marginBottom: "10px",
    },
    app: {
      width: "400px",
      margin: "auto",
      border: "1px solid black",
      padding: "50px",
    },
  };

  return (
    <div style={styles.app}>
      <form onSubmit={handleSubmit} style={styles.container}>
        <input
          style={{ width: "70%" }}
          type="text"
          name="taskName"
          placeholder="Add task..."
        />
        <button type="submit" style={styles.button}>Add</button>
      </form>
      <hr />
      <h5>Uncompleted tasks</h5>
      {uncompletedTasks.map((task) => (
        <div style={styles.container} key={task.id}>
          <p style={{ flex: 1 }}>{task.name}</p>
          <button
            style={styles.button}
            onClick={() => handleCompleteTask(task)}
          >
            Done
          </button>
          <button
            style={styles.button}
            onClick={() => handleDeleteTask({ ...task, isCompleted: false })}
          >
            Delete
          </button>
        </div>
      ))}
      <hr />
      <h5>Completed tasks</h5>
      {completedTasks.map((task) => (
        <div style={styles.container} key={task.id}>
          <p style={{ flex: 1 }}>{task.name}</p>
          <button
            style={styles.button}
            onClick={() => handleDeleteTask({ ...task, isCompleted: true })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
