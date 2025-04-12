import readline from 'readline';
import { traverseDirectories } from '../traverseDirectories';

export const confirmAndProcessDirectory = ({ fileHandler, confirmationOverride }) => {
  const directory = process.argv[2];

  const optionArgs = process.argv.slice(3);
  const verbose = optionArgs.includes('-v') || optionArgs.includes('--verbose');
  const skipConfirmation = optionArgs.includes('-y') || optionArgs.includes('--yes');

  const log = verbose ? console.log : () => {};

  if (!directory) {
    console.error('Missing directory arguement');
    process.exit(1);
  }

  if (skipConfirmation) {
    traverseDirectories({
      directory,
      fileHandler,
      config: { log },
    });
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const confirmation = confirmationOverride || `You entered directory: "${directory}"`;

    rl.question(`${confirmation}. Is this correct? (y/n): `, (answer) => {
      if (answer.toLowerCase() === 'y') {
        traverseDirectories({ directory, fileHandler, config: { log } });
      } else {
        console.log('Operation canceled.');
      }
      rl.close();
    });
  }
};
