import Notes from "@/assets/image/notes.svg";
import Peoples from "@/assets/image/peoples.svg";
import OpenModalWrapper from "@/components/Modal/OpenModalWrapper";
import { getPackageDetails } from "@/components/Packages/actions";
import { TPackageDetails } from "@/components/Packages/typed";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import ComposeHeader from "./ComposeHeader";
import Form from "./Form";

type Request = {
  params: {
    packageSlug: string;
  };
  searchParams: {
    tier: string;
  };
};

export async function generateMetadata({}: Request, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: `Shipping`,
  };
}

async function PackageTierPage({ params, searchParams }: Request) {
  const { packageSlug } = await params;
  const { tier } = await searchParams;
  const cateringPackages: { data: TPackageDetails } = await getPackageDetails(packageSlug);

  const currentTier = cateringPackages.data.tiers.find((catTier) => String(catTier.id) === tier);

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
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex gap-x-3 items-center">
            <figure className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${cateringPackages.data.thumbnail}`}
                alt={cateringPackages.data.name}
                sizes="(max-width: 768px) 100vw"
              />
              ;
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

          {!!currentTier && (
            <div className="">
              <h2 className="font-semibold mb-3">Tier Package</h2>
              <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-1 border-dashed">
                <span className="flex gap-x-2 items-center">
                  <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
                    <Image
                      fill
                      className="w-full h-full object-cover object-center"
                      src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${currentTier?.photo}`}
                      alt={currentTier?.name ?? ""}
                      sizes="(max-width: 768px) 100vw"
                    />
                  </figure>
                  <h3 className="font-semibold text-lg">{currentTier?.name}</h3>
                  <OpenModalWrapper
                    modal="tier"
                    modalPosition="center"
                    queries={{ packageSlug, tierId: tier }}
                    className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full"
                  >
                    Details
                  </OpenModalWrapper>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <Form data={cateringPackages.data} tierId={tier} />
    </>
  );
}

export default PackageTierPage;
