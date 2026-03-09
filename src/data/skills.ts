import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiVercel,
  SiNginx,
  SiGooglecloud,
} from 'react-icons/si';
import { TbBrandAws, TbBrandAzure } from 'react-icons/tb';
import { Skill } from '../types/skill';

export const skills: Skill[] = [
  // Technical Skills
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'technical' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'technical' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'technical' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'technical' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6', category: 'technical' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'technical' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'technical' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'technical' },
  { name: 'Express', icon: SiExpress, color: '#ffffff', category: 'technical' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'technical' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'technical' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'technical' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D', category: 'technical' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'technical' },

  // Tech Tools
  { name: 'Git', icon: SiGit, color: '#F05032', category: 'tools' },
  { name: 'GitHub', icon: SiGithub, color: '#e2e8f0', category: 'tools' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'tools' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'tools' },
  { name: 'Vercel', icon: SiVercel, color: '#e2e8f0', category: 'tools' },
  { name: 'AWS', icon: TbBrandAws, color: '#FF9900', category: 'tools' },
  { name: 'Azure', icon: TbBrandAzure, color: '#0078D4', category: 'tools' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', category: 'tools' },
  { name: 'Nginx', icon: SiNginx, color: '#009639', category: 'tools' },

  // Soft Skills
  { name: 'Problem Solving', category: 'soft' },
  { name: 'Team Collaboration', category: 'soft' },
  { name: 'Communication', category: 'soft' },
  { name: 'Adaptability', category: 'soft' },
  { name: 'Critical Thinking', category: 'soft' },
  { name: 'Time Management', category: 'soft' },
  { name: 'Leadership', category: 'soft' },
  { name: 'Continuous Learning', category: 'soft' },
];
