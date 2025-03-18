'use client';

import { useState, useEffect } from 'react';
import { Challenge, Hackathon, Competition } from '@/types/content';
import { 
  getChallenges, createChallenge, updateChallenge, deleteChallenge,
  getHackathons, createHackathon, updateHackathon, deleteHackathon,
  getCompetitions, createCompetition, updateCompetition, deleteCompetition
} from '@/lib/content';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ContentForm from '@/components/admin/ContentForm';
import { Spinner } from '@/components/Spinner';
import { Tab } from '@headlessui/react';

type ContentType = 'challenges' | 'hackathons' | 'competitions';
type ContentItem = Challenge | Hackathon | Competition;

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'url' | 'checkbox' | 'select';
  required: boolean;
  options?: { value: string; label: string; }[];
}

export default function ChallengesAdmin() {
  const [selectedTab, setSelectedTab] = useState<ContentType>('challenges');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [creatingItem, setCreatingItem] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    platform: '',
    difficulty: '',
    isActive: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const loadContent = async () => {
    try {
      setLoading(true);
      const [challengesData, hackathonsData, competitionsData] = await Promise.all([
        getChallenges(),
        getHackathons(),
        getCompetitions()
      ]);
      setChallenges(challengesData);
      setHackathons(hackathonsData);
      setCompetitions(competitionsData);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleEditSubmit = async (formData: any) => {
    if (!editingItem) return;
    
    try {
      let updatedItem: ContentItem;
      switch (selectedTab) {
        case 'challenges':
          updatedItem = await updateChallenge({
            id: editingItem.id,
            ...formData
          });
          setChallenges(challenges.map(c => c.id === updatedItem.id ? updatedItem as Challenge : c));
          break;
        case 'hackathons':
          updatedItem = await updateHackathon({
            id: editingItem.id,
            ...formData
          });
          setHackathons(hackathons.map(h => h.id === updatedItem.id ? updatedItem as Hackathon : h));
          break;
        case 'competitions':
          updatedItem = await updateCompetition({
            id: editingItem.id,
            ...formData
          });
          setCompetitions(competitions.map(c => c.id === updatedItem.id ? updatedItem as Competition : c));
          break;
      }
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to update ${selectedTab.slice(0, -1)}:`, error);
    }
  };

  const handleCreateSubmit = async (formData: any) => {
    try {
      let newItem: ContentItem;
      switch (selectedTab) {
        case 'challenges':
          newItem = await createChallenge(formData);
          setChallenges([...challenges, newItem as Challenge]);
          break;
        case 'hackathons':
          newItem = await createHackathon(formData);
          setHackathons([...hackathons, newItem as Hackathon]);
          break;
        case 'competitions':
          newItem = await createCompetition(formData);
          setCompetitions([...competitions, newItem as Competition]);
          break;
      }
      setCreatingItem(false);
    } catch (error) {
      console.error(`Failed to create ${selectedTab.slice(0, -1)}:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${selectedTab.slice(0, -1)}?`)) {
      return;
    }
    
    try {
      switch (selectedTab) {
        case 'challenges':
          await deleteChallenge(id);
          setChallenges(challenges.filter(c => c.id !== id));
          break;
        case 'hackathons':
          await deleteHackathon(id);
          setHackathons(hackathons.filter(h => h.id !== id));
          break;
        case 'competitions':
          await deleteCompetition(id);
          setCompetitions(competitions.filter(c => c.id !== id));
          break;
      }
    } catch (error) {
      console.error(`Failed to delete ${selectedTab.slice(0, -1)}:`, error);
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (challenge.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesPlatform = !filters.platform || challenge.platform === filters.platform;
    const matchesDifficulty = !filters.difficulty || challenge.difficulty === filters.difficulty;
    const matchesActive = filters.isActive === '' || 
                         (filters.isActive === 'true' && challenge.is_active) ||
                         (filters.isActive === 'false' && !challenge.is_active);
    
    return matchesSearch && matchesPlatform && matchesDifficulty && matchesActive;
  });

  const challengeFields: Field[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'url', label: 'URL', type: 'url', required: true },
    { name: 'week_number', label: 'Week Number', type: 'number', required: true },
    { name: 'is_active', label: 'Is Active', type: 'checkbox', required: false },
    { 
      name: 'platform', 
      label: 'Platform', 
      type: 'select', 
      required: true,
      options: [
        { value: 'dmoj', label: 'DMOJ' },
        { value: 'leetcode', label: 'LeetCode' },
        { value: 'hackerrank', label: 'HackerRank' },
        { value: 'tournament', label: 'Tournament' },
        { value: 'other', label: 'Other' }
      ]
    },
    { 
      name: 'difficulty', 
      label: 'Difficulty', 
      type: 'select', 
      required: true,
      options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'medium', label: 'Medium' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'na', label: 'N/A' }
      ]
    }
  ];

  const hackathonFields: Field[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'start_date', label: 'Start Date', type: 'text', required: true },
    { name: 'end_date', label: 'End Date', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'url', required: true },
    { name: 'image_url', label: 'Image URL', type: 'url', required: false },
    { name: 'is_active', label: 'Is Active', type: 'checkbox', required: false }
  ];

  const competitionFields: Field[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'platform', label: 'Platform', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'text', required: true },
    { name: 'registration_deadline', label: 'Registration Deadline', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'url', required: true },
    { name: 'is_active', label: 'Is Active', type: 'checkbox', required: false }
  ];

  const getFields = () => {
    switch (selectedTab) {
      case 'challenges':
        return challengeFields;
      case 'hackathons':
        return hackathonFields;
      case 'competitions':
        return competitionFields;
    }
  };

  const getItems = () => {
    switch (selectedTab) {
      case 'challenges':
        return challenges;
      case 'hackathons':
        return hackathons;
      case 'competitions':
        return competitions;
      default:
        return [];
    }
  };

  const renderItemDetails = (item: ContentItem) => {
    switch (selectedTab) {
      case 'challenges':
        const challenge = item as Challenge;
        return (
          <div className="flex items-center mt-1 space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {challenge.platform.charAt(0).toUpperCase() + challenge.platform.slice(1)}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Week {challenge.week_number}
            </span>
          </div>
        );
      case 'hackathons':
        const hackathon = item as Hackathon;
        return (
          <div className="flex items-center mt-1 space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {hackathon.start_date && new Date(hackathon.start_date).toLocaleDateString()} - {hackathon.end_date && new Date(hackathon.end_date).toLocaleDateString()}
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {hackathon.location}
            </span>
          </div>
        );
      case 'competitions':
        const competition = item as Competition;
        return (
          <div className="flex items-center mt-1 space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              Date: {competition.date && new Date(competition.date).toLocaleDateString()}
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Registration Deadline: {competition.registration_deadline && new Date(competition.registration_deadline).toLocaleDateString()}
            </span>
          </div>
        );
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges Management</h1>
        <button
          onClick={() => setCreatingItem(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add {selectedTab.slice(0, -1)}
        </button>
      </div>

      <Tab.Group onChange={(index) => setSelectedTab(['challenges', 'hackathons', 'competitions'][index] as ContentType)}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['Challenges', 'Hackathons', 'Competitions'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                  ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>

      {/* Search and Filters */}
      {selectedTab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Platform
                </label>
                <select
                  value={filters.platform}
                  onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Platforms</option>
                  <option value="dmoj">DMOJ</option>
                  <option value="leetcode">LeetCode</option>
                  <option value="hackerrank">HackerRank</option>
                  <option value="tournament">Tournament</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="medium">Medium</option>
                  <option value="advanced">Advanced</option>
                  <option value="na">N/A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.isActive}
                  onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List of items */}
      <div className="space-y-6">
        {selectedTab === 'challenges' ? (
          filteredChallenges.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No challenges found matching your criteria.</p>
          ) : (
            filteredChallenges.map((item) => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                      {item.is_active && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    {renderItemDetails(item)}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2"
                      title={`Edit ${selectedTab.slice(0, -1)}`}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                      title={`Delete ${selectedTab.slice(0, -1)}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  View {selectedTab.slice(0, -1)}
                </a>
              </div>
            ))
          )
        ) : (
          getItems()?.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    {item.is_active && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  {renderItemDetails(item)}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title={`Edit ${selectedTab.slice(0, -1)}`}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title={`Delete ${selectedTab.slice(0, -1)}`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
              
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View {selectedTab.slice(0, -1)}
              </a>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Edit {selectedTab.slice(0, -1)}
                </h3>
                <ContentForm
                  fields={getFields() || []}
                  initialData={editingItem}
                  onSubmit={handleEditSubmit}
                  submitLabel={`Update ${selectedTab.slice(0, -1)}`}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {creatingItem && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Create New {selectedTab.slice(0, -1)}
                </h3>
                <ContentForm
                  fields={getFields() || []}
                  initialData={{
                    title: '',
                    description: '',
                    url: '',
                    is_active: true,
                    ...(selectedTab === 'challenges' && {
                      platform: 'other',
                      difficulty: 'medium',
                      week_number: 1
                    }),
                    ...(selectedTab === 'hackathons' && {
                      location: '',
                      start_date: new Date().toISOString().split('T')[0],
                      end_date: new Date().toISOString().split('T')[0],
                      image_url: ''
                    }),
                    ...(selectedTab === 'competitions' && {
                      platform: '',
                      date: new Date().toISOString().split('T')[0],
                      registration_deadline: new Date().toISOString().split('T')[0]
                    })
                  }}
                  onSubmit={handleCreateSubmit}
                  submitLabel={`Create ${selectedTab.slice(0, -1)}`}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCreatingItem(false)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
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