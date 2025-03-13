export interface Executive {
  id: string;
  name: string;
  grade: number;
  role?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  title: string;
  description: string;
  link: string;
  button_text: string;
  button_style: 'default' | 'instagram' | 'discord';
  order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_type: string;
  date: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  title: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  hero_image_url: string;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: string;
  title: string;
  description: string;
  meeting_location: string;
  meeting_time: string;
  created_at: string;
  updated_at: string;
}

// Combined type for all content sections
export type ContentSection = 
  | { type: 'hero'; content: HeroContent }
  | { type: 'about'; content: AboutSection }
  | { type: 'social'; content: SocialLink[] }
  | { type: 'executives'; content: Executive[] }
  | { type: 'gallery'; content: GalleryImage[] }; 