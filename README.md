# dev-utils

Library of javascript utilities.

## Installation

npm i dev-utils

## Usage

see spec files for example usage

## Development
Running a file directly
```bash
ts-node lib/path/to/file.ts
```

Running a file with nodemon

```bash
nodemon --watch 'lib/**/*.ts' --exec 'ts-node' lib/path/to/file.ts
```
## Utilities

### removeFilesByExtension

The `removeFilesByExtension` utility helps you recursively delete files with a specific extension or suffix in a directory. For detailed usage instructions, visit the [removeFilesByExtension README](./lib/removeFilesByExtension/README.md).
