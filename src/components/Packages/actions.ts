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
  const catering_package_id = formData.get("catering_package_id");
  const tierId = formData.get("catering_tier_id");
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
      tierId,
    },
  };

  // try {
  //   return redirect(`/packages/${slug}/shipping?tier=${catering_tier_id}`);
  // } catch (error) {
  //   return error;
  // }
}
