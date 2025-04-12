import fs from 'fs';
import path from 'path';

export type Log = (...message: string[]) => void;
export type FileHandler = ({ filePath, log }: { filePath: string; log: Log }) => void;

export const traverseDirectories = ({
  directory,
  fileHandler,
  config,
}: {
  directory: string;
  fileHandler: FileHandler;
  config: { log: Log };
}) => {
  const { log } = config;

  log('Traversing directory:', directory);

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats of file ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          traverseDirectories({
            directory: filePath,
            fileHandler,
            config,
          });
        } else {
          log('checking file:', filePath);
          fileHandler({
            filePath,
            log,
          });
        }
      });
    });
  });
};
