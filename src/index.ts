#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "fs";
import { parse } from "path";
import WordExtractor from "word-extractor";
import { extract } from "asn3rd";
import { parse as parseAsn1 } from "asn3rd";

function commandExtract(path: string, options: any) {
  function extractAndWrite(text: string, options: any) {
    const [error, extracted] = extract(text, options);
    if (error) {
      throw error;
    }
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

function commandValidate(path: string) {
  readFile(path, { encoding: "utf8" }, (err, text) => {
    if (err) {
      throw err;
    }
    const [error] = parseAsn1(text);
    if (error) {
      // Not necessary. Errors are printed to stderr by default
      // error.errors.forEach((e) => {
      //   const { line, column, msg } = e;
      //   process.stderr.write(`line ${line}:${column} ${msg}`);
      // });
      process.stderr.write("\n");
      process.stderr.write("❌ ASN.1 definition seems to have syntax errors.");
      process.exit(error.errors.length);
    }
    process.stdout.write("✅ ASN.1 definition looks well formed.\n");
  });
}

const program = new Command();
program.name("asn3rd").description("ASN.1 utilities by Project 3rd");

program
  .command("extract")
  .description("Extract ASN.1 definition from a file of a given path")
  .argument("<path>", "path of a file containing ASN.1 definition")
  .option("--exclude-non-tag-comment", "Exclude non tag coment")
  .action((path, options) => commandExtract(path, options));

program
  .command("validate")
  .description("Validate ASN.1 definition from a file of a given path")
  .argument("<path>", "path of a file of ASN.1 definition")
  .action((path) => commandValidate(path));

program.parse();
