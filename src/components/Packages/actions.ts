"use server";

import { redirect } from "next/navigation";

interface File {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}

export async function getPackages() {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/catering-package`, {
      method: "GET",
      cache: "force-cache",
    });

    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getPackageDetails(packageSlug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/catering-package/${packageSlug}`, {
      method: "GET",
      cache: "force-cache",
    });

    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getFilteredPackagesByCityAndCategory(categorySlug: string, citySlug: string) {
  try {
    const res = await fetch(
      `${process.env.HOST_API}/api/filters/catering-packages?category_slug=${categorySlug}&city_slug=${citySlug}`,
      {
        method: "GET",
        cache: "force-cache",
      }
    );

    return res.json();
  } catch (error) {
    return error;
  }
}

export async function submitInformation(prevState: any, formData: FormData) {
  const name = (formData.get("name") as string) ?? "";
  const email = formData.get("email");
  const phone = formData.get("phone");
  const started_at = formData.get("started_at");
  const slug = formData.get("slug");
  const catering_tier_id = formData.get("catering_tier_id");
  if (name === "") {
    return {
      message: "Nama tidak boleh kosong!",
      field: "name",
    };
  }

  if (email === "") {
    return {
      message: "Email tidak boleh kosong!",
      field: "email",
    };
  }

  if (phone === "") {
    return {
      message: "Phone tidak boleh kosong!",
      field: "phone",
    };
  }
  if (started_at === "") {
    return {
      message: "Pilih tanggal terlebih dahulu!",
      field: "started_at",
    };
  }

  return {
    message: "Next Step",
    field: "",
    data: {
      slug,
      name,
      email,
      phone,
      started_at,
      catering_tier_id,
    },
  };
}
export async function submitShipping(prevState: any, formData: FormData) {
  const address = formData.get("address");
  const post_code = formData.get("post_code");
  const notes = formData.get("notes");
  const started_at = formData.get("started_at");
  const slug = formData.get("slug");
  // const catering_package_id = formData.get("catering_package_id");
  const catering_tier_id = formData.get("catering_tier_id");

  if (address === "") {
    return {
      message: "Alamat tidak boleh kosong!",
      field: "address",
    };
  }

  if (post_code === "") {
    return {
      message: "Postal code tidak boleh kosong!",
      field: "post_code",
    };
  }

  if (notes === "") {
    return {
      message: "Catatan tidak boleh kosong!",
      field: "notes",
    };
  }

  return {
    message: "Next Step",
    field: "",
    data: {
      address,
      post_code,
      notes,
      slug,
      catering_tier_id,
    },
  };

  // try {
  //   return redirect(`/packages/${slug}/shipping?tier=${catering_tier_id}`);
  // } catch (error) {
  //   return error;
  // }
}
export async function submitPayment(prevState: any, formData: FormData) {
  const slug = formData.get("slug") as string;
  const phone = formData.get("phone");
  const st = formData.get("started_at");

  const proof = formData.get("proof") as File;
  if (proof.size === 0) {
    return {
      message: "Bukti pembayaran tidak boleh kosong!",
      field: "proof",
    };
  }

  try {
    const res = await fetch(`${process.env.HOST_API}/api/booking-transaction`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return {
      message: "Next Step",
      field: "",
      data: {
        slug,
        phone,
        booking_trx_id: data.data.booking_trx_id,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      field: "toaster",
    };
  }
}
export async function checkBookingByTrxId(booking_trx_id: string, phone: string) {
  try {
    const formData = new FormData();
    formData.append("booking_trx_id", booking_trx_id);
    formData.append("phone", phone);

    const res = await fetch(`${process.env.HOST_API}/api/check-booking`, {
      method: "POST",
      body: formData,
    });

    return res.json();
  } catch (error) {
    return error;
  }
}

export async function navigateOrdersByTrxId(prevState: any, formData: FormData) {
  const phone = formData.get("phone");
  const booking_trx_id = formData.get("booking_trx_id");
  if (phone === "") {
    return {
      message: "Enter phone number",
      field: "phone",
    };
  }
  if (booking_trx_id === "") {
    return {
      message: "Enter transaction id",
      field: "booking_trx_id",
    };
  }

  try {
    const res = await fetch(`${process.env.HOST_API}/api/check-booking`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return {
        message: "Transaction id or Phone is not found",
        field: "toaster",
      };
    }

    return redirect(`/orders/${booking_trx_id}?phone`);
  } catch (error) {
    return error;
  }
}
