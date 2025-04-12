# confirmAndProcessDirectory

The `confirmAndProcessDirectory` utility is a Node.js function that prompts the user to confirm a directory before processing its files. It is designed to provide a flexible and interactive way to handle files in a directory structure.

## Features

- Prompts the user to confirm the directory before proceeding.
- Supports verbose logging for detailed output.
- Allows skipping confirmation for automated workflows.
- Integrates with custom file handlers for file processing.

## Usage

You can use the `confirmAndProcessDirectory` function to confirm a directory and process its files. Below is an example of how to use it.

### Example Usage

```ts
import { confirmAndProcessDirectory } from 'dev-utils/lib/confirmAndProcessDirectory';

const fileHandler = ({ filePath, log }) => {
  log(`Processing file: ${filePath}`);
  // Add your custom file processing logic here
};

confirmAndProcessDirectory({
  fileHandler,
  confirmationOverride: 'You entered a custom directory. Is this correct?',
});
```

### Parameters

The `confirmAndProcessDirectory` function accepts the following parameters:

- **fileHandler**: A custom function to handle each file. It receives an object with:
  - `filePath`: The path to the current file.
  - `log`: A logging function for verbose output.
- **confirmationOverride** (optional): A custom confirmation message to display to the user.

### Options

- `-v` or `--verbose`: Enables verbose logging. Logs detailed information about the files being processed.
- `-y` or `--yes`: Skips the confirmation prompt. Useful for automated workflows.

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

- Missing directory arguments.
- Invalid user input during confirmation.

Errors are logged to the console for debugging purposes.

## Implementation Details

The `confirmAndProcessDirectory` function performs the following steps:

1. Reads the directory path from the command-line arguments.
2. Prompts the user to confirm the directory (unless skipped with `-y`).
3. Recursively processes files in the directory using the provided file handler.

### Running the Function Directly

You can integrate this utility into your project and call it directly with your custom file handler.
