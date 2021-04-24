import dayjs from "dayjs";
import countries from "i18n-iso-countries";
import { Bridge } from "../types";

const getOpenedDate = (
  opened: Date
): Record<"day" | "month" | "year", number> | undefined => {
  if (!opened) {
    return;
  }

  const date = dayjs(opened);

  return {
    day: date.day(),
    month: date.month(),
    year: date.year(),
  };
};

export const newBridgeFormMap = (values: any): Bridge => {
  const additionalImagesRange = new Array(3).fill(0);

  return {
    id: values.id,
    name: values.bridgeName,
    addedOn: dayjs().unix(),
    metadata: {
      country: values.country,
      countryCode: countries.getAlpha2Code(values.country, "en"),
      region: values.region,
      city: values.city,
      width: values.width,
      height: values.height,
      length: values.length,
      constructedBy: values.constructedBy,
      opened: getOpenedDate(values.opened),
      location: {
        lat: values.lat,
        long: values.long,
      },
    },
    image: {
      src: values.src,
      alt: values.id,
      caption: {
        text: values.text,
        link: values.link,
        href: values.href,
      },
    },
    additionalImages: additionalImagesRange.reduce((acc, _, i) => {
      if (!values[`src${i}`]) {
        return acc;
      }

      return [
        ...acc,
        {
          src: values[`src${i}`],
          alt: values.id,
          caption: {
            text: values[`text${i}`],
            link: values[`link${i}`],
            href: values[`href${i}`],
          },
        },
      ];
    }, []),
  };
};
