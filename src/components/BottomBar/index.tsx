"use client";

import Package from "@/assets/image/package.svg";
import Promo from "@/assets/image/promo.svg";
import Receipt from "@/assets/image/receipt.svg";
import Support247 from "@/assets/image/support247.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

function BottomBar({}: Props) {
  const pathName = usePathname();

  const mainMenu = [
    {
      key: "Homepage",
      label: "Home",
      icon: <Package />,
      slug: "/",
    },
    {
      key: "Order",
      label: "Order",
      icon: <Receipt />,
      slug: "/orders",
    },
    {
      key: "Promo",
      label: "Promo",
      icon: <Promo />,
      slug: "/promos",
    },
    {
      key: "help",
      label: "help",
      icon: <Support247 />,
      slug: "/helps",
    },
  ];

  return (
    <div className="sticky bottom-4 px-4 z-50">
      <ul className="rounded-full flex justify-evenly gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3">
        {mainMenu.map((menu) => {
          let isActive = false;
          if (!!menu.slug) {
            if (
              pathName === menu.slug ||
              (pathName.startsWith(menu.slug) && pathName.charAt(menu.slug.length) === "/")
            ) {
              isActive = true;
            }
          }
          return (
            <li className="" key={menu.key}>
              <Link
                aria-current={isActive ? "true" : "false"}
                href={menu.slug}
                className={[
                  "flex flex-col items-center rounded-full px-3 py-1 w-[70px]",
                  isActive ? "bg-color1 text-white" : "text-gray2",
                ].join(" ")}
              >
                {menu.icon}
                <span className="text-sm">Home</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BottomBar;
