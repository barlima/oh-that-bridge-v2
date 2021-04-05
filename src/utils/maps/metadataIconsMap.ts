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
} from "@fortawesome/free-solid-svg-icons";

export const metadataIconsMap: Record<keyof BridgeMetadata, IconDefinition> = {
  constructedBy: faPencilRuler,
  country: faGlobeEurope,
  region: faMapSigns,
  city: faCity,
  height: faRulerCombined,
  width: faRulerCombined,
  size: faRulerCombined,
  length: faArrowsAltH,
  opened: faCalendarDay,
};
