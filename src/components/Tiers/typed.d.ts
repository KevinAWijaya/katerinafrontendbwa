export interface TTier {
  id: number;
  name: string;
  tagline: string;
  price: number;
  quantity: number;
  duration: number;
  photo: string;
  benefits: Benefit[];
}

export interface Benefit {
  id: number;
  name: string;
  catering_tier_id: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}
