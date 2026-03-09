import { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'TrackBuddy',
    tagline: 'Fleet Tracking & Management Platform',
    logo: '/images/Trackbuddy.png',
    description:
      'TrackBuddy is a fleet tracking and management platform designed to monitor vehicle locations, routes, and operational data in real time. It integrates GPS tracker data with a scalable backend to process and store location updates efficiently, providing route monitoring, fleet status management, and optimized data handling.',
    tech: [
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Postman',
      'GitHub',
      'WebSocket',
      'VS Code',
    ],
    visit:
      'https://play.google.com/store/apps/details?id=com.trackbuddy.sece&referrer=utm_source%3Dapkpure.com',
  },
  {
    title: 'HostelOps',
    tagline: 'Complaint Management Platform',
    logo: '/images/HostelOps.png',
    description:
      'HostelOps is a full-stack complaint management platform built to simplify hostel maintenance workflows. Students can submit complaints across categories like electrical, carpentry, cleaning, mess, and amenities, while administrators track status and manage tasks through a role-based dashboard.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Postman', 'GitHub', 'VS Code'],
    visit: 'https://hostelproject-frontend.vercel.app/login',
  },
  {
    title: 'AutoTrust',
    tagline: 'Vehicle Authenticity Verification',
    logo: '/images/Autotrust.png',
    description:
      'AutoTrust is a web-based vehicle authenticity verification platform designed to detect potential fraud in used car transactions. It analyzes vehicle age, mileage, ownership records, and service history, cross-checking data to identify inconsistencies and improve trust in the used vehicle marketplace.',
    tech: [
      'React',
      'Node.js',
      'MongoDB',
      'Express',
      'Python',
      'REST API',
      'Postman',
      'GitHub',
      'VS Code',
    ],
    visit: 'https://github.com/harishkarthick2408/AutoTrust',
  },
];
