import { existsSync, readFileSync, writeFileSync } from "node:fs";

const ENV_FILE = ".env.local";
const KEY = "NEXT_PUBLIC_BUILD_DATE";

const buildDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const newLine = `${KEY}="${buildDate}"`;

const existingLines = existsSync(ENV_FILE)
  ? readFileSync(ENV_FILE, "utf8").split("\n").filter(Boolean)
  : [];

const otherLines = existingLines.filter((line) => !line.startsWith(`${KEY}=`));

writeFileSync(ENV_FILE, [...otherLines, newLine].join("\n") + "\n");

console.log(`Set ${KEY}=${buildDate}`);
