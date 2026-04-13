export interface StatCard {
  title: string;
  value: string;
  icon: string;
  trend: number; // percentage, positive or negative
  trendLabel: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface DashboardData {
  summary: StatCard[];
  trends: ChartDataPoint[];
  distributions: ChartDataPoint[];
  activities: ActivityItem[];
}
