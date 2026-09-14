import { getProjectById } from "../data";
import { ogImageContentType, ogImageSize, renderOgImage } from "../../opengraph-image-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Project — Isaac Velez";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(parseInt(id, 10));

  return renderOgImage({
    eyebrow: project?.category ?? "Project",
    title: project?.title ?? "Project",
    subtitle: project?.timeframe ?? "",
  });
}
