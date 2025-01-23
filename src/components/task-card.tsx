import { Task } from '@/types';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Task>) => void;
}

export default function TaskCard({ task, onToggle, onDelete, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [color, setColor] = useState(task.color);

  const handleSubmit = () => {
    onUpdate(task.id, { title, color });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`p-4 rounded-lg border ${
        color === 'red' ? 'border-red-200' : 
        color === 'blue' ? 'border-blue-200' : 
        'border-green-200'
      }`}>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            autoFocus
          />
          <select
            value={color}
            onChange={(e) => setColor(e.target.value as Task['color'])}
            className="border rounded px-2 py-1"
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setTitle(task.title);
                setColor(task.color);
                setIsEditing(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border ${
      task.color === 'red' ? 'border-red-200' : 
      task.color === 'blue' ? 'border-blue-200' : 
      'border-green-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
            className="h-5 w-5"
          />
          <span 
            onClick={() => setIsEditing(true)}
            className={`text-lg cursor-pointer hover:text-blue-600 ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}