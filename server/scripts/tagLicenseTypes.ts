import "dotenv/config";
import mongoose from "mongoose";
import { MONGODB_URI } from "../src/config.js";
import { QuestionModel } from "../src/models/Question.js";
import { parseOfficialTheoryXml } from "../src/services/parseOfficialTheoryXml.js";

const DEFAULT_XML_URL =
  "https://data.gov.il/dataset/618dd157-8df3-43e7-bf9a-00974b4919e9/resource/8c0f314f-583d-48b6-9f5f-4483d95f6848/download/theoryexamhe-data_yellow.xml";

function extractQuestionNum(text: string): number | null {
  const m = text.trim().match(/^0*(\d+)\./);
  if (!m) return null;
  return Number(m[1]);
}

async function main() {
  const xmlUrl = process.env.THEORY_XML_URL?.trim() || DEFAULT_XML_URL;
  console.log("Downloading:", xmlUrl);
  const res = await fetch(xmlUrl);
  if (!res.ok) {
    throw new Error(`Failed to download XML: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const parsed = parseOfficialTheoryXml(xml);
  console.log("Parsed questions with license tags:", parsed.length);

  await mongoose.connect(MONGODB_URI);

  const docs = await QuestionModel.find({}).select("_id text").lean();
  const byNum = new Map<number, mongoose.Types.ObjectId[]>();
  for (const doc of docs) {
    const num = extractQuestionNum(doc.text);
    if (num == null) continue;
    const list = byNum.get(num) ?? [];
    list.push(doc._id as mongoose.Types.ObjectId);
    byNum.set(num, list);
  }

  const ops: mongoose.mongo.AnyBulkWriteOperation[] = [];
  let missing = 0;

  for (const row of parsed) {
    const ids = byNum.get(row.questionNum);
    if (!ids?.length) {
      missing += 1;
      continue;
    }
    for (const id of ids) {
      ops.push({
        updateOne: {
          filter: { _id: id },
          update: { $set: { licenseTypes: row.licenseTypes } },
        },
      });
    }
  }

  if (ops.length) {
    const result = await QuestionModel.bulkWrite(ops);
    console.log("Bulk updated:", result.modifiedCount);
  }

  const tagged = await QuestionModel.countDocuments({
    licenseTypes: { $exists: true, $ne: [] },
  });
  const total = await QuestionModel.countDocuments();

  console.log("Questions not matched in DB:", missing);
  console.log(`Tagged in DB: ${tagged}/${total}`);

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
