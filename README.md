# extract-asn1

![](https://img.shields.io/badge/support-NR_RRC-brightgreen)
![](https://img.shields.io/badge/support-NGAP-brightgreen)
![](https://img.shields.io/badge/support-XnAP-brightgreen)
![](https://img.shields.io/badge/support-E1AP-brightgreen)
![](https://img.shields.io/badge/support-F1AP-brightgreen)  
![](https://img.shields.io/badge/support-LTE_RRC-brightgreen)
![](https://img.shields.io/badge/support-S1AP-brightgreen)
![](https://img.shields.io/badge/support-X2AP-brightgreen)
![](https://img.shields.io/badge/support-W1AP-brightgreen)

![](https://img.shields.io/badge/support-TXT-blue)
![](https://img.shields.io/badge/support-DOC-blue)
![](https://img.shields.io/badge/support-DOCX-blue)

ASN.1 extractor. Extract ASN.1 definition from 3GPP standard specifications.

## Usage

```sh
npx extract-asn1 [--exclude-non-tag-comment] <path>
```

[Project 3rd]: https://github.com/proj3rd

- `path`: An absolute or relative path to a file containing 3GPP ASN.1 definition. Supports doc, docx and plain text files.
- `--exclude-non-tag-comment`: Whether to exclude non-tag comments. Tags are, for example, `-- Need R` or `-- Cond HO-toEPC`.
