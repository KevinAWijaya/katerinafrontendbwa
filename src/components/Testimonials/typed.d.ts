import { TPackage } from "../Packages/typed";

export interface TTestimonials {
  id: number;
  name: string;
  photo: string;
  message: string;
  cateringPackage: TPackage;
}
