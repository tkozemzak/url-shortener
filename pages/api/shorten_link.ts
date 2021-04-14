import { connectToDatabase } from "./_connector";

export default async (req, res) => {
  const db = await connectToDatabase();

  if (req.body !== "" && req.body.link !== undefined && req.body.link !== "") {
    const entry = await db
      .db("links_db")
      .collection("links_collection")
      .insertOne({
        link: req.body.link,
      });
    console.log("entry insterted id", String(entry.insertedId).slice(19, 24));
    res.statusCode = 201;
    let shortenedStr = String(entry.insertedId).slice(19, 24);

    return res.json({
      short_link: `${process.env.VERCEL_URL}/r/${shortenedStr}`,
    });
  }
  res.statusCode = 409;
  res.json({ error: "no_link_found", error_description: "No link found" });
};
