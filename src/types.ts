export interface Project {
  id: string;
  title: string;
  category: 'Web Development' | 'IoT / Embedded Systems' | 'Python & Hardware';
  subtitle: string;
  description: string;
  bullets: string[];
  technologies: string[];
  featured: boolean;
  color: string;
  glowColor: string;
  githubUrl?: string;
  liveUrl?: string;
  liveDemoType?: 'crm' | 'weather' | 'agri-rover' | 'bluetooth-alert' | 'obstacle-rover';
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: string;
    percentage: number;
    badge: string;
    color: string;
    description: string;
  }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  expectedGraduation: string;
  cgpa: string;
  details: string[];
  coursework: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  level?: string;
  tag: string;
  category: string;
  description: string;
  skillsGained: string[];
}

export interface HackathonExperience {
  title: string;
  initiative: string;
  duration: string;
  location: string;
  description: string;
  keyContributions: string[];
  techFocus: string[];
}
