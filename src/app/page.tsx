import FlagId from "@/assets/image/flag-id.svg";
import LogoKaterina from "@/assets/image/logo-katerina.svg";
import BottomBar from "@/components/BottomBar";
import Categories from "@/components/Categories";
import Packages from "@/components/Packages";
import Slider from "@/components/Slider";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between px-4 pt-16">
        <span className="flex gap-x-2 items-center">
          <span className="!text-color1">
            <LogoKaterina />
          </span>
          <span className="font-bold text-2xl">Katerina</span>
        </span>
        <span className="relative">
          <button className="flex gap-x-2 border border-gray1 rounded-full py-1 px-2">
            <FlagId />
            <span className="">IDN</span>
          </button>
        </span>
      </header>

      <section className="relative">
        <Slider spaceBetween={20} swiperClassName="!h-[180px] !px-4" swiperSlideClassName="!max-w-xs">
          <div className="h-full rounded-3xl overflow-hidden relative border">
            <figure className="w-full h-full absolute">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src="/images/slide1.png"
                alt="slide 1"
                sizes="(max-width: 768px) 100vw"
              />
            </figure>
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black/0"></div>
            <div className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold">
              <span className="text-white">Sale</span>
              <span className="text-color1 text-4xl">50%</span>
              <span className="text-white">Potongan</span>
            </div>

            {/* <a href="details.html" className="absolute inset-0"></a> */}
          </div>

          <div className="h-full rounded-3xl overflow-hidden relative border">
            <figure className="w-full h-full absolute">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src="/images/slide2.png"
                alt="slide 2"
                sizes="(max-width: 768px) 100vw"
              />
            </figure>
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black/0"></div>
            <div className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold">
              <span className="text-white">Sale</span>
              <span className="text-color1 text-4xl">50%</span>
              <span className="text-white">Potongan</span>
            </div>

            {/* <a href="details.html" className="absolute inset-0"></a> */}
          </div>
        </Slider>
      </section>

      <Categories />

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <Packages show="popular" />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <Testimonials />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>
        <Packages show="newest" />
      </section>

      <BottomBar />
    </>
  );
}
