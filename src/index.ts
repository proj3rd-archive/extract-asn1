#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "fs";
import { parse } from "path";
import WordExtractor from "word-extractor";
import { extract } from "lib3rd/dist/packages/asn1";

function commandExtract(path: string, options: any) {
  async function extractAndWrite(text: string, options: any) {
    const extracted = await extract(text, options);
    process.stdout.write(extracted);
  }

  const { ext } = parse(path);
  switch (ext.toLocaleLowerCase()) {
    case ".doc":
    case ".docx":
      const extractor = new WordExtractor();
      extractor
        .extract(path)
        .then((doc) => {
          const text = doc.getBody();
          extractAndWrite(text, options);
        })
        .catch((reason) => {
          throw reason;
        });
      break;
    default:
      readFile(path, { encoding: "utf8" }, (err, text) => {
        if (err) {
          throw err;
        }
        extractAndWrite(text, options);
      });
  }
}

const program = new Command();
program.name("extract-asn1").description("ASN.1 extractor by Project 3rd");

program
  .description("Extract ASN.1 definition from a file of a given path")
  .argument("<path>", "path of a file containing ASN.1 definition")
  .option("--exclude-non-tag-comment", "Exclude non tag comment (tag is used by RRC specifications)")
  .action((path, options) => commandExtract(path, options));

program.parse();
