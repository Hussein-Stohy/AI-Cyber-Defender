/**
 * Generic API response wrapper matching the backend Response::success() format.
 * { data: T, meta?: M }
 */
export interface ApiResponse<T, M = any> {
  data: T;
  meta?: M;
}

/**
 * Error response from the API.
 * { error: string }
 */
export interface ApiError {
  error: string;
}

/**
 * Pagination metadata returned by paginated endpoints.
 */
export interface PaginationMeta {
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

/**
 * Login response data shape.
 */
export interface LoginResponseData {
  token: string;
  user: {
    id: number;
    name: string;
    username: string;
  };
}

/**
 * Dashboard stats from GET /api/dashboard/stats
 */
export interface DashboardStatsData {
  totalAttacks: number;
  highSeverity: number;
  activeThreats: number;
  resolved: number;
}

/**
 * Dashboard charts from GET /api/dashboard/charts
 */
export interface DashboardChartsData {
  attacksOverTime: { date: string; count: number }[];
  severityDistribution: { severity: string; count: number }[];
}

/**
 * Statistics from GET /api/statistics
 */
export interface StatisticsData {
  topIps: { ip: string; count: number }[];
  attackTypes: { type: string; count: number }[];
  dailyTrends: { date: string; count: number }[];
}
