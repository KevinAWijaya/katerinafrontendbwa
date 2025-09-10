"use client";

import Header from "@/components/Header";

export default function ComposeHeader() {
  return (
    <Header
      appendClassName="pt-16 absolute z-20"
      back={{ historyBack: true }}
      more={{ display: true, onClick: () => {} }}
      thumbsUp={{ display: true, onClick: () => {} }}
    />
  );
}
