const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const targetPath = `./src/environments/environment.cloud.ts`;

const environmentFileContent = `
    export const environment = {
        production: true,
        apiUrl: "${process.env.API_URL}"
    };
`;

console.log(`API_URL: ${process.env.API_URL}`);

writeFile(targetPath, environmentFileContent, (err) => {
   if (err) { console.log(err); }
   console.log(`Wrote variables to ${targetPath}`);
});
