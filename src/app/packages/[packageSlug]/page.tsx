import BadgeCheckmark from "@/assets/image/badge-checkmark.svg";
import Notes from "@/assets/image/notes.svg";
import Peoples from "@/assets/image/peoples.svg";
import PinPoint from "@/assets/image/pinpoint.svg";
import StarClashy from "@/assets/image/star-clashy.svg";
import Truck from "@/assets/image/truck.svg";
import { ContentBonus } from "@/components/Bonuses";
import { getPackageDetails } from "@/components/Packages/actions";
import { TPackageDetails } from "@/components/Packages/typed";
import Slider from "@/components/Slider";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ComposeHeader from "./ComposeHeader";

import "@/libs/thousands"; // path sesuaikan

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

  const currentTier =
    cateringPackages.data.tiers.length > 0
      ? cateringPackages.data.tiers.reduce((min, current) => (current.price < min.price ? current : min))
      : null;

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
        <div className="flex left-0 right-0 gap-x-4 mx-4 bg-white shadow-[0px_12px_30px_0px_#07041517] p-4 -translate-y-1/2 rounded-3xl justify-between absolute top-full z-20">
          <span className="flex flex-col gap-y-3">
            <h1 className="text-xl font-bold">{cateringPackages.data.name}</h1>
            <span className="flex gap-x-3">
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
                <span className="text-gray2">{currentTier?.quantity || 0}</span>
              </span>
            </span>
          </span>
          <span className="bg-color1 flex flex-col items-center justify-center px-2 gap-y-2 rounded-2xl text-white">
            <StarClashy />

            <span className="">4.5/5</span>
          </span>
        </div>
      </section>

      <section className="relative z-10 mt-16">
        <h2 className="font-semibold px-4 mb-3">About Package</h2>
        <p className="px-4">{cateringPackages.data.about}</p>
      </section>

      <section className="relative z-10">
        <h2 className="font-semibold px-4 mb-3">All Bonuses For You</h2>

        <Slider spaceBetween={20} swiperClassName="!h-[153px] px-4" swiperSlideClassName="!w-[190px]">
          {cateringPackages.data.bonuses.map((bonus) => {
            return <ContentBonus data={bonus} key={bonus.id} />;
          })}
        </Slider>
      </section>

      <section className="relative z-10">
        <h2 className="font-semibold px-4 mb-3">Catering Details</h2>
        <div className="grid grid-cols-2 gap-3 px-4">
          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <PinPoint />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">City</span>
              <span className="font-semibold">{cateringPackages.data.city.name}</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <Peoples />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Portion</span>
              <span className="font-semibold">{currentTier?.quantity || 0} People</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <Notes />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Category</span>
              <span className="font-semibold">{cateringPackages.data.category.name}</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <Truck />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Delivery</span>
              <span className="font-semibold">Free 100%</span>
            </span>
          </span>
        </div>
      </section>

      {/* <section className="relative">
        <h2 className="font-semibold mb-3 px-4">Testimonials</h2>

        <Slider spaceBetween={20} swiperClassName="!h-[156px] px-4" swiperSlideClassName="!w-[280px]">
          {cateringPackages.data.testimonials.map((testimonial) => {
            return <ContentTestimonial data={testimonial} key={testimonial.id} />;
          })}
        </Slider>
      </section> */}

      <section className="relative">
        <h2 className="font-semibold mb-3 px-4">Kitchen</h2>
        <span className="flex justify-between items-center gap-x-3 px-4">
          <figure className="w-14 aspect-square rounded-full overflow-hidden relative">
            <Image
              fill
              className="w-full h-full object-cover object-center"
              src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${cateringPackages.data.kitchen.photo}`}
              alt={cateringPackages.data.kitchen.name}
              sizes="(max-width: 768px) 100vw"
            />
          </figure>
          <span className="flex flex-col">
            <span className="flex gap-x-2">
              <h3 className="font-semibold">{cateringPackages.data.kitchen.name}</h3>
              <span className="text-color3">
                <BadgeCheckmark />
              </span>
            </span>
            <span className="text-sm text-gray2"> Sejak tahun {cateringPackages.data.kitchen.year} </span>
          </span>
          <span className="mx-auto"></span>

          <Link href={``} className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
            Profile
          </Link>
        </span>
      </section>

      <div className="sticky bottom-4 px-4 z-50 mt-8">
        <div className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6">
          <span className="flex flex-col">
            <span className="font-semibold text-xl">Rp {(currentTier?.price || 0).thousands()}</span>
            <span className="text-gray2 text-sm">
              {currentTier?.duration || 0} days, {currentTier?.quantity || 0} people
            </span>
          </span>

          {!!currentTier ? (
            <Link
              href={`/package/${packageSlug}/tiers`}
              className="bg-color1 rounded-full flex items-center justify-center text-white px-5"
            >
              Booking Now
            </Link>
          ) : (
            <Link
              href={`/package/${packageSlug}/tiers`}
              className="bg-gray1 rounded-full flex items-center justify-center text-gray-200 cursor-not-allowed px-5"
            >
              Booking Now
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default PackageDetailsPage;
