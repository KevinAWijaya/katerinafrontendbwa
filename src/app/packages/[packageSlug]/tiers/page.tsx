import Notes from "@/assets/image/notes.svg";
import Peoples from "@/assets/image/peoples.svg";
import { getPackageDetails } from "@/components/Packages/actions";
import { TPackageDetails } from "@/components/Packages/typed";
import { ContentTier } from "@/components/Tiers";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import ComposeHeader from "./ComposeHeader";

type Request = {
  params: {
    packageSlug: string;
  };
};

export async function generateMetadata({ params }: Request, parent: ResolvingMetadata): Promise<Metadata> {
  const { packageSlug } = await params;
  const cateringPackages: { data: TPackageDetails } = await getPackageDetails(packageSlug);

  return {
    title: `Select Tier | ${cateringPackages.data.name}`,
    description: cateringPackages.data.about,
  };
}

async function PackageTierPage({ params }: Request) {
  const { packageSlug } = await params;
  const cateringPackages: { data: TPackageDetails } = await getPackageDetails(packageSlug);

  const lowestTier =
    cateringPackages.data.tiers.length > 0
      ? cateringPackages.data.tiers.reduce((min, current) => (current.price < min.price ? current : min))
      : null;

  const highestTier =
    cateringPackages.data.tiers.length > 0
      ? cateringPackages.data.tiers.reduce((max, current) => (current.price > max.price ? current : max))
      : null;
  return (
    <>
      <ComposeHeader />
      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl items-center">
          <figure className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden">
            <Image
              fill
              className="w-full h-full object-cover object-center"
              src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${cateringPackages.data.thumbnail}`}
              alt={cateringPackages.data.name}
              sizes="(max-width: 768px) 100vw"
            />
          </figure>
          <span className="flex flex-col gap-y-3">
            <span className="font-semibold">{cateringPackages.data.name}</span>
            <span className="flex gap-x-1">
              <span className="text-color2">
                <Notes />
              </span>
              <span className="text-gray2">{cateringPackages.data.category.name}</span>
            </span>

            <span className="flex gap-x-1">
              <span className="text-color2">
                <Peoples />
              </span>
              <span className="text-gray2">
                {lowestTier?.quantity || 0} - {highestTier?.quantity || 0} orang
              </span>
            </span>
          </span>
        </div>
      </section>

      <section className="relative z-10 pb-10">
        <h2 className="font-semibold px-4 mb-3">Choose Your Package</h2>
        <div className="flex flex-col gap-y-4 px-4">
          {cateringPackages.data.tiers.map((tier) => {
            return <ContentTier data={tier} packageSlug={packageSlug} key={tier.id} />;
          })}
        </div>{" "}
      </section>
    </>
  );
}

export default PackageTierPage;
