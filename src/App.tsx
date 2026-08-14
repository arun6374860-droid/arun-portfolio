import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { HackathonSection } from './components/HackathonSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Apply theme class to HTML root
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen relative selection:bg-cyan-500 selection:text-black ${
      theme === 'dark' ? 'bg-[#080b14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Interactive Cyber Particle Background */}
      <ParticleBackground theme={theme} />

      {/* Desktop Custom Glowing Cursor Spotlight */}
      <CustomCursor />

      {/* Initial Futuristic Terminal Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Site Content */}
      <div className="relative z-10">
        {/* Floating Glassmorphic Navbar */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          openResumeModal={() => setIsResumeOpen(true)}
        />

        {/* Hero Section */}
        <HeroSection openResumeModal={() => setIsResumeOpen(true)} />

        {/* About Section */}
        <AboutSection />

        {/* Education & Academics Section */}
        <EducationSection />

        {/* Technical Skills Matrix */}
        <SkillsSection />

        {/* Projects Section with Interactive Sandboxes */}
        <ProjectsSection />

        {/* Hackathon Spotlight */}
        <HackathonSection />

        {/* Certifications & Symposiums */}
        <CertificationsSection />

        {/* Key Achievements */}
        <AchievementsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer with Madurai Local Clock */}
        <Footer openResumeModal={() => setIsResumeOpen(true)} />
      </div>

      {/* Full Resume Inspection & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
