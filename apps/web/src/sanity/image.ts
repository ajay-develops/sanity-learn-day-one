import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  if (!source || !source.asset) {
    throw new Error("Invalid image source: missing asset");
  }
  return builder.image(source);
}
