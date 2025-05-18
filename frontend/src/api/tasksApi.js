
// This file simulates API calls to a backend service
// In a real application, these would make actual HTTP requests

// Simulating some delay to mimic real API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initial data
let tasks = [
  {
    id: "task-1",
    title: "Research project requirements",
    description: "Gather all necessary information for the upcoming project",
    status: "todo"
  },
  {
    id: "task-2",
    title: "Design user interface",
    description: "Create wireframes and mockups for the application",
    status: "todo"
  },
  {
    id: "task-3",
    title: "Implement login functionality",
    description: "Add authentication system to the application",
    status: "inProgress"
  },
  {
    id: "task-4",
    title: "Write documentation",
    description: "Document the API endpoints and usage instructions",
    status: "inProgress"
  },
  {
    id: "task-5",
    title: "Fix navigation bug",
    description: "Address the issue with menu navigation on mobile devices",
    status: "done"
  },
  {
    id: "task-6",
    title: "Deploy to staging environment",
    description: "Prepare and deploy the app to the staging server",
    status: "done"
  }
];

export const fetchTasks = async () => {
  await delay(500); // Simulate network delay
  return [...tasks];
};

export const addTask = async (task) => {
  await delay(300);
  const newTask = {
    ...task,
    id: `task-${Date.now()}`,
  };
  tasks = [...tasks, newTask];
  return newTask;
};

export const updateTask = async (taskId, updatedTask) => {
  await delay(300);
  tasks = tasks.map((task) => 
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
  return tasks.find(task => task.id === taskId);
};

export const deleteTask = async (taskId) => {
  await delay(300);
  tasks = tasks.filter((task) => task.id !== taskId);
  return { success: true };
};

export const updateTaskStatus = async (taskId, newStatus) => {
  await delay(300);
  tasks = tasks.map((task) => 
    task.id === taskId ? { ...task, status: newStatus } : task
  );
  return tasks.find(task => task.id === taskId);
};
