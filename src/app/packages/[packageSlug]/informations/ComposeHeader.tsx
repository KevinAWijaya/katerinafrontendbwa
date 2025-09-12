"use client";

import Header from "@/components/Header";

export default function ComposeHeader() {
  return (
    <Header
      appendClassName="pt-16 bg-gray3 pb-20"
      title="Your Information"
      back={{ historyBack: true }}
      more={{ display: true, onClick: () => {} }}
      thumbsUp={{ display: false }}
    />
  );
}
