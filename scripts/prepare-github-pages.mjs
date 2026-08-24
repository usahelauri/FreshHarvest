import { promises as fs } from "node:fs";
import path from "node:path";

const outputDir = path.resolve("out");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".xml"]);
const publicPaths = ["brand", "products"];

async function rewriteFile(filePath) {
  if (!textExtensions.has(path.extname(filePath))) return;

  let content = await fs.readFile(filePath, "utf8");
  for (const directory of publicPaths) {
    content = content.replaceAll(`/${directory}/`, `/FreshHarvest/${directory}/`);
  }
  content = content.replaceAll("/favicon.svg", "/FreshHarvest/favicon.svg");
  await fs.writeFile(filePath, content);
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(target) : rewriteFile(target);
    }),
  );
}

await walk(outputDir);
await fs.writeFile(path.join(outputDir, ".nojekyll"), "");
