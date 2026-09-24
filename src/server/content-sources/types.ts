import type { contentSourceType } from "@/server/database/schema";

export type ContentSourceKind = (typeof contentSourceType.enumValues)[number];

export type ContentAsset = {
  externalId: string;
  source: ContentSourceKind;
  title: string;
  mediaUrl?: string;
  metadata: Record<string, unknown>;
};

export interface ContentSource {
  readonly kind: ContentSourceKind;
  search(query: string): Promise<ContentAsset[]>;
  getByExternalId(externalId: string): Promise<ContentAsset | null>;
}

export class ContentSourceNotConfiguredError extends Error {
  constructor(kind: ContentSourceKind) {
    super(`${kind} content source is not configured.`);
    this.name = "ContentSourceNotConfiguredError";
  }
}