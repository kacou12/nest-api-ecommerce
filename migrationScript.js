const { execSync } = require('child_process');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  'Migration type: \n 1- Generate (g) \n 2- Create (c) \n 3- Run (r) \n',
  (type) => {
    if (!['g', 'c', 'r'].includes(type)) {
      console.log('Invalid option');
      return readline.close();
    }
    if (type === 'r') {
      execSync(
        'yarn typeorm migration:run -- -d ./src/common/utils/typeorm.ts',
      );
      return readline.close();
    }
    readline.question('Migration name: \n', (nameMigration) => {
      let migrationString = null;
      if (type === 'g') {
        migrationString = `yarn typeorm -- -d ./src/common/utils/typeorm.ts migration:generate ./src/migrations/${nameMigration}`;
      } else if (type === 'c') {
        migrationString = `yarn typeorm -- migration:create ./src/migrations/${nameMigration}`;
      }
      execSync(migrationString);

      readline.close();
    });
  },
);
