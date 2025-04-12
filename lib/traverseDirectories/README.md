# traverseDirectories

The `traverseDirectories` utility is a Node.js function that recursively traverses a directory and processes files using a custom file handler. It is designed to provide a flexible way to handle files in a directory structure.

## Features

- Recursively traverses directories.
- Processes files using a custom file handler.
- Supports configurable logging for verbose output.

## Usage

You can use the `traverseDirectories` function to traverse a directory and process files. Below is an example of how to use it.

### Example Usage

```ts
import { traverseDirectories } from 'dev-utils/lib/traverseDirectories';

const fileHandler = ({ filePath, log }) => {
  log(`Processing file: ${filePath}`);
  // Add your custom file processing logic here
};

traverseDirectories({
  directory: './path/to/directory',
  fileHandler,
  config: {
    log: console.log, // Use console.log for verbose logging
  },
});
```

### Parameters

The `traverseDirectories` function accepts the following parameters:

- **directory**: The path to the directory to traverse.
- **fileHandler**: A custom function to handle each file. It receives an object with:
  - `filePath`: The path to the current file.
  - `log`: A logging function for verbose output.
- **config**:
  - `log`: A logging function (e.g., `console.log`) for verbose output.

## Example File Handler

Here is an example of a custom file handler:

```ts
const fileHandler = ({ filePath, log }) => {
  if (filePath.endsWith('.txt')) {
    log(`Found a text file: ${filePath}`);
    // Perform actions on the text file
  }
};
```

## Error Handling

The utility includes error handling for:

- Directory read errors.
- File stat errors.

Errors are logged to the console for debugging purposes.

## Implementation Details

The `traverseDirectories` function performs the following steps:

1. Reads the contents of the specified directory.
2. Recursively traverses subdirectories.
3. Processes each file using the provided file handler.

### Running the Function Directly

You can integrate this utility into your project and call it directly with your custom file handler.
