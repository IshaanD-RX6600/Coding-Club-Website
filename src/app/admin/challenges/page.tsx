'use client';

import { useState, useEffect } from 'react';
import { CodingChallenge } from '@/types/content';
import { getCodingChallenges, createCodingChallenge, updateCodingChallenge, deleteCodingChallenge } from '@/lib/content';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ContentForm from '@/components/admin/ContentForm';
import { Spinner } from '@/components/Spinner';

export default function ChallengesAdmin() {
  const [challenges, setChallenges] = useState<CodingChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingChallenge, setEditingChallenge] = useState<CodingChallenge | null>(null);
  const [creatingChallenge, setCreatingChallenge] = useState(false);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const data = await getCodingChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to load challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleEditSubmit = async (formData: any) => {
    if (!editingChallenge) return;
    
    try {
      const updatedChallenge = await updateCodingChallenge({
        id: editingChallenge.id,
        ...formData
      });
      setChallenges(challenges.map(c => c.id === updatedChallenge.id ? updatedChallenge : c));
      setEditingChallenge(null);
    } catch (error) {
      console.error('Failed to update challenge:', error);
    }
  };

  const handleCreateSubmit = async (formData: any) => {
    try {
      const newChallenge = await createCodingChallenge(formData);
      setChallenges([...challenges, newChallenge]);
      setCreatingChallenge(false);
    } catch (error) {
      console.error('Failed to create challenge:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this challenge?')) {
      return;
    }
    
    try {
      await deleteCodingChallenge(id);
      setChallenges(challenges.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete challenge:', error);
    }
  };

  const challengeFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'url', label: 'URL', type: 'url' as const, required: true },
    { name: 'due_date', label: 'Due Date', type: 'text' as const, required: false },
    { name: 'is_active', label: 'Is Active', type: 'checkbox' as const, required: false },
    { 
      name: 'platform', 
      label: 'Platform', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'dmoj', label: 'DMOJ' },
        { value: 'leetcode', label: 'LeetCode' },
        { value: 'hackerrank', label: 'HackerRank' },
        { value: 'tournament', label: 'Tournament' },
        { value: 'hackathon', label: 'Hackathon' },
        { value: 'competition', label: 'Competition' },
        { value: 'other', label: 'Other' }
      ]
    },
    { 
      name: 'difficulty', 
      label: 'Difficulty', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
        { value: 'na', label: 'N/A' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coding Challenges Management</h1>
        <button
          onClick={() => setCreatingChallenge(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Challenge
        </button>
      </div>

      {/* List of challenges */}
      <div className="space-y-6">
        {challenges.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No coding challenges found. Create your first one!</p>
        ) : (
          challenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">{challenge.title}</h2>
                    {challenge.is_active && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {challenge.platform.charAt(0).toUpperCase() + challenge.platform.slice(1)}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {challenge.difficulty === 'easy' ? 'Easy' : 
                       challenge.difficulty === 'medium' ? 'Medium' : 
                       challenge.difficulty === 'hard' ? 'Hard' : 'N/A'}
                    </span>
                    {challenge.due_date && (
                      <span className="text-gray-600 text-sm">
                        Due: {new Date(challenge.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingChallenge(challenge)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="Edit Challenge"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(challenge.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete Challenge"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{challenge.description}</p>
              
              <a 
                href={challenge.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Challenge
              </a>
            </div>
          ))
        )}
      </div>

      {/* Edit Challenge Modal */}
      {editingChallenge && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Coding Challenge</h3>
                <ContentForm
                  fields={challengeFields}
                  initialData={editingChallenge}
                  onSubmit={handleEditSubmit}
                  submitLabel="Update Challenge"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingChallenge(null)}
                    className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Challenge Modal */}
      {creatingChallenge && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Coding Challenge</h3>
                <ContentForm
                  fields={challengeFields}
                  initialData={{
                    title: '',
                    description: '',
                    url: '',
                    platform: 'other',
                    difficulty: 'medium',
                    is_active: true,
                    due_date: ''
                  }}
                  onSubmit={handleCreateSubmit}
                  submitLabel="Create Challenge"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCreatingChallenge(false)}
                    className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 