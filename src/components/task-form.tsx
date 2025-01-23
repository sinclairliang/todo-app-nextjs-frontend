'use client';

import { useState } from 'react';
import { Task } from "@/types";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: Partial<Task>) => void;
  isSubmitting?: boolean;
}

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    color: initialData?.color || 'blue',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <select
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value as Task['color'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}