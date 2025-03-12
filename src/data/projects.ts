export interface Project {
  title: string;
  description: string;
  image?: string;
  link?: string;
  technologies: string[];
  category: 'web' | 'game' | 'ai' | 'hardware';
}

export const projects: Project[] = [
  {
    title: "Coding Club Website",
    description: "The official CHCI Coding Club website built with Next.js and Tailwind CSS",
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    category: "web",
    link: "https://github.com/chci-coding-club/website"
  },
  {
    title: "Chess AI",
    description: "A chess engine with multiple difficulty levels and AI strategies",
    technologies: ["Python", "TensorFlow", "PyGame"],
    category: "ai",
    link: "https://github.com/chci-coding-club/chess-ai"
  },
  {
    title: "Arduino Smart Home",
    description: "Smart home automation system using Arduino and various sensors",
    technologies: ["Arduino", "C++", "IoT", "Hardware"],
    category: "hardware",
    link: "https://github.com/chci-coding-club/arduino-smart-home"
  },
  {
    title: "2D Platformer Game",
    description: "A 2D platformer game with custom physics and level design",
    technologies: ["Unity", "C#", "Game Design"],
    category: "game",
    link: "https://github.com/chci-coding-club/platformer-game"
  },
  {
    title: "Weather Station",
    description: "Raspberry Pi-based weather station with real-time data visualization",
    technologies: ["Raspberry Pi", "Python", "Sensors", "Data Visualization"],
    category: "hardware",
    link: "https://github.com/chci-coding-club/weather-station"
  },
  {
    title: "Machine Learning Image Classifier",
    description: "Image classification model trained on custom dataset of school objects",
    technologies: ["Python", "TensorFlow", "Keras", "Computer Vision"],
    category: "ai",
    link: "https://github.com/chci-coding-club/image-classifier"
  },
  {
    title: "Inventory Management System",
    description: "Web application for managing school club inventory and equipment",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "web",
    link: "https://github.com/chci-coding-club/inventory-system"
  },
  {
    title: "Zombie Survival Game",
    description: "Top-down zombie survival game with procedural map generation",
    technologies: ["Unity", "C#", "Procedural Generation"],
    category: "game",
    link: "https://github.com/chci-coding-club/zombie-survival"
  }
]; 