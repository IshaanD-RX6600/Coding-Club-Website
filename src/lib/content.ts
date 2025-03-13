import { createClient } from '@supabase/supabase-js';
import { 
  Executive, 
  SocialLink, 
  GalleryImage, 
  HeroContent, 
  AboutSection 
} from '@/types/content';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Generic function to handle Supabase errors
const handleError = (error: any) => {
  console.error('Supabase error:', error);
  throw new Error(error.message);
};

// Hero Content
export const getHeroContent = async (): Promise<HeroContent> => {
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .single();
  
  if (error) handleError(error);
  return data;
};

export const updateHeroContent = async (content: Partial<HeroContent>): Promise<HeroContent> => {
  const { data, error } = await supabase
    .from('hero_content')
    .update(content)
    .eq('id', content.id)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
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
  const { data, error } = await supabase
    .from('about_section')
    .update(content)
    .eq('id', content.id)
    .select()
    .single();
  
  if (error) handleError(error);
  return data;
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