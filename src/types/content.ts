export interface Executive {
  id: string;
  name: string;
  grade: number;
  role?: string;
  order_position: number;
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
  order_position: number;
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
  order_position: number;
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

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url?: string;
  tags: string[];
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  week_number: number;
  date: string;
  materials: WorkshopMaterial[];
  created_at: string;
  updated_at: string;
}

export interface WorkshopMaterial {
  id: string;
  workshop_id: string;
  title: string;
  type: 'slides' | 'code' | 'video' | 'document' | 'other';
  url: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  platform: 'dmoj' | 'leetcode' | 'hackerrank' | 'tournament' | 'hackathon' | 'competition' | 'other';
  difficulty: 'easy' | 'medium' | 'hard' | 'na';
  url: string;
  due_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ChallengePlatform = 'dmoj' | 'leetcode' | 'hackerrank' | 'tournament' | 'hackathon' | 'competition' | 'other';
export type ChallengeDifficulty = 'beginner' | 'medium' | 'advanced' | 'na';

export interface Challenge {
  id: string;
  title: string;
  description?: string;
  platform: ChallengePlatform;
  difficulty: ChallengeDifficulty;
  url?: string;
  week_number?: number;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Hackathon {
  id: string;
  title: string;
  description?: string;
  location: string;
  start_date: string;
  end_date: string;
  url?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  title: string;
  description?: string;
  platform: string;
  date: string;
  registration_deadline?: string;
  url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Combined type for all content sections
export type ContentSection = 
  | { type: 'hero'; content: HeroContent }
  | { type: 'about'; content: AboutSection }
  | { type: 'social'; content: SocialLink[] }
  | { type: 'executives'; content: Executive[] }
  | { type: 'gallery'; content: GalleryImage[] }
  | { type: 'projects'; content: FeaturedProject[] }
  | { type: 'workshops'; content: Workshop[] }
  | { type: 'challenges'; content: CodingChallenge[] }; 