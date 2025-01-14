import { place } from "./data";

export default function handler(req, res) {
  const { placeId } = req.query;
  res.status(200).json(place(placeId));
}
