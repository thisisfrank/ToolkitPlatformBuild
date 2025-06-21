import { User, Product, VideoContent, Update, Template } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@company.com',
  joinDate: '2024-01-15',
  tier: 'pro'
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ultimate Recruiter\'s Playbook',
    description: 'Complete guide to modern recruitment strategies and techniques',
    version: 'v2.3',
    isNew: true,
    lastUpdated: '2024-12-10',
    lastDownloaded: '2024-12-08',
    downloadCount: 3,
    fileSize: '15.2 MB',
    category: 'guide',
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Candidate Sourcing Mastery',
    description: 'Advanced sourcing techniques and tools for finding top talent',
    version: 'v1.8',
    isNew: false,
    lastUpdated: '2024-11-28',
    lastDownloaded: '2024-11-30',
    downloadCount: 7,
    fileSize: '22.1 MB',
    category: 'course',
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Interview Framework Templates',
    description: 'Structured interview guides and evaluation templates',
    version: 'v2.1',
    isNew: true,
    lastUpdated: '2024-12-05',
    downloadCount: 1,
    fileSize: '8.7 MB',
    category: 'template',
    downloadUrl: '#'
  },
  {
    id: '4',
    name: 'Salary Negotiation Toolkit',
    description: 'Scripts, calculators, and strategies for salary negotiations',
    version: 'v1.5',
    isNew: false,
    lastUpdated: '2024-10-15',
    lastDownloaded: '2024-11-20',
    downloadCount: 5,
    fileSize: '12.3 MB',
    category: 'tool',
    downloadUrl: '#'
  }
];

export const mockVideos: VideoContent[] = [
  {
    id: '1',
    title: 'Mastering Boolean Search Techniques',
    description: 'Learn advanced Boolean search operators for finding hidden candidates',
    duration: '18:32',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: '#',
    category: 'Sourcing',
    isWatched: true
  },
  {
    id: '2',
    title: 'Building Your Recruitment Brand',
    description: 'How to position yourself as a top-tier recruiter',
    duration: '24:15',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: '#',
    category: 'Branding',
    isWatched: false
  },
  {
    id: '3',
    title: 'LinkedIn Outreach That Converts',
    description: 'Proven message templates and engagement strategies',
    duration: '31:47',
    thumbnail: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: '#',
    category: 'Outreach',
    isWatched: false
  }
];

export const mockUpdates: Update[] = [
  {
    id: '1',
    title: 'New AI Sourcing Module Added',
    description: 'We\'ve added a comprehensive guide on using AI tools for candidate sourcing, including ChatGPT prompts and automation workflows.',
    date: '2024-12-10',
    type: 'content',
    isNew: true
  },
  {
    id: '2',
    title: 'Bonus: 50 Email Templates',
    description: 'Exclusive collection of proven email templates for candidate outreach, follow-ups, and client communication.',
    date: '2024-12-05',
    type: 'bonus',
    isNew: true
  },
  {
    id: '3',
    title: 'Interview Scoring System Update',
    description: 'Enhanced our interview evaluation framework with new behavioral assessment criteria.',
    date: '2024-11-28',
    type: 'feature',
    isNew: false
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Candidate Pipeline Tracker',
    description: 'Complete Notion template for managing your recruitment pipeline',
    type: 'notion',
    url: 'https://notion.so/template/candidate-pipeline',
    lastUsed: '2024-12-08'
  },
  {
    id: '2',
    name: 'Clay Contact Database',
    description: 'Pre-built Clay table for organizing candidate and client contacts',
    type: 'clay',
    url: 'https://clay.com/template/contacts',
    lastUsed: '2024-12-06'
  },
  {
    id: '3',
    name: 'Salary Calculator Tool',
    description: 'Interactive calculator for determining competitive salary ranges',
    type: 'calculator',
    url: '#calculator'
  },
  {
    id: '4',
    name: 'Client Intake Form',
    description: 'Comprehensive spreadsheet for collecting client requirements',
    type: 'spreadsheet',
    url: '#spreadsheet',
    lastUsed: '2024-11-25'
  }
];