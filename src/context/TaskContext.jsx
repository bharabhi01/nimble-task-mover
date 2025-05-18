
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask, updateTaskStatus } from '../api/tasksApi';
import { toast } from 'sonner';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      toast.error('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (newTask) => {
    try {
      const createdTask = await addTask(newTask);
      setTasks(prev => [...prev, createdTask]);
      toast.success('Task created successfully');
      return createdTask;
    } catch (err) {
      toast.error('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      const updated = await updateTask(taskId, updatedTask);
      setTasks(prev => prev.map(task => task.id === taskId ? updated : task));
      toast.success('Task updated successfully');
      return updated;
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      toast.success(`Task moved to ${newStatus}`);
      return updatedTask;
    } catch (err) {
      toast.error('Failed to move task');
      console.error('Error moving task:', err);
      throw err;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    createTask,
    editTask,
    removeTask,
    moveTask,
    refreshTasks: loadTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
