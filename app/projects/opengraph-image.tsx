import { ogImageContentType, ogImageSize, renderOgImage } from "../opengraph-image-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Projects — Isaac Velez";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "Projects",
    subtitle: "AI, robotics, machine learning, and LLM projects by Isaac Velez",
  });
}
