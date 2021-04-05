import { NextApiRequest, NextApiResponse } from "next";
import upperFirst from "lodash/upperFirst";
import uniqBy from "lodash/uniqBy";
import fire from "../../config/fire-config";

const capitalise = (text: string): string => {
  return text.toLowerCase().split(" ").map(upperFirst).join(" ");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phrase } = req.query;

  if (!phrase) {
    res.status(400);
  }

  const bridgesRef = fire.firestore().collection("bridges");
  const capitalisedPhrase = capitalise(phrase as string);

  const searchNameByPhrase = bridgesRef
    .where("name", ">=", phrase)
    .where("name", "<=", phrase + "\uf8ff");

  const searchNameByPhraseCapitialised = bridgesRef
    .where("name", ">=", capitalisedPhrase)
    .where("name", "<=", capitalisedPhrase + "\uf8ff");

  const searchCountryByPhrase = bridgesRef
    .where("metadata.country", ">=", capitalisedPhrase)
    .where("metadata.country", "<=", capitalisedPhrase + "\uf8ff");

  const [byPhrase, byCapitialised, byCountry] = await Promise.all([
    searchNameByPhrase.get(),
    searchNameByPhraseCapitialised.get(),
    searchCountryByPhrase.get(),
  ]);

  // Uniq not working :(
  const allResults = uniqBy(
    [...byPhrase.docs, ...byCapitialised.docs, ...byCountry.docs],
    "id"
  );

  res.status(200).json({
    bridges: allResults.map((results) => results.data()),
  });
}
