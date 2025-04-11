# csvToMsSql

The `csvToMsSql` utility provides a function to insert records from a CSV file into a Microsoft SQL Server table. It is designed to handle data transformation, key removal, and value replacement during the insertion process.

## Features

- Reads data from a CSV file.
- Transforms and processes data before insertion.
- Supports key removal and value replacement.
- Handles null string conversions.
- Inserts data into a specified SQL Server table.

## Usage

You can use the `insertCSVToMSSQL` function to insert data from a CSV file into a SQL Server table. Below is an example of how to use it.

### Example Usage

```ts
import { insertCSVToMSSQL } from 'dev-utils/lib/csvToMsSql';
import csv from 'csv-parser';
import sql from 'mssql';

const sqlConnection = await sql.connect({
  user: 'yourUsername',
  password: 'yourPassword',
  server: 'yourServer',
  database: 'yourDatabase',
});

const csvFilePath = './path/to/your/file.csv';
const sqlTable = 'yourTableName';

await insertCSVToMSSQL({
  csvFilePath,
  csvParser: csv,
  sqlConnection,
  sqlTable,
  options: {
    allowNullStrings: false,
    removeKeys: ['unnecessaryKey'],
    replaceKeyValues: {
      status: (value) => (value === 'active' ? 'active' : 'inactive'),
      comments: null,
    },
  },
});
```

### Parameters

The `insertCSVToMSSQL` function accepts the following parameters:

- **csvFilePath**: The path to the CSV file.
- **csvParser**: A CSV parser library (e.g., `csv-parser`).
- **sqlConnection**: An active SQL Server connection.
- **sqlTable**: The name of the SQL Server table to insert data into.
- **options**:
  - `allowNullStrings` (boolean): If `true`, strings with the value `"null"` will not be converted to `null`.
  - `removeKeys` (string[]): An array of keys to remove from the data before insertion.
  - `replaceKeyValues` (object): A mapping of keys to replacement values or transformation functions.

### Example CSV File

Here is an example of a CSV file that can be used with this utility:

```csv
id,name,status,comments
1,John Doe,active,Great employee
2,Jane Smith,inactive,null
3,Bob Johnson,active,null
```

### Example SQL Table

The corresponding SQL table might look like this:

```sql
CREATE TABLE yourTableName (
  id INT,
  name NVARCHAR(255),
  status NVARCHAR(50),
  comments NVARCHAR(MAX)
);
```

## Error Handling

The utility includes error handling for:

- Missing or invalid CSV data.
- SQL query execution errors.
- Invalid or missing configuration options.

Errors are logged to the console for debugging purposes.
