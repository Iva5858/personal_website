import { ogImageContentType, ogImageSize, renderOgImage } from "./opengraph-image-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Isaac Velez — Data Scientist, AI & Robotics Graduate Student";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "Data Scientist, AI & Robotics Graduate Student",
    subtitle: "MSAI @ Columbia University (Robotics & Perception) · New York, NY",
  });
}
