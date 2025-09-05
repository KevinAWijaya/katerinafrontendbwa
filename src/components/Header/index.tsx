"use client";

import ArrowLeftCircle from "@/assets/image/arrow-circle-left.svg";
import Dots4 from "@/assets/image/dots4.svg";
import ThumbsUp from "@/assets/image/thumbs-up.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

type TBack = {
  historyBack: boolean;
} & (
  | {
      historyBack: true;
    }
  | {
      historyBack: false;
      url: string;
    }
);

type TThumbsUp = {
  display: boolean;
} & (
  | {
      display: false;
    }
  | {
      display: true;
      onClick: MouseEventHandler<HTMLSpanElement>;
    }
);
type TMore = {
  display: boolean;
} & (
  | {
      display: false;
    }
  | {
      display: true;
      onClick: MouseEventHandler<HTMLSpanElement>;
    }
);

type Props = {
  appendClassName: string;
  back: TBack;
  thumbsUp: TThumbsUp;
  more: TMore;
  title?: string;
};

function Header({ appendClassName, back, title, more, thumbsUp }: Props) {
  const router = useRouter();
  return (
    <header className={["flex items-center justify-between px-4 w-full gap-x-4", appendClassName].join(" ")}>
      {back.historyBack ? (
        <span
          onClick={router.back}
          className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2 cursor-pointer"
        >
          <ArrowLeftCircle />
        </span>
      ) : (
        <Link
          href={back.url}
          className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2"
        >
          <ArrowLeftCircle />
        </Link>
      )}

      {!!title ? (
        <>
          <h1 className="mx-auto text-lg font-semibold">{title}</h1>
          {!more.display && !thumbsUp.display && <span className="ml-auto"></span>}
        </>
      ) : (
        <span className="mx-auto"></span>
      )}

      {thumbsUp.display && (
        <span
          className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2"
          onClick={thumbsUp.onClick}
        >
          <ThumbsUp />
        </span>
      )}
      {more.display && (
        <span
          className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2"
          onClick={more.onClick}
        >
          <Dots4 />
        </span>
      )}
    </header>
  );
}

export default Header;
