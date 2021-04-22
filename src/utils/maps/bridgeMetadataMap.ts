import { BridgeMetadata } from "../types";
import { formatDate, formatCoordinates } from "../formatters";

export const bridgeMetadataMap = (
  metadata: BridgeMetadata
): Partial<Record<keyof BridgeMetadata, string>> => {
  const opened = metadata.opened;

  return {
    country: metadata.country,
    region: metadata.region,
    city: metadata.city,
    location: formatCoordinates(metadata.location),
    opened: opened ? formatDate(opened.day, opened.month, opened.year) : "",
    constructedBy: metadata.constructedBy,
    length: metadata.length ? `${metadata.length}m` : "",
    width: metadata.width ? `${metadata.width}m` : "",
    height: metadata.height ? `${metadata.height}m` : "",
  };
};
