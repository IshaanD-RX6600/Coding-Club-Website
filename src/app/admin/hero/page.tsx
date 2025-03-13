'use client';

import { useEffect, useState } from 'react';
import ContentForm from '@/components/admin/ContentForm';
import { HeroContent } from '@/types/content';
import { getHeroContent, updateHeroContent } from '@/lib/content';

export default function HeroAdmin() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getHeroContent();
      setContent(data);
    } catch (error) {
      console.error('Error loading hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (!content?.id) return;
    await updateHeroContent({ ...data, id: content.id });
    await loadContent();
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
      label: 'Hero Title',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'description',
      label: 'Hero Description',
      type: 'textarea' as const,
      required: true,
    },
    {
      name: 'primary_button_text',
      label: 'Primary Button Text',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'primary_button_link',
      label: 'Primary Button Link',
      type: 'url' as const,
      required: true,
    },
    {
      name: 'secondary_button_text',
      label: 'Secondary Button Text',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'secondary_button_link',
      label: 'Secondary Button Link',
      type: 'url' as const,
      required: true,
    },
    {
      name: 'hero_image_url',
      label: 'Club Photo',
      type: 'url' as const,
      required: true,
      placeholder: 'https://example.com/image.jpg',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Edit Hero Section
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