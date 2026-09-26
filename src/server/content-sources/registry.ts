import type { ContentSource, ContentSourceKind } from "./types";
import { UnconfiguredContentSource } from "./unconfigured";

export class ContentSourceRegistry {
  private readonly sources = new Map<ContentSourceKind, ContentSource>();

  register(source: ContentSource) {
    this.sources.set(source.kind, source);
  }

  get(kind: ContentSourceKind): ContentSource {
    return this.sources.get(kind) ?? new UnconfiguredContentSource(kind);
  }
}

export const contentSources = new ContentSourceRegistry();