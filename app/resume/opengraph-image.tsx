import { ogImageContentType, ogImageSize, renderOgImage } from "../opengraph-image-template";
import { RESUME_LAST_UPDATED } from "@/lib/resume";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Résumé — Isaac Velez";

export default function Image() {
  return renderOgImage({
    eyebrow: "Résumé",
    title: "Isaac Velez",
    subtitle: `Data Scientist, AI & Robotics Graduate Student · Last updated ${RESUME_LAST_UPDATED}`,
  });
}
