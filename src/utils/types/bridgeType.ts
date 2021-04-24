import firebase from "firebase";
import { Image } from "./imageType";
import { BridgeMetadata } from "./bridgeMetadataType";

export interface Bridge {
  id: string;
  name: string;
  image?: Image;
  description?: string;
  metadata: BridgeMetadata;
  additionalImages: Image[];
  addedOn: number;
}
