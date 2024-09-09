import { readFile,writeFile } from "fs/promises";
import { Project } from "../../frontend-ts/src/types";

export  async function getData() {
  const data = await readFile("./data/data.json", "utf-8");
  const parseData = JSON.parse(data);
  return parseData;
}

export  async function updateData(newRepo:Project) {
  await writeFile("./data/data.json", JSON.stringify(newRepo, null, 2));
}

