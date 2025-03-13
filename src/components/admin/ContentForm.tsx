'use client';

import { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
}

interface ContentFormProps {
  fields: Field[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
}

export default function ContentForm({
  fields,
  initialData = {},
  onSubmit,
  submitLabel = 'Save Changes'
}: ContentFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {field.label}
          </label>
          <div className="mt-1">
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                rows={3}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                required={field.required}
              />
            )}
          </div>
        </div>
      ))}

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {success && (
        <div className="text-sm text-green-600 dark:text-green-400">
          Changes saved successfully!
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
} 