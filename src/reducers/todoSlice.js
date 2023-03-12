import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uncompletedTasks: [],
  completedTasks: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.uncompletedTasks.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    completeTask: (state, action) => {
      const { id, name } = action.payload;
      state.uncompletedTasks = state.uncompletedTasks.filter(
        (item) => id !== item.id
      );
      state.completedTasks.push({
        id: id,
        name: name,
      });
    },
    deleteTask: (state, action) => {
      const { id, isCompleted } = action.payload;
      if (!isCompleted) {
        state.uncompletedTasks = state.uncompletedTasks.filter(
          (item) => id !== item.id
        );
      } else {
        state.completedTasks = state.completedTasks.filter(
          (item) => id !== item.id
        );
      }
    },
  },
});

export const { addTask, completeTask, deleteTask } = todoSlice.actions;
export const selectCompletedTasks = (state) => state.completedTasks;
export const selectunCompletedTasks = (state) => state.uncompletedTasks;

export default todoSlice.reducer;
