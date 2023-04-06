#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import { readFile } from "fs";
import { parse } from "path";
import WordExtractor from "word-extractor";
import { extract } from "./extractor.js";
function commandExtract(path, options) {
    function extractAndWrite(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const extracted = (yield extract(text, options))
                // repalce '혻' (U+D63B) with whitespace
                .replace(/\uD63B/g, " ");
            process.stdout.write(extracted);
        });
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
//# sourceMappingURL=index.js.map