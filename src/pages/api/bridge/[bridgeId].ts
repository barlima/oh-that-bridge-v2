import fire from "../../../config/fire-config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bridgeId } = req.query;

  if (!bridgeId) {
    res.status(404);
  }

  const bridgeRef = fire
    .firestore()
    .collection("bridges")
    .doc(bridgeId as string);
  const documnet = await bridgeRef.get();

  if (!documnet.exists) {
    res.status(404);
  }

  res.status(200).json({
    bridge: documnet.data(),
  });
}
