export type BridgeMetadata = {
  constructedBy?: string;
  country: string;
  region?: string;
  city?: string;
  height?: number;
  length?: number;
  width?: number;
  size?: string;
  opened?: {
    day: number;
    month: number;
    year: number;
  };
  location: {
    lat: number;
    long: number;
  };
};
