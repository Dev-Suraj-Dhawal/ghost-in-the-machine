export interface DepartedPioneer {
  id: string;
  name: string;
  lifespan: string;
  role: string;
  bio: string;
  legacy: string;
  quote: string;
  avatarUrl: string;
  favoriteArtifact: string;
  candleLit: boolean;
}

export interface RemembranceTribute {
  id: string;
  name: string;
  relationship: string;
  years?: string;
  favoriteMeal: string;
  favoriteSong: string;
  cherishedMemory: string;
  photoUrl?: string;
  candleCount: number;
  calaverita?: string;
  eulogy?: string;
  createdAt: string;
}

export interface LitCandle {
  id: string;
  senderName: string;
  message: string;
  altarTarget: string;
  timestamp: string;
  flameIntensity: number;
}

export interface SensorLogEntry {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  eventType: "motion" | "thermal" | "audio" | "network" | "electromagnetic";
  reading: string;
  anomalyScore: number;
}

export interface TerminalHistoryItem {
  id: string;
  command: string;
  output: string;
  type: "user" | "system" | "spectral" | "error" | "warning";
  timestamp: string;
}

export interface AIInferenceConfig {
  mode: "local-neural" | "ollama" | "open-api";
  ollamaModel: string;
  ollamaEndpoint: string;
  openApiKey?: string;
  temperature: number;
}
