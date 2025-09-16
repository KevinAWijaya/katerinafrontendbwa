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

export type TBookingDetails = {
  message: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  post_code: string;
  city: string;
  address: string;
  notes: string;
  started_at: string;
  ended_at: string;
  booking_trx_id: string;
  price: number;
  total_tax_amount: number;
  total_amount: number;
  delivery_time: string;
  quantity: number;
  duration: number;
  isPaid: number;
  proof: string;
  cateringPackage: TPackage;
  tier: TTier;
};
