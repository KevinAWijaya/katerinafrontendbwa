import Star from "@/assets/image/star.svg";
import Slider from "@/components/Slider";
import Image from "next/image";
import { getAllTestimonials } from "./actions";
import { TTestimonials } from "./typed";

type Props = {};

export function ContentTestimonial({ data }: { data: TTestimonials }) {
  return (
    <div className="h-full rounded-3xl overflow-hidden relative border p-3 flex flex-col gap-y-3">
      <span className="text-color1 flex gap-x-1">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </span>

      <p className="italic text-sm font-semibold leading-6">“{data.message}”</p>

      <div className="flex gap-x-3 items-center">
        <figure className="w-9 flex-none aspect-square relative rounded-full overflow-hidden">
          <Image
            fill
            className="w-full h-full object-cover object-center"
            src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.photo}`}
            alt={data.name}
            sizes="(max-width: 768px) 100vw"
          />
        </figure>
        <span className="font-semibold">{data.name}</span>
      </div>
    </div>
  );
}

export function WrapperTestiomials({ data }: { data: TTestimonials[] }) {
  return (
    <Slider spaceBetween={20} swiperClassName="!h-[156px] !px-4" swiperSlideClassName="!w-[280px]">
      {data.map((item) => {
        return <ContentTestimonial key={item.id} data={item} />;
      })}
    </Slider>
  );
}

async function Testimonials({}: Props) {
  const { data }: { data: TTestimonials[] } = await getAllTestimonials();

  if (data.length === 0) return "Tidak ada data";

  return <WrapperTestiomials data={data} />;
}

export default Testimonials;
