import Peoples from "@/assets/image/peoples.svg";
import { getCategoryDetails } from "@/components/Categories/actions";
import { TCategory } from "@/components/Categories/typed";
import Image from "next/image";
import ComposeHeader from "./ComposeHeader";

import { OpenModal } from "@/components/Modal";
import { ContentNewest, ContentPopular } from "@/components/Packages";
import "@/libs/thousands";

type Request = {
  params: {
    categorySlug: string;
  };
};

async function PageCategoryDetails({ params }: Request) {
  const { categorySlug } = await params;
  const { data }: { data: TCategory } = await getCategoryDetails(categorySlug);

  // console.log(data);

  return (
    <>
      <ComposeHeader />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex gap-x-3 items-center">
            <figure className="relative w-[100px] h-[120px] rounded-2xl overflow-hidden">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.photo}`}
                alt={data.name}
                sizes="(max-width: 768px) 100vw"
              />
            </figure>
            <span className="flex flex-col gap-y-3">
              <span className="font-semibold">{data.name}</span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <Peoples />
                </span>
                <span className="text-gray2">
                  {data.catering_packages_count.thousands()} {`Package${data.catering_packages_count > 1 ? "s" : ""}`}
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <ContentPopular data={data.catering_packages.filter((item) => item.is_popular === "1")} />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>
        <ContentNewest data={data.catering_packages} />
      </section>

      <div className="sticky bottom-4 mt-36 px-4 z-50 flex justify-center">
        <OpenModal
          queries={{ categorySlug: categorySlug }}
          modal="filter-category"
          modalPosition="bottom"
          className="bg-white border border-gray1 shadow-[0px_12px_30px_0px_#07041517] px-3 py-2 font-semibold text-sm rounded-full"
        >
          See Filters
        </OpenModal>
      </div>
    </>
  );
}

export default PageCategoryDetails;
