#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = require("fs");
const path_1 = require("path");
const word_extractor_1 = __importDefault(require("word-extractor"));
const asn3rd_1 = require("asn3rd");
const asn3rd_2 = require("asn3rd");
function commandExtract(path) {
    function extractAndWrite(text) {
        const [error, extracted] = (0, asn3rd_1.extract)(text);
        if (error) {
            throw error;
        }
        process.stdout.write(extracted);
    }
    const { ext } = (0, path_1.parse)(path);
    switch (ext.toLocaleLowerCase()) {
        case ".doc":
        case ".docx":
            const extractor = new word_extractor_1.default();
            extractor
                .extract(path)
                .then((doc) => {
                const text = doc.getBody();
                extractAndWrite(text);
            })
                .catch((reason) => {
                throw reason;
            });
            break;
        default:
            (0, fs_1.readFile)(path, { encoding: "utf8" }, (err, text) => {
                if (err) {
                    throw err;
                }
                extractAndWrite(text);
            });
    }
}
function commandValidate(path) {
    (0, fs_1.readFile)(path, { encoding: "utf8" }, (err, text) => {
        if (err) {
            throw err;
        }
        const [error] = (0, asn3rd_2.parse)(text);
        if (error) {
            // Not necessary. Errors are printed to stderr by default
            // error.errors.forEach((e) => {
            //   const { line, column, msg } = e;
            //   process.stderr.write(`line ${line}:${column} ${msg}`);
            // });
            process.stderr.write('\n');
            process.stderr.write("❌ ASN.1 definition seems to have syntax errors.");
            process.exit(error.errors.length);
        }
        process.stdout.write("✅ ASN.1 definition looks well formed.\n");
    });
}
if (require.main === module) {
    const program = new commander_1.Command();
    program.name("asn3rd").description("ASN.1 utilities by Project 3rd");
    program
        .command("extract")
        .description("Extract ASN.1 definition from a file of a given path")
        .argument("<path>", "path of a file containing ASN.1 definition")
        .action((path) => commandExtract(path));
    program
        .command("validate")
        .description("Validate ASN.1 definition from a file of a given path")
        .argument("<path>", "path of a file of ASN.1 definition")
        .action((path) => commandValidate(path));
    program.parse();
}
//# sourceMappingURL=index.js.map