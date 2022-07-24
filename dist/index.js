#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asn3rd_1 = require("asn3rd");
const commander_1 = require("commander");
const fs_1 = require("fs");
const path_1 = require("path");
const word_extractor_1 = __importDefault(require("word-extractor"));
function commandExtract(path, options) {
    function extractAndWrite(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const extracted = yield (0, asn3rd_1.extract)(text, options);
            process.stdout.write(extracted);
        });
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
                extractAndWrite(text, options);
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
                extractAndWrite(text, options);
            });
    }
}
const program = new commander_1.Command();
program.name("extract-asn1").description("ASN.1 extractor by Project 3rd");
program
    .description("Extract ASN.1 definition from a file of a given path")
    .argument("<path>", "path of a file containing ASN.1 definition")
    .option("--exclude-non-tag-comment", "Exclude non tag comment (tag is used by RRC specifications)")
    .action((path, options) => commandExtract(path, options));
program.parse();
//# sourceMappingURL=index.js.map