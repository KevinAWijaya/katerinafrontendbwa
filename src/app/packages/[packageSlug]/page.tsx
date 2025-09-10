import { getPackageDetails } from "@/components/Packages/actions";
import { TPackageDetails } from "@/components/Packages/typed";
import Slider from "@/components/Slider";
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
    title: `${cateringPackages.data.name}`,
    description: cateringPackages.data.about,
  };
}

async function PackageDetailsPage({ params }: Request) {
  const { packageSlug } = await params;
  const cateringPackages: { data: TPackageDetails } = await getPackageDetails(packageSlug);

  return (
    <>
      <ComposeHeader />
      <section className="relative">
        <Slider spaceBetween={20} swiperClassName="!h-[550px]" swiperSlideClassName="!w-full" hasPagination>
          {cateringPackages.data.photos.map((item) => {
            return (
              <figure className="w-full h-full absolute" key={item.id}>
                <Image
                  fill
                  className="w-full h-full object-cover object-center"
                  src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.photo}`}
                  alt={item.photo}
                  sizes="(max-width: 768px) 100vw"
                />
              </figure>
            );
          })}
        </Slider>
      </section>
    </>
  );
}

export default PackageDetailsPage;
