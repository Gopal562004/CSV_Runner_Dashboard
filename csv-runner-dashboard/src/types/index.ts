export interface RunData {
  date: string;
  person: string;
  miles: number;
}

export interface Metrics {
  average: number;
  min: number;
  max: number;
  total: number;
  count: number;
}

export interface ParsedData {
  data: RunData[];
  overallMetrics: Metrics;
  personMetrics: Record<string, Metrics>;
  errors: string[];
}

export interface CSVValidationResult {
  isValid: boolean;
  errors: string[];
  data?: RunData[];
}
