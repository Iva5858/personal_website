import { ogImageContentType, ogImageSize, renderOgImage } from "../opengraph-image-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Contact — Isaac Velez";

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Get In Touch",
    subtitle: "isaacvelezaguirre@gmail.com",
  });
}
