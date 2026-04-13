import { Severity } from './attack.model';

export interface LiveEvent {
  id: string;
  type: string;
  severity: Severity;
  ip: string;
  timestamp: Date;
  message: string;
}

export interface LiveStats {
  eventsPerMinute: number;
  activeThreats: number;
  totalToday: number;
}
