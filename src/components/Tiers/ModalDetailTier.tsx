import { ContentTier } from ".";
import { getPackageDetails } from "../Packages/actions";
import { TPackageDetails } from "../Packages/typed";

type Props = {
  packageSlug: string;
  tierId: string;
};

async function ModalDetailTier({ packageSlug, tierId }: Props) {
  const cateringPackages: { data: TPackageDetails } = await getPackageDetails(packageSlug);

  const currentTier = cateringPackages.data.tiers.find((catTier) => String(catTier.id) === tierId);

  if (!currentTier) return "Tier not Found";
  return <ContentTier data={currentTier} packageSlug={packageSlug} />;
}

export default ModalDetailTier;
