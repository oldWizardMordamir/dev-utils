import fs from 'fs';
import path from 'path';
import readline from 'readline';

export const removeFilesByExtension = (dir, extension, config) => {
  const { log } = config;

  log('Traversing directory:', dir, ', extension:', extension);

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats of file ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          removeFilesByExtension(filePath, extension, config);
        } else {
          log('checking file:', filePath, filePath.endsWith(extension), extension);

          if (filePath.endsWith(extension)) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
              } else {
                log(`Deleted file ${filePath}`);
              }
            });
          }
        }
      });
    });
  });
};

const dir = process.argv[2];
const extension = process.argv[3];

const optionArgs = process.argv.slice(4);
const verbose = optionArgs.includes('-v');
const skipConfirmation = optionArgs.includes('-y');

const log = verbose ? console.log : () => {};

if (!dir || !extension) {
  console.error('Usage: node dist/removeFilesByExtension <directory> <extension> <optional: -q>');
  process.exit(1);
}

if (skipConfirmation) {
  removeFilesByExtension(dir, extension, { log });
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `You entered directory: "${dir}" and extension: "${extension}". Is this correct? (y/n): `,
    (answer) => {
      if (answer.toLowerCase() === 'y') {
        removeFilesByExtension(dir, extension, { log });
      } else {
        console.log('Operation canceled.');
      }
      rl.close();
    },
  );
}
