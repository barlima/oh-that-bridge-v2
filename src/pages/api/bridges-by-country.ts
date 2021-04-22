import { NextApiRequest, NextApiResponse } from "next";
import fire from "../../config/fire-config";
import { Bridge } from "../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { country } = req.query;

  if (!country) {
    res.status(400);
  }

  const bridges: Bridge[] = [];
  const bridgesRef = fire.firestore().collection("bridges");
  const documnet = await bridgesRef
    .where("metadata.countryCode", "==", country)
    .get();

  documnet.forEach((doc) => bridges.push(doc.data() as Bridge));

  res.status(200).json({ bridges });
}
