export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export enum MessageRole {
  User = 'user',
  Model = 'model',
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  groundingMetadata?: GroundingMetadata;
  isError?: boolean;
}

export interface University {
  name: string;
  location: string;
  acceptanceRate?: string;
  tuition?: string;
  enrollment?: string;
  description: string;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
}
