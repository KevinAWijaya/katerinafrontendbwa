import Notes from "@/assets/image/notes.svg";
import Peoples from "@/assets/image/peoples.svg";
import PinPoint from "@/assets/image/pinpoint.svg";
import Slider from "@/components/Slider";
import Image from "next/image";
import Link from "next/link";
import { getPackages } from "./actions";
import { TPackage, TShow } from "./typed";

type Props = {
  show: TShow;
};

export function ContentPopular({ data }: { data: TPackage[] }) {
  if (data.length === 0) return "Tidak ada data";

  return (
    <Slider spaceBetween={20} swiperClassName="!h-[180px] !px-4" swiperSlideClassName="!max-w-xs">
      {data.map((item) => {
        const lowestTier =
          item.tiers.length > 0
            ? item.tiers.reduce((min, current) => (current.price < min.price ? current : min))
            : null;
        return (
          <div key={item.id} className="h-full rounded-3xl overflow-hidden relative border">
            <figure className="w-full h-full absolute">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.thumbnail}`}
                alt={item.name}
                sizes="(max-width: 768px) 100vw"
              />
            </figure>

            <div className="absolute left-2 bottom-2 right-2 flex flex-col bg-white rounded-2xl p-3">
              <span className="font-semibold">{item.name}</span>
              <span className="flex gap-x-3">
                <span className="flex gap-x-1">
                  <span className="text-color2">
                    <Notes />
                  </span>
                  <span className="text-gray2">{item.category.name}</span>
                </span>

                <span className="flex gap-x-1">
                  <span className="text-color2">
                    <Peoples />
                  </span>
                  <span className="text-gray2">{lowestTier?.quantity || 0}</span>
                </span>
              </span>
            </div>
            <Link href={`/packages/${item.slug}`} className="absolute inset-0"></Link>
          </div>
        );
      })}
    </Slider>
  );
}

export function ContentNewest({
  data,
  withTierDetailQuantity,
}: {
  data: TPackage[];
  withTierDetailQuantity?: boolean;
}) {
  if (data.length === 0) return "Tidak ada data";
  return (
    <div className="flex flex-col gap-y-4 px-4">
      {data.map((item) => {
        const lowestTier =
          item.tiers.length > 0
            ? item.tiers.reduce((min, current) => (current.price < min.price ? current : min))
            : null;

        const highestTier =
          item.tiers.length > 0
            ? item.tiers.reduce((max, current) => (current.price > max.price ? current : max))
            : null;
        return (
          <div key={item.id} className="flex gap-x-3 relative">
            <figure className="w-[120px] h-[160px] flex-none rounded-2xl overflow-hidden relative">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.thumbnail}`}
                alt={item.name}
                sizes="(max-width: 768px) 100vw"
              />
            </figure>
            <span className="flex flex-col gap-y-3 pt-4">
              <span className="font-semibold">{item.name}</span>
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <Notes />
                </span>
                <span className="text-gray2">{item.category.name}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <Peoples />
                </span>
                <span className="text-gray2">
                  {lowestTier?.quantity || 0}
                  {!!withTierDetailQuantity && ` - ${highestTier?.quantity || 0} orang`}
                </span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <PinPoint />
                </span>
                <span className="text-gray2">{item.city.name}</span>
              </span>
            </span>

            <Link href={`/packages/${item.slug}`} className="absolute inset-0"></Link>
          </div>
        );
      })}
    </div>
  );
}

async function Packages({ show }: Props) {
  const { data }: { data: TPackage[] } = await getPackages();

  if (show === "popular") {
    return <ContentPopular data={data.filter((item) => item.is_popular === "1")} />;
  }

  if (show === "newest") {
    return <ContentNewest data={data} />;
  }

  return null;
}

export default Packages;
