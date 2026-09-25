export type DohRecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT";

export type DohResolverId = "cloudflare" | "google" | "quad9" | "custom";

export interface DohResolverConfig {
  id: DohResolverId;
  name: string;
  url: string;
  corsEnabled: boolean;
  provider: string;
}

export interface DohAnswerRecord {
  name: string;
  type: number | string;
  TTL: number;
  data: string;
}

export type DohStatus = "secure" | "poisoned" | "blocked" | "timeout";

export interface DohQueryResult {
  resolverId: DohResolverId;
  resolverName: string;
  url: string;
  domain: string;
  recordType: DohRecordType;
  latencyMs: number;
  statusCode?: number;
  status: DohStatus;
  answers: DohAnswerRecord[];
  rawJson?: unknown;
  errorMessage?: string;
  timestamp: string;
}
