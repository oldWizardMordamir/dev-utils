# removeFilesByExtension

The `removeFilesByExtension` utility is a Node.js script that recursively traverses a directory and removes files with a specified extension or suffix. It is designed to help developers clean up generated or unnecessary files in their projects.

## Features

- Recursively traverses directories.
- Deletes files with a specified extension or suffix.
- Supports optional verbose logging.
- Includes a dry-run mode to preview deletions without making changes.
- Can skip confirmation for automated workflows.

## Usage

You can run the script using `node` (for compiled JavaScript).

### Example Command

```bash
node dist/removeFilesByExtension.js '/path/to/directory' '.extension' [options]
```

### Options

- `--verbose` or `-v`: Enables verbose logging. Logs detailed information about the files being checked and deleted.
- `--yes` or `-y`: Skips the confirmation prompt. Useful for automated workflows.
- `--dry-run` or `-d`: Runs the script in dry-run mode, showing which files would be deleted without actually deleting them.

### Parameters

1. **Directory**: The path to the directory to traverse.
2. **Extension**: The file extension to target for deletion (e.g., `.log`, `.tmp`).

### Example Usages

#### Delete `.d.ts.map` files with verbose logging and confirmation:
```bash
node dist/removeFilesByExtension.js './dist' '.d.ts.map' --verbose
```

#### Delete `.log` files without confirmation:
```bash
node dist/removeFilesByExtension.js './logs' '.log' --yes
```

#### Preview `.tmp` file deletions without deleting them:
```bash
node dist/removeFilesByExtension.js './temp' '.tmp' --dry-run
```

## Confirmation Prompt

By default, the script will prompt you to confirm the directory and extension before proceeding. Example:

```bash
You entered directory: "./dist" and extension: ".d.ts.map". Is this correct? (y/n):
```

To skip this prompt, use the `--yes` or `-y` option.

## Implementation Details

The script uses the following steps:

1. Reads the contents of the specified directory.
2. Recursively traverses subdirectories.
3. Checks each file's extension.
4. Deletes files matching the specified extension (or lists them in dry-run mode).

## Error Handling

The script includes error handling for:

- Directory read errors.
- File stat errors.
- File deletion errors.

Errors are logged to the console for debugging purposes.

## Notes on Implementation

- The script uses the `confirmAndProcessDirectory` utility to handle directory confirmation and traversal.
- The `fileHandler` function checks if a file matches the specified extension and deletes it unless the `--dry-run` option is provided.
- The `--dry-run` option ensures no files are deleted, and instead logs the files that would have been deleted.

### Running the Script Directly
```bash
node dist/removeFilesByExtension.js '/path/to/directory' '.extension' [options]
```
