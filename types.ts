export interface DecoderResponse {
  insight: string;
  practicalTask: string;
  followUpPrompt: string;
  philosophicalLens: string;
  isCrisis: boolean;
}

export enum AppState {
  LANDING = 'LANDING',
  DISCLAIMER = 'DISCLAIMER',
  DECODER = 'DECODER',
  PAYWALL = 'PAYWALL'
}

export interface UserInfo {
  name: string;
  email: string;
  isPremium?: boolean;
}

export interface FearEntry {
  fear: string;
  response: DecoderResponse | null;
  timestamp: number;
}