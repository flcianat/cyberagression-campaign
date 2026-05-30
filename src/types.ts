/**
 * Type declarations for Cyberaggression & Digital Wellness Scrapbook Campaign
 */

export interface EduCard {
  id: string;
  category: "cyberaggression" | "disinhibition" | "statistics" | "impact";
  title: string;
  rawText: string;
  notes: string[];
  stickers: string[];
  comments?: string[];
  citation?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  points: number; // point mapping for cyber-aggression checklist
  category: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  readTime: string;
  date: string;
  polaroidUrl?: string;
  polaroidCaption?: string;
  stickers: string[];
}

export interface WellnessTip {
  id: string;
  title: string;
  details: string;
  handwrittenNote: string;
  pinType: "tape" | "clip" | "pin" | "tape-blue";
  colorClass: string;
}

export interface SocialChallenge {
  id: string;
  title: string;
  description: string;
  hashtag: string;
  stickerStyle: string;
  completedCount: number;
}
