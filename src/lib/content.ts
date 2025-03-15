import { createClient } from '@supabase/supabase-js';
import { 
  Executive, 
  SocialLink, 
  GalleryImage, 
  HeroContent, 
  AboutSection,
  FeaturedProject,
  Workshop,
  WorkshopMaterial,
  CodingChallenge
} from '@/types/content';

// Create a standard client for read operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Create an admin client for write operations (only works on the server)
const adminAuthHeader = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY 
  ? { 
      global: { 
        headers: { 
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY}` 
        } 
      } 
    } 
  : undefined;

// Generic function to handle Supabase errors
const handleError = (error: any) => {
  console.error('Supabase error:', error);
  throw new Error(error.message);
};

// Helper function for admin updates
const adminApiUpdate = async <T>(endpoint: string, data: any): Promise<T> => {
  console.log(`Using admin API route for ${endpoint} update`);
  
  const response = await fetch(`/api/admin/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    let errorText = '';
    try {
      const errorData = await response.json();
      errorText = errorData.error || '';
    } catch (e) {
      errorText = await response.text();
    }
    console.error(`Error from ${endpoint} API route:`, response.status, errorText);
    throw new Error(`Failed to update: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  console.log(`API route response for ${endpoint}:`, result);
  
  if (!result.data) {
    throw new Error(`No data returned from ${endpoint} API route`);
  }
  
  return result.data as T;
};

// Hero Content
export const getHeroContent = async (): Promise<HeroContent> => {
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Error fetching hero content:', error);
    handleError(error);
  }
  
  if (!data || data.length === 0) {
    console.error('No hero content found');
    throw new Error('No hero content found');
  }
  
  return data[0];
};

export const updateHeroContent = async (content: Partial<HeroContent>): Promise<HeroContent> => {
  console.log('Attempting to update hero content with ID:', content.id);
  
  try {
    // First check if the record exists
    const { data: existingData, error: fetchError } = await supabase
      .from('hero_content')
      .select('*')
      .eq('id', content.id);

    console.log('Existing data found:', existingData);

    if (fetchError) {
      console.error('Error fetching hero content:', fetchError);
      handleError(fetchError);
    }

    if (!existingData || existingData.length === 0) {
      console.error('No hero content found with ID:', content.id);
      throw new Error('No hero content found with the provided ID');
    }

    // Use the admin API route to update the content
    return await adminApiUpdate<HeroContent>('update-hero', content);
  } catch (error) {
    console.error('Error in updateHeroContent:', error);
    throw error;
  }
};

// About Section
export const getAboutSection = async (): Promise<AboutSection> => {
  const { data, error } = await supabase
    .from('about_section')
    .select('*')
    .single();
  
  if (error) handleError(error);
  return data;
};

export const updateAboutSection = async (content: Partial<AboutSection>): Promise<AboutSection> => {
  console.log('Attempting to update about section with ID:', content.id);
  
  try {
    // First check if the record exists
    const { data: existingData, error: fetchError } = await supabase
      .from('about_section')
      .select('*')
      .eq('id', content.id);

    if (fetchError) {
      console.error('Error fetching about section:', fetchError);
      handleError(fetchError);
    }

    if (!existingData || existingData.length === 0) {
      console.error('No about section found with ID:', content.id);
      throw new Error('No about section found with the provided ID');
    }

    // Use the admin API route to update the content
    return await adminApiUpdate<AboutSection>('update-about', content);
  } catch (error) {
    console.error('Error in updateAboutSection:', error);
    throw error;
  }
};

// Social Links
export const getSocialLinks = async (): Promise<SocialLink[]> => {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('order_position');
  
  if (error) handleError(error);
  return data || [];
};

export const updateSocialLink = async (link: Partial<SocialLink>): Promise<SocialLink> => {
  try {
    if (!link.id) {
      throw new Error('Social link ID is required');
    }
    return await adminApiUpdate<SocialLink>('update-social', link);
  } catch (error) {
    console.error('Error updating social link:', error);
    throw error;
  }
};

export const createSocialLink = async (link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>): Promise<SocialLink> => {
  try {
    const response = await fetch('/api/admin/update-social', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(link)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create social link: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating social link:', error);
    throw error;
  }
};

export const deleteSocialLink = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-social?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete social link: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting social link:', error);
    throw error;
  }
};

// Executives
export const getExecutives = async (): Promise<Executive[]> => {
  const { data, error } = await supabase
    .from('executives')
    .select('*')
    .order('order_position');
  
  if (error) handleError(error);
  return data || [];
};

export const updateExecutive = async (executive: Partial<Executive>): Promise<Executive> => {
  try {
    if (!executive.id) {
      throw new Error('Executive ID is required');
    }
    return await adminApiUpdate<Executive>('update-executive', executive);
  } catch (error) {
    console.error('Error updating executive:', error);
    throw error;
  }
};

export const createExecutive = async (executive: Omit<Executive, 'id' | 'created_at' | 'updated_at'>): Promise<Executive> => {
  try {
    const response = await fetch('/api/admin/update-executive', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(executive)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create executive: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating executive:', error);
    throw error;
  }
};

export const deleteExecutive = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-executive?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete executive: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting executive:', error);
    throw error;
  }
};

// Gallery Images
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('order_position');
  
  if (error) handleError(error);
  return data || [];
};

export const updateGalleryImage = async (image: Partial<GalleryImage>): Promise<GalleryImage> => {
  try {
    if (!image.id) {
      throw new Error('Gallery image ID is required');
    }
    return await adminApiUpdate<GalleryImage>('update-gallery', image);
  } catch (error) {
    console.error('Error updating gallery image:', error);
    throw error;
  }
};

export const createGalleryImage = async (image: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryImage> => {
  try {
    const response = await fetch('/api/admin/update-gallery', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create gallery image: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating gallery image:', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-gallery?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete gallery image: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};

// Featured Projects
export const getFeaturedProjects = async (): Promise<FeaturedProject[]> => {
  const { data, error } = await supabase
    .from('featured_projects')
    .select('*')
    .order('order_position');
  
  if (error) handleError(error);
  return data || [];
};

export const updateFeaturedProject = async (project: Partial<FeaturedProject>): Promise<FeaturedProject> => {
  try {
    if (!project.id) {
      throw new Error('Project ID is required');
    }
    return await adminApiUpdate<FeaturedProject>('update-project', project);
  } catch (error) {
    console.error('Error updating featured project:', error);
    throw error;
  }
};

export const createFeaturedProject = async (project: Omit<FeaturedProject, 'id' | 'created_at' | 'updated_at'>): Promise<FeaturedProject> => {
  try {
    const response = await fetch('/api/admin/update-project', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create featured project: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating featured project:', error);
    throw error;
  }
};

export const deleteFeaturedProject = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-project?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete featured project: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting featured project:', error);
    throw error;
  }
};

// Workshops
export const getWorkshops = async (): Promise<Workshop[]> => {
  const { data, error } = await supabase
    .from('workshops')
    .select('*, materials:workshop_materials(*)')
    .order('week_number');
  
  if (error) handleError(error);
  return data || [];
};

export const updateWorkshop = async (workshop: Partial<Workshop>): Promise<Workshop> => {
  try {
    if (!workshop.id) {
      throw new Error('Workshop ID is required');
    }
    return await adminApiUpdate<Workshop>('update-workshop', workshop);
  } catch (error) {
    console.error('Error updating workshop:', error);
    throw error;
  }
};

export const createWorkshop = async (workshop: Omit<Workshop, 'id' | 'created_at' | 'updated_at' | 'materials'>): Promise<Workshop> => {
  try {
    const response = await fetch('/api/admin/update-workshop', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workshop)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create workshop: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating workshop:', error);
    throw error;
  }
};

export const deleteWorkshop = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-workshop?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete workshop: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting workshop:', error);
    throw error;
  }
};

// Workshop Materials
export const createWorkshopMaterial = async (material: Omit<WorkshopMaterial, 'id' | 'created_at' | 'updated_at'>): Promise<WorkshopMaterial> => {
  try {
    const response = await fetch('/api/admin/update-workshop-material', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create workshop material: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating workshop material:', error);
    throw error;
  }
};

export const deleteWorkshopMaterial = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-workshop-material?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete workshop material: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting workshop material:', error);
    throw error;
  }
};

// Coding Challenges
export const getCodingChallenges = async (): Promise<CodingChallenge[]> => {
  const { data, error } = await supabase
    .from('coding_challenges')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) handleError(error);
  return data || [];
};

export const updateCodingChallenge = async (challenge: Partial<CodingChallenge>): Promise<CodingChallenge> => {
  try {
    if (!challenge.id) {
      throw new Error('Challenge ID is required');
    }
    return await adminApiUpdate<CodingChallenge>('update-challenge', challenge);
  } catch (error) {
    console.error('Error updating coding challenge:', error);
    throw error;
  }
};

export const createCodingChallenge = async (challenge: Omit<CodingChallenge, 'id' | 'created_at' | 'updated_at'>): Promise<CodingChallenge> => {
  try {
    const response = await fetch('/api/admin/update-challenge', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challenge)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create coding challenge: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    if (!result.data) {
      throw new Error('No data returned from API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error creating coding challenge:', error);
    throw error;
  }
};

export const deleteCodingChallenge = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/admin/update-challenge?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete coding challenge: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting coding challenge:', error);
    throw error;
  }
}; 