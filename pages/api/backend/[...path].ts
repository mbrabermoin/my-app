import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const app = require("../../../app/backend/app");

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Strip the /api/backend prefix so Express routes match correctly
  req.url = (req.url ?? "/").replace(/^\/api\/backend/, "") || "/";
  return app(req, res);
}
