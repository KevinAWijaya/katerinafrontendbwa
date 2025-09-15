import BottomBar from "@/components/BottomBar";
import { Metadata } from "next";
import Image from "next/image";
import Form from "./Form";

export const metaData: Metadata = {
  title: "Orders",
};

function BookingsPage() {
  return (
    <>
      <section className="relative px-8 mt-28">
        <figure className="w-full h-[219px] relative">
          <Image
            fill
            className="w-full h-full object-contain object-center"
            src={`/images/chef.png`}
            alt="chef"
            sizes="(max-width: 768px) 100vw"
          />
        </figure>
      </section>

      <Form />

      <div className="mt-36">
        <BottomBar />
      </div>
    </>
  );
}

export default BookingsPage;
