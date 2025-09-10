import { TCategory } from "@/components/Categories/typed";
import { TCity } from "@/components/Cities/typed";
import { TKitchen } from "@/components/Kitchen/typed";
import { TPackage } from "@/components/Packages/typed";
import { TTier } from "@/components/Tiers/typed";
import { TBonus } from "../Bonuses/typed";
import { TTestimonials } from "../Testimonials/typed";

export type TShow = "popular" | "newest";

export interface Root {
  data: TPackage[];
}

export type TPackage = {
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
};

export type TPackageDetails = {
  photos: Photo[];
  bonuses: TBonus[];
  testimonials: TTestimonials[];
} & TPackage;

export type Photo = {
  id: number;
  photo: string;
  catering_package_id: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
};
