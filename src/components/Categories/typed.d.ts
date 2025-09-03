export interface Root {
  data: Daum[];
}

export interface TCategory {
  id: number;
  name: string;
  slug: string;
  photo: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  catering_packages: CateringPackage[];
}

export interface CateringPackage {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  about: string;
  is_popular: string;
  category_id: number;
  city_id: number;
  kitchen_id: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}
