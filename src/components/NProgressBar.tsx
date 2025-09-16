"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressBar = () => {
  console.log("MASOK");
  return <ProgressBar height="4px" color="#f97316" options={{ showSpinner: true }} shallowRouting />;
};

export default NProgressBar;
