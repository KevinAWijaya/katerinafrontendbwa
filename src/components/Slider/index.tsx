import { Children, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";

type Props = {
  children: ReactNode;
  spaceBetween: number;
  swiperSlideClassName?: string;
  swiperClassName?: string;
  hasPagination?: boolean;
};

function Slider({ children, spaceBetween, swiperSlideClassName, swiperClassName, hasPagination }: Props) {
  let modules = [Navigation, A11y];

  if (!!hasPagination) {
    modules.push(Pagination);
  }

  return (
    <Swiper
      loop={true}
      slidesPerView={"auto"}
      spaceBetween={spaceBetween}
      modules={modules}
      className={swiperClassName}
      maxBackfaceHiddenSlides={10} // untuk cloning index pertama kalau sudah index terakhir
      pagination={
        hasPagination
          ? {
              clickable: true,
            }
          : false
      }
    >
      {Children.toArray(children).map((slide: any, index) => (
        <SwiperSlide key={index} className={swiperSlideClassName}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
