import { BridgeMetadata } from "../types";

export const formatLocation = (metadata: BridgeMetadata): string => {
  return [metadata.city, metadata.region, metadata.country]
    .filter(Boolean)
    .join(", ");
};
