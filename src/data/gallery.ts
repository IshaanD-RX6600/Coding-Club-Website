export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  src: string;
  date: string;
  event?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Club Kickoff Meeting",
    description: "Our first meeting of the year introducing the club and its activities",
    src: "/images/gallery/kickoff.jpg",
    date: "September 15, 2023",
    event: "Club Kickoff"
  },
  {
    id: "2",
    title: "Python Workshop",
    description: "Learning the basics of Python programming",
    src: "/images/gallery/python-workshop.jpg",
    date: "October 5, 2023",
    event: "Workshop"
  },
  {
    id: "3",
    title: "Hackathon Planning",
    description: "Team brainstorming session for upcoming hackathon",
    src: "/images/gallery/hackathon-planning.jpg",
    date: "November 10, 2023",
    event: "Planning Session"
  },
  {
    id: "4",
    title: "Game Development Workshop",
    description: "Creating simple games using Unity",
    src: "/images/gallery/unity-workshop.jpg",
    date: "November 22, 2023",
    event: "Workshop"
  },
  {
    id: "5",
    title: "Holiday Coding Challenge",
    description: "Celebrating the holidays with a festive coding competition",
    src: "/images/gallery/holiday-challenge.jpg",
    date: "December 15, 2023",
    event: "Competition"
  },
  {
    id: "6",
    title: "Web Development Session",
    description: "Learning HTML, CSS and JavaScript basics",
    src: "/images/gallery/web-dev.jpg",
    date: "January 20, 2024",
    event: "Workshop"
  },
  {
    id: "7",
    title: "Raspberry Pi Project Day",
    description: "Hands-on projects with Raspberry Pi hardware",
    src: "/images/gallery/raspberry-pi.jpg",
    date: "February 8, 2024",
    event: "Project Day"
  },
  {
    id: "8",
    title: "AI Workshop",
    description: "Introduction to machine learning concepts",
    src: "/images/gallery/ai-workshop.jpg",
    date: "February 28, 2024",
    event: "Workshop"
  },
  {
    id: "9",
    title: "Competitive Programming Session",
    description: "Practice session for upcoming coding competitions",
    src: "/images/gallery/competitive-programming.jpg",
    date: "March 15, 2024",
    event: "Practice Session"
  },
  {
    id: "10",
    title: "Spring Hackathon",
    description: "24-hour coding marathon building innovative projects",
    src: "/images/gallery/spring-hackathon.jpg",
    date: "April 5, 2024",
    event: "Hackathon"
  },
  {
    id: "11",
    title: "Guest Speaker: Industry Professional",
    description: "Talk from a professional software engineer about career paths",
    src: "/images/gallery/guest-speaker.jpg",
    date: "April 20, 2024",
    event: "Guest Speaker"
  },
  {
    id: "12",
    title: "End of Year Celebration",
    description: "Celebrating our achievements and showcasing projects",
    src: "/images/gallery/year-end.jpg",
    date: "May 30, 2024",
    event: "Celebration"
  }
]; 