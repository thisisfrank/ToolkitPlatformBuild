export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  tier: 'starter' | 'pro' | 'enterprise';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  version: string;
  isNew: boolean;
  lastUpdated: string;
  lastDownloaded?: string;
  downloadCount: number;
  fileSize: string;
  category: 'guide' | 'template' | 'course' | 'tool';
  downloadUrl: string;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  isWatched: boolean;
}

export interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'feature' | 'content' | 'bonus';
  isNew: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'notion' | 'clay' | 'calculator' | 'spreadsheet';
  url: string;
  lastUsed?: string;
}