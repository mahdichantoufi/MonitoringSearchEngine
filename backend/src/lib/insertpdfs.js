// TODO : Add a callable script that calls this function
// on all PDF's found on the new_files directory
const fs = require('fs');
const DocInsertFunctions = require('../../src/lib/DocumentInsertionFunction');
const knex = require('./../db');

// directory path
const dir = 'Files/PDFs_to_insert/';

// list all files in the directory
const filesToInsert = [];
fs.readdir(dir, async (err, files) => {
  if (err) {
    throw err;
  }

  // files object contains all files names
  // log them on console
  await files.forEach((file) => {
    if (file.endsWith('.txt')) {
      const filename = file.replace('.txt', '');
      const pdffile = file.replace('.txt', '.pdf');
      if (files.indexOf(pdffile) !== -1) {
        filesToInsert.push(filename);
      }
    }
  });
  console.log(filesToInsert);
  DocInsertFunctions.asyncForEach(filesToInsert, async (elmt) => {
    await DocInsertFunctions.insertDocumentIntoDB(knex, elmt);
  });
});
