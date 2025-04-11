// inserts new records into table from a csv file

// example csvParser value to pass to insertCSVToMSSQL:
// import csv as csvParser from 'csv-parser';

// example replaceKeyValues
// const replaceKeyValues = {
//   create_date: new Date(),
//   comments: null,
//   status: (value) => value === 'active' ? 'active' : 'inactive',
// };

import fs from 'fs';

export const insertCSVToMSSQL = async ({
  csvFilePath,
  csvParser,
  sqlConnection,
  sqlTable,
  options: { allowNullStrings = false, removeKeys = [], replaceKeyValues = [] },
}: {
  csvFilePath: string;
  sqlConnection: any;
  sqlTable: string;
  csvParser: any;
  options: {
    allowNullStrings?: boolean;
    removeKeys?: string[];
    replaceKeyValues?: { [k: string]: any }[];
  };
}) => {
  const csvData: any = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => csvData.push(data))
    .on('end', () => {
      const json: { [k: string]: any }[] = [];

      csvData.forEach((row: { [key: string]: string | null }) => {
        const processedRow: any = {};
        const rowKeys = Object.keys(row);

        if (!allowNullStrings) {
          rowKeys.forEach((key) => {
            if (row[key] && row[key].toLowerCase() === 'null') {
              row[key] = null;
            }
          });
        }

        Object.entries(replaceKeyValues).forEach(([key, value]) => {
          if (typeof value === 'function') {
            processedRow[key] = value(processedRow[key]);
          } else {
            processedRow[key] = value;
          }
        });

        removeKeys.forEach((removeKey) => {
          delete processedRow[removeKey];
        });

        json.push(processedRow);
      });

      insertJson({
        json,
        sqlConnection,
        sqlTable,
      });
    });
};

const insertJson = async ({
  json,
  sqlConnection,
  sqlTable,
  processJson,
}: {
  json: { [k: string]: any }[];
  sqlConnection: any;
  sqlTable: string;
  processJson?: (json: { [k: string]: any }[]) => { [k: string]: any }[];
}) => {
  if (!json || !json.length) {
    throw new Error('missing csvResults');
  }

  // example processJson purpose
  // go through each key and escape single quotes

  if (processJson) {
    json = processJson(json);
  }

  try {
    for (let i = 0; i < json.length; i++) {
      const t = json[i];
      const keys = Object.keys(t);

      const query = `INSERT INTO ${sqlTable} (${keys.join(',')}) VALUES (${keys.map((key) => {
        if (t[key] === null) {
          return null;
        }
        return `'${t[key]}'`;
      })});`;

      console.log('\n', query);

      try {
        const insertResult = await sqlConnection.query(query);

        console.log('insertResult:', insertResult);
      } catch (err) {
        console.error('i:', i, ', err:', err);
      }
    }
  } catch (err) {
    console.error('err:', err);
  }
};
