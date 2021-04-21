import { NextApiRequest, NextApiResponse } from "next";
// import algoliasearch from "algoliasearch";
import fire from "../../config/fire-config";
import { Bridge } from "../../utils/types";

// const client = algoliasearch(
//   process.env.ALGOLIA_APP_ID,
//   process.env.ALGOLIA_SEARCH_KEY
// );
// const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { country } = req.query;

  if (!country) {
    res.status(400);
  }

  console.log(country)

  const bridges: Bridge[] = [];
  const bridgesRef = fire.firestore().collection("bridges");
  const documnet = await bridgesRef
    .where("metadata.countryCode", "==", country)
    .get();

  documnet.forEach((doc) => bridges.push(doc.data() as Bridge));

  // const responses = await index.search((country as string).replace(/\-/, " "), {
  //   restrictSearchableAttributes: ["metadata.country"],
  // });

  res.status(200).json({ bridges });
}
