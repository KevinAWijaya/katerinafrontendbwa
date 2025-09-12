"use client";

import ArrowCircleDown from "@/assets/image/arrow-circle-down.svg";
import Calendar from "@/assets/image/calendar.svg";
import Clock from "@/assets/image/clock.svg";
import HomeTown from "@/assets/image/hometown.svg";
import Map from "@/assets/image/map.svg";
import Notes2 from "@/assets/image/notes2.svg";
import Package from "@/assets/image/package.svg";
import Peoples from "@/assets/image/peoples.svg";
import PinPoint from "@/assets/image/pinpoint.svg";
import Tax from "@/assets/image/tax.svg";
import Truck from "@/assets/image/truck.svg";
import { submitShipping } from "@/components/Packages/actions";
import { TPackageDetails } from "@/components/Packages/typed";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useEffect } from "react";

import "@/libs/thousands";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
type Props = {
  data: TPackageDetails;
  tierId: string;
};

const initialState: {
  message: string;
  field: string;
  data?: any;
} = {
  message: "",
  field: "",
};

function Form({ data, tierId }: Props) {
  const [checkout, checkoutSet] = useLocalStorage<{ [key: string]: any }>("checkout", {});

  const currentTier = data.tiers.find((catTier) => String(catTier.id) === tierId);

  const tax = (currentTier?.price || 0) * 0.11;
  const grandTotal = (currentTier?.price || 0) + tax;

  const [state, formAction] = React.useActionState(submitShipping, initialState);

  const router = useRouter();
  useEffect(() => {
    if (!!state.field && state.field != "") {
      const element = document.getElementById(state.field)!;
      element.focus();
    } else if (state.data) {
      console.log(state.data);
      checkoutSet((prev) => ({
        ...prev,
        [state.data.slug]: {
          ...prev[state.data.slug],
          ...state.data,
        },
      }));
      router.push(`/packages/${data.slug}/payments?tier=${tierId}`);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" value={data.slug} name="slug" />
      <input type="hidden" value={data.id} name="catering_package_id" />
      <input type="hidden" value={tierId} name="catering_tier_id" />

      <div className="flex flex-col gap-y-7 px-4">
        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="shipping-address" className="peer hidden" defaultChecked />
          <label
            htmlFor="shipping-address"
            className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
          >
            <h6 className="text-xl font-bold">Shipping Address</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowCircleDown />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Calendar />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Started At</span>
                <span className="font-semibold">{format(checkout[data.slug]?.started_at, "dd LLLL yyyy")}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Clock />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Time</span>
                <span className="font-semibold">Lunch Time</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <PinPoint />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">City</span>
                <span className="font-semibold">{data.city.name}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                <HomeTown />
              </span>
              <textarea
                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                name="address"
                id="address"
                rows={3}
                placeholder="Address"
                defaultValue={checkout[data.slug]?.address || ""}
              ></textarea>
              <label
                htmlFor="address"
                className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >
                Address
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Map />
              </span>
              <input
                type="text"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="post_code"
                id="post_code"
                placeholder="Post code"
                defaultValue={checkout[data.slug]?.post_code || ""}
              />
              <label
                htmlFor="post_code"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >
                Post code
              </label>
            </div>

            <div className="flex relative">
              <span className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                <Notes2 />
              </span>
              <textarea
                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                name="notes"
                id="notes"
                rows={3}
                placeholder="Notes"
                defaultValue={checkout[data.slug]?.notes || ""}
              ></textarea>
              <label
                htmlFor="notes"
                className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >
                Notes
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="payment-details" className="peer hidden" defaultChecked />
          <label
            htmlFor="payment-details"
            className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
          >
            <h6 className="text-xl font-bold">Payment Details</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowCircleDown />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Package />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Paket Catering</span>
                <span className="font-semibold">Rp {(currentTier?.price || 0).thousands()}</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Clock />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Duration</span>
                <span className="font-semibold">{currentTier?.duration || 0} Days Regularly</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Peoples />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Quantity</span>
                <span className="font-semibold">{currentTier?.quantity || 0} People</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Truck />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">Delivery</span>
                <span className="font-semibold">Rp 0 (Free)</span>
              </div>
            </div>

            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Tax />
              </span>
              <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                <span className="text-sm text-gray2">PPN 11%</span>
                <span className="font-semibold">Rp {tax.thousands()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 z-50 mb-8">
          <div className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6">
            <span className="flex flex-col">
              <span className="text-gray2 text-sm">Grand Total</span>
              <span className="font-semibold text-xl">Rp {grandTotal.thousands()}</span>
            </span>
            <button type="submit" className="bg-color1 rounded-full flex items-center justify-center text-white px-5">
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
