"use client";

import useQueryParams from "@/libs/useQueryParams";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useLayoutEffect } from "react";

export type TModalRegistered = "tier" | "filter-category";

export type TModalPosRegistered = "center" | "bottom";

export function RouterBack({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const router = useRouter();
  return (
    <span
      className={["cursor-pointer", className ? className : "absolute inset-0 z-10"].join(" ")}
      onClick={() => {
        onClick && onClick();
        router.back();
      }}
    >
      {children}
    </span>
  );
}

export function PreventScroling() {
  useLayoutEffect(() => {
    // dijalankan ketika komponen pertama kali muncul
    document.querySelector("body")!.classList.add("overflow-hidden");

    // Bagian return () => { ... } adalah cleanup function, akan dipanggil ketika komponen dihapus
    return () => {
      document.querySelector("body")!.classList.remove("overflow-hidden");
    };
  }, []);

  return null;
}

export function OpenModal({
  className,
  children,
  queries,
  modal,
  modalPosition,
}: {
  modal: TModalRegistered;
  modalPosition?: TModalPosRegistered;
  queries: {
    [key: string]: string;
  };
  className?: string;
  children?: ReactNode;
}) {
  const queryParams = useQueryParams();

  return (
    <Link
      href={{
        query: {
          ...queryParams,
          ...queries,
          modal,
          "modal-pos": modalPosition,
        },
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
