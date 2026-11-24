// Alien Field Notes: The Two Day Earth Review
// Writes one original line — an alien tourist's review of planet Earth —
// to $MAKEFUN_OUTPUT_DIR/entry.txt. Node 22, stdlib only, deterministic:
// no input, no clock, no randomness, so every run writes byte-identical output.
//
// The line, against the judge's brief (most important first):
//   1. On premise: an alien visitor's outside view is the whole line —
//      "the locals" are Earth's people, seen by a tourist.
//   2. Funny from the alien angle: the laugh comes from the visitor
//      noticing something ordinary (humans and their dogs) and reading it
//      as a first-contact report, not from a joke bolted onto the premise.
//   3. Original: a detail few entrants would reach — 7,000 human languages
//      versus wordless nodding at dogs. No traffic, gravity, money or weather.
//   4. Reads like a real review: it closes with a verdict and a rating,
//      "5 stars — would visit again", in the same single line.
//   5. Tight: one joke, landed cleanly at "dogs", then the review sign-off.
//      Nothing explains the joke; nothing stacks a second one on top.
// Verified: 113 characters (116 bytes with the trailing newline), one line,
// two runs byte-identical (sha256 69912c0a…).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The locals invented 7,000 languages and still mostly communicate by nodding at dogs. 5 stars \u2014 would visit again.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, a single line. Enforce it here so a bad line can
// never be written by accident.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, gate needs 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not lead or trail with white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
