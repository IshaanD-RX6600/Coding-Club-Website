'use client';

import { useState, useEffect } from 'react';
import { Workshop, WorkshopMaterial } from '@/types/content';
import { getWorkshops, createWorkshop, updateWorkshop, deleteWorkshop, createWorkshopMaterial, deleteWorkshopMaterial } from '@/lib/content';
import { PlusIcon, PencilIcon, TrashIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import ContentForm from '@/components/admin/ContentForm';
import { Spinner } from '@/components/Spinner';

export default function WorkshopsAdmin() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [creatingWorkshop, setCreatingWorkshop] = useState(false);
  const [addingMaterial, setAddingMaterial] = useState<string | null>(null); // Workshop ID for which we're adding material
  const [materialData, setMaterialData] = useState({ 
    title: '', 
    url: '', 
    type: 'document' as const, 
    order_position: 0 
  });

  const loadWorkshops = async () => {
    try {
      setLoading(true);
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error('Failed to load workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const handleEditSubmit = async (formData: any) => {
    if (!editingWorkshop) return;
    
    try {
      const updatedWorkshop = await updateWorkshop({
        id: editingWorkshop.id,
        ...formData
      });
      setWorkshops(workshops.map(w => w.id === updatedWorkshop.id ? updatedWorkshop : w));
      setEditingWorkshop(null);
    } catch (error) {
      console.error('Failed to update workshop:', error);
    }
  };

  const handleCreateSubmit = async (formData: any) => {
    try {
      const newWorkshop = await createWorkshop(formData);
      setWorkshops([...workshops, newWorkshop]);
      setCreatingWorkshop(false);
    } catch (error) {
      console.error('Failed to create workshop:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workshop? This will also delete all materials associated with it.')) {
      return;
    }
    
    try {
      await deleteWorkshop(id);
      setWorkshops(workshops.filter(w => w.id !== id));
    } catch (error) {
      console.error('Failed to delete workshop:', error);
    }
  };

  const handleAddMaterial = async () => {
    if (!addingMaterial) return;
    
    try {
      const newMaterial = await createWorkshopMaterial({
        ...materialData,
        workshop_id: addingMaterial
      });
      
      // Update the workshops state to include the new material
      setWorkshops(workshops.map(workshop => {
        if (workshop.id === addingMaterial) {
          return {
            ...workshop,
            materials: [...(workshop.materials || []), newMaterial]
          };
        }
        return workshop;
      }));
      
      // Reset form
      setAddingMaterial(null);
      setMaterialData({ 
        title: '', 
        url: '', 
        type: 'document' as const, 
        order_position: 0 
      });
    } catch (error) {
      console.error('Failed to add material:', error);
    }
  };

  const handleDeleteMaterial = async (workshopId: string, materialId: string) => {
    if (!confirm('Are you sure you want to delete this material?')) {
      return;
    }
    
    try {
      await deleteWorkshopMaterial(materialId);
      
      // Update the workshops state to remove the deleted material
      setWorkshops(workshops.map(workshop => {
        if (workshop.id === workshopId) {
          return {
            ...workshop,
            materials: (workshop.materials || []).filter(m => m.id !== materialId)
          };
        }
        return workshop;
      }));
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  const workshopFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'date', label: 'Date', type: 'text' as const, required: true },
    { name: 'week_number', label: 'Week Number', type: 'number' as const, required: true },
    { name: 'image_url', label: 'Image URL', type: 'url' as const, required: false },
  ];

  const materialFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'text', required: true },
    { name: 'order', label: 'Order', type: 'number', required: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select', 
      required: true,
      options: [
        { value: 'document', label: 'Document' },
        { value: 'video', label: 'Video' },
        { value: 'slides', label: 'Slides' },
        { value: 'code', label: 'Code' },
        { value: 'other', label: 'Other' }
      ]
    },
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
        <h1 className="text-2xl font-bold">Workshops Management</h1>
        <button
          onClick={() => setCreatingWorkshop(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Workshop
        </button>
      </div>

      {/* List of workshops */}
      <div className="space-y-6">
        {workshops.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No workshops found. Create your first one!</p>
        ) : (
          workshops.map((workshop) => (
            <div key={workshop.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{workshop.title}</h2>
                  <p className="text-gray-600 mt-1">
                    Week {workshop.week_number} • {new Date(workshop.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingWorkshop(workshop)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="Edit Workshop"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(workshop.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete Workshop"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{workshop.description}</p>

              {/* Materials section */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Materials</h3>
                  <button
                    onClick={() => setAddingMaterial(workshop.id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <DocumentPlusIcon className="h-4 w-4 mr-1" />
                    Add Material
                  </button>
                </div>

                {/* Materials list */}
                {workshop.materials && workshop.materials.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {workshop.materials.map((material) => (
                      <li key={material.id} className="py-3 flex justify-between items-center">
                        <div>
                          <a 
                            href={material.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {material.title}
                          </a>
                          <p className="text-sm text-gray-600">
                            {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteMaterial(workshop.id, material.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete Material"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">No materials available</p>
                )}

                {/* Add material form */}
                {addingMaterial === workshop.id && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <h4 className="text-md font-medium mb-3">Add New Material</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {materialFields.map((field) => (
                        <div key={field.name} className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={materialData[field.name as keyof typeof materialData] as string}
                              onChange={(e) => setMaterialData({
                                ...materialData,
                                [field.name]: e.target.value
                              })}
                              required={field.required}
                            >
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={materialData[field.name as keyof typeof materialData] as string}
                              onChange={(e) => setMaterialData({
                                ...materialData,
                                [field.name]: e.target.value
                              })}
                              required={field.required}
                              rows={3}
                            />
                          ) : field.type === 'number' ? (
                            <input
                              type="number"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={materialData[field.name as keyof typeof materialData] as number}
                              onChange={(e) => setMaterialData({
                                ...materialData,
                                [field.name]: parseInt(e.target.value, 10) || 0
                              })}
                              required={field.required}
                            />
                          ) : (
                            <input
                              type={field.type}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={materialData[field.name as keyof typeof materialData] as string}
                              onChange={(e) => setMaterialData({
                                ...materialData,
                                [field.name]: e.target.value
                              })}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAddingMaterial(null);
                          setMaterialData({ 
                            title: '', 
                            url: '', 
                            type: 'document' as const, 
                            order_position: 0 
                          });
                        }}
                        className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddMaterial}
                        className="bg-blue-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                      >
                        Add Material
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Workshop Modal */}
      {editingWorkshop && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Workshop</h3>
                <ContentForm
                  fields={workshopFields}
                  initialData={editingWorkshop}
                  onSubmit={handleEditSubmit}
                  submitLabel="Update Workshop"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingWorkshop(null)}
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

      {/* Create Workshop Modal */}
      {creatingWorkshop && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Workshop</h3>
                <ContentForm
                  fields={workshopFields}
                  initialData={{
                    title: '',
                    description: '',
                    date: new Date().toISOString().split('T')[0],
                    week_number: 1,
                    image_url: '',
                  }}
                  onSubmit={handleCreateSubmit}
                  submitLabel="Create Workshop"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCreatingWorkshop(false)}
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