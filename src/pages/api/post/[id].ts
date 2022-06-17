// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  let post: any = await await prisma.post.findUnique({
    where: {
      id: isNaN(parseInt(req.query.id.toString()))
        ? 0
        : parseInt(req.query.id.toString()),
    },
  });
  if (post == null) {
    post = {
      authorId: 0,
      content: "Not Found",
      description: "",
      id: 0,
      published: false,
      title: "404 - Not Found",
    };
  }
  res.status(200).json(post);
}
