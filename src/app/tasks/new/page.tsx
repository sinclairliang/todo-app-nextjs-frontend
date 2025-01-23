'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/app/services/taskService';
import { Task } from '@/types';
import TaskForm from '@/components/task-form';


export default function CreateTask() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: Partial<Task>) => {
    try {
      setIsSubmitting(true);
      await createTask(formData);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
      />
      <button
        onClick={() => router.back()}
        className="mt-4 text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>
    </div>
  );
}