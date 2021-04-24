import { BridgeMetadata } from "../types";
import {
  IconDefinition,
  faPencilRuler,
  faGlobeEurope,
  faMapSigns,
  faRulerCombined,
  faArrowsAltH,
  faCalendarDay,
  faCity,
  faSort,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

export const metadataIconsMap: Record<keyof BridgeMetadata, IconDefinition> = {
  constructedBy: faPencilRuler,
  country: faGlobeEurope,
  countryCode: faGlobeEurope,
  region: faMapSigns,
  city: faCity,
  height: faSort,
  width: faSort,
  size: faRulerCombined,
  length: faArrowsAltH,
  opened: faCalendarDay,
  location: faMapMarkedAlt,
};
