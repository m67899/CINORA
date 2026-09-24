import type { ContentAsset, ContentSource, ContentSourceKind } from "./types";
import { ContentSourceNotConfiguredError } from "./types";

export class UnconfiguredContentSource implements ContentSource {
  constructor(public readonly kind: ContentSourceKind) {}

  search(query: string): Promise<ContentAsset[]> {
    void query;
    throw new ContentSourceNotConfiguredError(this.kind);
  }

  getByExternalId(externalId: string): Promise<ContentAsset | null> {
    void externalId;
    throw new ContentSourceNotConfiguredError(this.kind);
  }
}