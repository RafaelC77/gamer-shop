import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "54ubw1w9",
  dataset: "production",
  apiVersion: "2022-09-12",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
