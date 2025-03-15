import { createClient } from '@supabase/supabase-js';
import { 
  Executive, 
  SocialLink, 
  GalleryImage, 
  HeroContent, 
  AboutSection 
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

  // Extract only the fields we want to update (avoid id, created_at)
  const {
    id,
    created_at,
    updated_at,
    ...updateFields
  } = content;

  // Use update with only the fields we want to update
  const { data, error } = await supabase
    .from('about_section')
    .update({
      ...updateFields,
      updated_at: new Date().toISOString()
    })
    .eq('id', content.id)
    .select();
  
  if (error) {
    console.error('Error updating about section:', error);
    handleError(error);
  }
  
  // If update didn't return data, try a direct select to verify it worked
  if (!data || data.length === 0) {
    const { data: verifyData, error: verifyError } = await supabase
      .from('about_section')
      .select('*')
      .eq('id', content.id)
      .single();
      
    if (verifyError) {
      console.error('Error verifying about section update:', verifyError);
      handleError(verifyError);
    }
    
    if (!verifyData) {
      throw new Error('Failed to update about section');
    }
    
    return verifyData;
  }
  
  return data[0];
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
  const { data, error } = await supabase
    .from('social_links')
    .update(link)
    .eq('id', link.id)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
};

export const createSocialLink = async (link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>): Promise<SocialLink> => {
  const { data, error } = await supabase
    .from('social_links')
    .insert(link)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
};

export const deleteSocialLink = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('social_links')
    .delete()
    .eq('id', id);
  
  if (error) handleError(error);
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
  const { data, error } = await supabase
    .from('executives')
    .update(executive)
    .eq('id', executive.id)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
};

export const createExecutive = async (executive: Omit<Executive, 'id' | 'created_at' | 'updated_at'>): Promise<Executive> => {
  const { data, error } = await supabase
    .from('executives')
    .insert(executive)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
};

export const deleteExecutive = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('executives')
    .delete()
    .eq('id', id);
  
  if (error) handleError(error);
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
  const { data, error } = await supabase
    .from('gallery_images')
    .update(image)
    .eq('id', image.id)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
};

export const createGalleryImage = async (image: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryImage> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert(image)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id);
  
  if (error) handleError(error);
}; 