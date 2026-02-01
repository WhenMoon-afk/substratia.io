export { ScoreBar } from "./ScoreBar";
export { StarRating } from "./StarRating";
export { ReviewHeader } from "./ReviewHeader";
export { Recommendations } from "./Recommendations";
export { ReviewCtaSection } from "./ReviewCtaSection";
export { RelatedLinks } from "./RelatedLinks";

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
