import { TPackage } from "@/components/Packages/typed";

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
  catering_packages_count: number;
  catering_packages: TPackage[];
}
