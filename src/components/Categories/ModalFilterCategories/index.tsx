import { getAllCities } from "@/components/Cities/actions";
import { TCity } from "@/components/Cities/typed";
import { getAllCategories } from "../actions";
import { TCategory } from "../typed";
import FormFilterCategories from "./Form";

type Props = { categorySlug: string };

async function ModalFilterCategories({ categorySlug }: Props) {
  const { data: categories }: { data: TCategory[] } = await getAllCategories();
  const { data: cities }: { data: TCity[] } = await getAllCities();

  return <FormFilterCategories categories={categories} cities={cities} categorySlug={categorySlug} />;
}

export default ModalFilterCategories;
