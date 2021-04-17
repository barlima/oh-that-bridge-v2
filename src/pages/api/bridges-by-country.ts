import { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { country } = req.query;

  if (!country) {
    res.status(400);
  }

  const responses = await index.search((country as string).replace(/\-/, " "), {
    restrictSearchableAttributes: ["metadata.country"],
  });

  res.status(200).json({
    bridges: responses.hits,
  });
}
