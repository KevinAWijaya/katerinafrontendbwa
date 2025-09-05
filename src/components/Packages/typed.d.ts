import { TCategory } from "@/components/Categories/typed";
import { TCity } from "@/components/Cities/typed";
import { TKitchen } from "@/components/Kitchen/typed";
import { TTier } from "@/components/Tiers/typed";

export type TShow = "popular" | "newest";

export interface Root {
  data: TPackage[];
}

export interface TPackage {
  id: number;
  name: string;
  slug: string;
  is_popular: string;
  thumbnail: string;
  about: string;
  city: TCity;
  category: TCategory;
  kitchen: TKitchen;
  tiers: TTier[];
}
