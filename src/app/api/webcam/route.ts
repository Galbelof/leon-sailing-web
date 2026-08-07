const SKYLINE_SNAPSHOT_URL = "https://embed.skylinewebcams.com/img/507.jpg";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const revalidate = 300;

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(SKYLINE_SNAPSHOT_URL, {
      signal: controller.signal,
      headers: { Accept: "image/jpeg,image/*;q=0.8" },
      next: { revalidate: 300 },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const declaredSize = Number(response.headers.get("content-length") ?? 0);

    if (!response.ok || !contentType.startsWith("image/")) {
      throw new Error(`Invalid webcam response: ${response.status}`);
    }
    if (declaredSize > MAX_IMAGE_BYTES) {
      throw new Error("Webcam image is too large");
    }

    const image = await response.arrayBuffer();
    if (image.byteLength === 0 || image.byteLength > MAX_IMAGE_BYTES) {
      throw new Error("Invalid webcam image size");
    }

    return new Response(image, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json(
      { success: false, error: "Webcam temporarily unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  } finally {
    clearTimeout(timeout);
  }
}
