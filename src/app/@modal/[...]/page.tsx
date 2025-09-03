import { PreventScroling, RouterBack, TModalPosRegistered, TModalRegistered } from "@/components/Modal";

type Request = {
  searchParams: {
    modal: TModalRegistered;
    "modal-pos": TModalPosRegistered;
    [key: string]: string;
  };
};

function page({ searchParams }: Request) {
  if (searchParams.modal) {
    let modalPosition = "items-center";
    let modalWrapper = "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20";

    if (searchParams["modal-pos"] === "bottom") {
      modalPosition = "items-end";
      modalWrapper =
        "bg-white rounded-t-2xl p-4 flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245]";
    }
    return (
      <>
        <div
          id="modal"
          className={["fixed inset-0 z-50 bg-color4/80 items-center justify-center", modalPosition].join(" ")}
        >
          <div className={modalWrapper}>{/* render semua content  */}</div>

          <RouterBack />
        </div>

        <PreventScroling />
      </>
    );
  }

  return null;
}

export default page;
