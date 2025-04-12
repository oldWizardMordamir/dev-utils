import fs from 'fs';
import { confirmAndProcessDirectory } from '../confirmAndProcessDirectory';

const dir = process.argv[2];
const extension = process.argv[3];

const confirmationOverride = `You entered directory: "${dir}" and extension: "${extension}".`;

const fileHandler = ({ filePath }: { filePath: string }) => {
  if (filePath.endsWith(extension)) {
    if (process.argv.includes('--dry-run') || process.argv.includes('-d')) {
      console.log(`Dry run: skipped deleting file ${filePath}`);
      return;
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      } else {
        console.log(`Deleted file ${filePath}`);
      }
    });
  }
};

confirmAndProcessDirectory({
  fileHandler,
  confirmationOverride,
});
