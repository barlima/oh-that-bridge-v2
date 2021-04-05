import { BridgeMetadata } from "../types";

export const bridgeMetadataMap = (
  metadata: BridgeMetadata
): Partial<Record<keyof BridgeMetadata, string>> => {
  const opened = metadata.opened;

  return {
    country: metadata.country,
    region: metadata.region,
    city: metadata.city,
    opened: [opened.day, opened.month, opened.year].join("."),
    constructedBy: metadata.constructedBy,
    length: `${metadata.length}m`,
    size: [metadata.width, metadata.height]
      .filter(Boolean)
      .map((item) => `${item}m`)
      .join(" x "),
  };
};
