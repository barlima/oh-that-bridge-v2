import fire from "../../../config/fire-config";
import { NextApiRequest, NextApiResponse } from "next";
import { Bridge } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bridge: Bridge = JSON.parse(req.body);
    await fire.firestore().collection("bridges").doc(bridge.id).set(bridge);

    return res.status(200).json({});
  } catch (e) {
    return res.status(500);
  }
}
