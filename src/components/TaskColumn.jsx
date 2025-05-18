
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';

const TaskColumn = ({ id, title, tasks }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <div className="task-column flex flex-col bg-gray-50 rounded-lg p-4 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <span className="bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 ${
              snapshot.isDraggingOver ? 'task-column-drop-active' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {!isAddingTask ? (
              <button
                onClick={() => setIsAddingTask(true)}
                className="w-full mt-2 py-2 px-3 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Task
              </button>
            ) : (
              <AddTaskForm
                status={id}
                onClose={() => setIsAddingTask(false)}
              />
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
