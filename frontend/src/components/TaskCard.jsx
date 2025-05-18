import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditTaskForm from './EditTaskForm';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeTask } = useTasks();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <EditTaskForm task={task} onClose={handleCloseEdit} />
      ) : (
        <Draggable draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`task-card bg-white p-4 rounded-md shadow mb-3 border border-gray-100 ${
                snapshot.isDragging ? 'shadow-lg' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={handleEdit}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              {task.description && (
                <p className="text-gray-600 text-sm mt-2">{task.description}</p>
              )}
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default TaskCard;
