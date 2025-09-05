import { TCategory } from "../Categories/typed";
import { TCity } from "../Cities/typed";
import { TKitchen } from "../Kitchen/typed";
import { TTier } from "../Tiers/typed";

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
