"use client";

import { useSearchParams } from "next/navigation";

function useQueryParams() {
  // Fungsinya untuk membaca query string (search params) dari URL, misalnya ?id=123&lang=en.
  const query = useSearchParams();

  const queryParams: { [key: string]: string } = {};

  for (const [key, value] of query.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
}

export default useQueryParams;
