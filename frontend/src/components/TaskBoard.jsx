import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import { useTasks } from '../context/TaskContext';

const TaskBoard = () => {
  const { tasks, loading, error, moveTask } = useTasks();

  const columns = {
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: tasks.filter(task => task.status === 'todo'),
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      tasks: tasks.filter(task => task.status === 'inProgress'),
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: tasks.filter(task => task.status === 'done'),
    },
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (source.droppableId !== destination.droppableId) {
      await moveTask(draggableId, destination.droppableId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 overflow-x-auto pb-4">
        {Object.values(columns).map(column => (
          <TaskColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
