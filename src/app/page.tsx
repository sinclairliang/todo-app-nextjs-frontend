'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from '@/types';
import { deleteTask, fetchTasks, updateTask } from './services/taskService';
import TaskCard from '@/components/task-card';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed });
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, completed } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleUpdate = async (id: number, data: Partial<Task>) => {
    try {
      await updateTask(id, data);
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, ...data } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;

  if (loading) {
    return <div className="max-w-4xl mx-auto p-4">Loading tasks...</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <Link
          href="/tasks/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Task
        </Link>
      </div>

      <div className="mb-4 text-gray-600">
        Tasks: {tasks.length} | Completed: {completedCount} of {tasks.length}
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </main>
  );
}