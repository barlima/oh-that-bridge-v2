import { NextApiRequest, NextApiResponse } from "next";
import fire from "../../config/fire-config";
import dayjs from "dayjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = dayjs().subtract(14, "days").unix();

  const bridgesRef = fire.firestore().collection("bridges");
  const documnet = await bridgesRef
    .where("addedOn", ">=", date)
    .orderBy("addedOn", "desc")
    .limit(5)
    .get();

  res.status(200).json({
    bridges: documnet.docs.map((results) => results.data()),
  });
}
