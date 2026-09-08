import type { CollectionEntry } from "astro:content";
import { keywordMap, trackMeta, trackPriority } from "./taxonomy-rules";

const base = import.meta.env.BASE_URL;

export type TrackKey = "understand" | "assessment" | "treatment" | "life";

function normalize(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "");
}

export function inferTrack(post: CollectionEntry<"posts">): TrackKey {
  if (post.data.track) {
    return post.data.track;
  }

  const corpus = normalize(
    [post.data.title, post.data.excerpt, post.data.keyPoint ?? "", ...post.data.tags].join(" "),
  );

  for (const track of trackPriority) {
    const matched = keywordMap[track].some((keyword) => corpus.includes(normalize(keyword)));
    if (matched) {
      return track;
    }
  }

  if (post.data.section === "science") {
    return "understand";
  }

  if (post.data.section === "practice") {
    return "assessment";
  }

  return "life";
}

export function getTrackMeta(track: TrackKey) {
  return trackMeta[track];
}

export const trackEntries = Object.entries(trackMeta) as Array<[TrackKey, (typeof trackMeta)[TrackKey]]>;
