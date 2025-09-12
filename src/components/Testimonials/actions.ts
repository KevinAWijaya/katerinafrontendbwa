export async function getAllTestimonials() {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/testimonials`, {
      method: "GET",
      cache: "no-cache",
      next: { revalidate: 60 },
    });

    return res.json();
  } catch (error) {
    return error;
  }
}
