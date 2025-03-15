'use client';

import { useEffect, useState } from 'react';
import ContentForm from '@/components/admin/ContentForm';
import { AboutSection } from '@/types/content';
import { getAboutSection, updateAboutSection } from '@/lib/content';

export default function AboutAdmin() {
  const [content, setContent] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getAboutSection();
      setContent(data);
    } catch (error) {
      console.error('Error loading about section content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (!content?.id) return;
    try {
      await updateAboutSection({ ...data, id: content.id });
      await loadContent();
    } catch (error) {
      console.error('Error updating about section:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const fields = [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
    },
    {
      name: 'meeting_location',
      label: 'Meeting Location',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'meeting_time',
      label: 'Meeting Time',
      type: 'text' as const,
      required: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Edit About Section
          </h2>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ContentForm
            fields={fields}
            initialData={content || {}}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
} 