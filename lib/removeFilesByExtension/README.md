# removeFilesByExtension

The `removeFilesByExtension` utility is a Node.js script that recursively traverses a directory and removes files with a specified extension or suffix. It is designed to help developers clean up generated or unnecessary files in their projects.

## Features

- Recursively traverses directories.
- Deletes files with a specified extension or suffix.
- Supports optional verbose logging.
- Includes a confirmation prompt to prevent accidental deletions.
- Can skip confirmation for automated workflows.

## Usage

You can run the script using `ts-node` (for TypeScript) or `node` (for compiled JavaScript).

### Example Commands

#### Running with `ts-node` (TypeScript)
```bash
ts-node lib/removeFilesByExtension/index.ts '/path/to/directory' '.extension' [options]
```

#### Running with `node` (JavaScript)
```bash
node dist/removeFilesByExtension './directory' '.extension' [options]
```

### Options

- `-v`: Enables verbose logging. Logs detailed information about the files being checked and deleted.
- `-y`: Skips the confirmation prompt. Useful for automated workflows.

### Parameters

1. **Directory**: The path to the directory to traverse.
2. **Extension**: The file extension to target for deletion (e.g., `.log`, `.tmp`).

### Example Usages

#### Delete `.d.ts.map` files with verbose logging and confirmation:
```bash
ts-node lib/removeFilesByExtension/index.ts './dist' '.d.ts.map' -v
```

#### Delete `.log` files without confirmation:
```bash
node dist/removeFilesByExtension './logs' '.log' -y
```

## Confirmation Prompt

By default, the script will prompt you to confirm the directory and extension before proceeding. Example:

```bash
You entered directory: "./dist" and extension: ".d.ts.map". Is this correct? (y/n):
```

To skip this prompt, use the `-y` option.

## Implementation Details

The script uses the following steps:

1. Reads the contents of the specified directory.
2. Recursively traverses subdirectories.
3. Checks each file's extension.
4. Deletes files matching the specified extension.

## Error Handling

The script includes error handling for:

- Directory read errors.
- File stat errors.
- File deletion errors.

Errors are logged to the console for debugging purposes.

### Running the Script Directly
```bash
ts-node lib/removeFilesByExtension/index.ts '/path/to/directory' '.extension' [options]
```
