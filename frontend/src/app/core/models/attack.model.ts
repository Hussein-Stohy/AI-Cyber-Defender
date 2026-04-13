export type Severity = 'low' | 'medium' | 'high';
export type AttackStatus = 'active' | 'resolved' | 'mitigated';

export interface Attack {
  id: string;
  type: string;
  severity: Severity;
  ip: string;
  timestamp: string;
  status: AttackStatus;
  confidence?: number;
  explanation?: string;
  logs?: string[];
  timeline?: {
    timestamp: string;
    description: string;
  }[];
}

export interface AttackFilters {
  search: string;
  severity: string;
  status: string;
}
