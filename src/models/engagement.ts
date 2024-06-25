export interface Engagement {
  _id: number;
  data: DataEngagement;
  totalItems: number;
}

export interface DataEngagement {
  image_url: string;
  username: string;
  course: string;
  timestamp: string;
  expression: string;
  confidence: number;
  ftp_path: string;
  updated_at: string;
}

export interface EngagementImage {
  _id: number;
  image_url: string;
  expression: string;
  cf_score: number;
}

export interface EngagementModel {
  _id: string;
  username: string;
  details: Details;
  engagement_index: number;
  state: string;
  expressions: Expression[];
}

export interface Details {
  firstname: string;
  lastname: string;
  email: string;
  course: number;
  courseName: string;
  quiz_id: number;
  quiz_name: string;
}

export interface Expression {
  expression: string;
  count: number;
  average_confidence: number;
  image_urls: string[];
}
