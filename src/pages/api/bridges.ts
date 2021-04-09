import fire from "../../config/fire-config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bridgesRef = fire.firestore().collection("bridges");
  const documnet = await bridgesRef.get();

  if (!documnet.size) {
    res.status(404);
  }

  res.status(200).json({
    bridges: documnet.docs.map((results) => results.data()),
  });
}
