const DocInsertFunctions = require('./DocumentInsertionFunction');
const CheckableKeywords = require('../api/CheckableKeywords/CheckableKeywords.model');
const Documents = require('../api/Documents/Documents.model');
const DocumentsWords = require('../api/DocumentsWords/DocumentsWords.model');
const Words = require('../api/Words/Words.model');
const separators = require('../constants/separators');
const { asyncForEach } = require('./DocumentInsertionFunction');
const { translateQuery } = require('./translation');

async function requestFormatter(QueryData) {
  const QBuilderData = [];
  await DocInsertFunctions.asyncForEach(QueryData, async (element) => {
    if (element.rowPosition !== 0 && element.Keywords !== '') {
      const Qelement = {
        row: Number(element.row),
        rowPosition: Number(element.rowPosition),
        SearchSelector: element.SearchSelector,
        SearchType: element.SearchType,
        Keywords: element.Keywords,
      };
      QBuilderData.push(Qelement);
    } else if (element.SearchType === 'CheckedKeyword') {
      const keywordId = Number(element.Keywords);
      const CKeyword = await CheckableKeywords
        .query()
        .select('keyword')
        .where('id', keywordId)
        .where('deleted_at', null)
        .first();
      if (CKeyword) {
        const Qelement = {
          row: 0,
          rowPosition: 0,
          SearchSelector: 'et',
          SearchType: 'Expression exacte',
          Keywords: CKeyword.keyword,
        };
        QBuilderData.push(Qelement);
      }
    } // else nothing
    return true;
  });
  return QBuilderData;
}

async function searchForTitle(keywords) {
  let words = keywords.toLowerCase().split(new RegExp(separators.join('|'), 'g'));
  words = words.filter((word) => (word !== ''));

  const docResults = [];
  await DocInsertFunctions.asyncForEach(words, async (keyword) => {
    const docs = await Documents
      .query()
      .select('id', 'title', 'url')
      .where('title', 'like', '%'.concat(keyword).concat('%'))
      .where('deleted_at', null);
    docs.forEach((doc) => {
      if (docResults.length === 0) {
        docResults.push({
          hits: 1,
          document: doc,
        });
      } else {
        const Index = docResults.findIndex((d) => d.document.id === doc.id);
        if (Index === -1) {
          docResults.push({
            hits: 1,
            document: doc,
          });
        } else {
          docResults.find((d) => d.document.id === doc.id).hits += 1;
        }
      }
    });
  });
  if (docResults) return docResults;
  return [];
}
async function SearchForUnDesMots(keywords) {
  let words = keywords.toLowerCase().split(new RegExp(separators.join('|'), 'g'));
  words = words.filter((word) => (word !== ''));

  const docResults = [];
  await DocInsertFunctions.asyncForEach(words, async (keyword) => {
    const docs = await Words
      .query()
      .select('d.id', 'd.title', 'd.url')
      .join('documentsWords as dw', 'words.id', 'dw.word_id')
      .join('documents as d', 'd.id', 'dw.document_id')
      .where('words.word', keyword);

    docs.forEach((doc) => {
      if (docResults.length === 0) {
        docResults.push({
          hits: 1,
          document: doc,
        });
      } else {
        const Index = docResults.findIndex((d) => d.document.id === doc.id);
        if (Index === -1) {
          docResults.push({
            hits: 1,
            document: doc,
          });
        } else {
          docResults.find((d) => d.document.id === doc.id).hits += 1;
        }
      }
    });
  });
  if (docResults) return docResults;
  return [];
}
async function SearchForTousLesMots(keywords) {
  let FinalResults = [];
  let docResults = [];
  let firstword = true;

  let words = keywords.toLowerCase().split(new RegExp(separators.join('|'), 'g'));
  words = words.filter((word) => (word !== ''));

  await DocInsertFunctions.asyncForEach(words, async (keyword) => {
    const docs = await Words
      .query()
      .select('d.id', 'd.title', 'd.url')
      .join('documentsWords as dw', 'words.id', 'dw.word_id')
      .join('documents as d', 'd.id', 'dw.document_id')
      .where('words.word', keyword);
    if (firstword) {
      docs.forEach((doc) => {
        const found = FinalResults.find((d) => d.document.id === doc.id);
        if (!found) {
          FinalResults.push({
            hits: 1,
            document: doc,
          });
        } else {
          found.hits += 1;
        }
      });
      firstword = false;
    } else {
      docResults = FinalResults;
      FinalResults = [];
      docs.forEach((doc) => {
        const found = docResults.find((d) => d.document.id === doc.id);
        if (found) {
          found.hits += 1;
          FinalResults.push(found);
        }
      });
    }
  });
  if (FinalResults) return FinalResults;
  return [];
}
async function SearchForExpressionExacte(keywords) {
  const SelectedFiles = [];
  const FinalResults = [];
  let wordNotFound = false;

  let words = keywords.toLowerCase().split(new RegExp(separators.join('|'), 'g'));
  words = words.filter((word) => (word !== ''));

  let dBWordsId = [];
  await DocInsertFunctions.asyncForEach(words, async (keyword) => {
    if (!wordNotFound) {
      const word = await Words.query()
        .select('id', 'word')
        .where('word', keyword);
      if (word !== []) dBWordsId.push(word);
      else {
        wordNotFound = true;
      }
    }
  });
  if (wordNotFound) return [];
  wordNotFound = false;

  const firstKeyword = dBWordsId.slice(0, 1)[0][0];
  if (!firstKeyword) return FinalResults;
  dBWordsId = dBWordsId.filter((e) => e[0].id !== firstKeyword.id);

  const docWordResults = await DocumentsWords.query()
    .select('id', 'document_id', 'word_id', 'next_id')
    .where('word_id', firstKeyword.id);

  await asyncForEach(docWordResults, async (doc) => {
    let nextId = doc.next_id;
    await asyncForEach(dBWordsId, async (keyword) => {
      if (!wordNotFound && nextId !== 0) {
        const nextline = await DocumentsWords.query()
          .select('id', 'document_id', 'word_id', 'next_id')
          .where('word_id', keyword[0].id)
          .andWhere('id', nextId)
          .first();
        if (nextline) {
          nextId = nextline.next_id;
        } else wordNotFound = true;
      }
    });
    if (!wordNotFound) SelectedFiles.push(doc);
    wordNotFound = false;
  });
  await DocInsertFunctions.asyncForEach(SelectedFiles, async (doc) => {
    const document = await Documents.query()
      .select('id', 'title', 'url')
      .where('id', doc.document_id)
      .first();
    const found = FinalResults.find((d) => d.document.id === document.id);
    if (!found) {
      FinalResults.push({
        hits: 1,
        document,
      });
    } else {
      found.hits += 1;
    }
  });
  if (FinalResults) return FinalResults;
  return [];
}
async function getRowQueryResults(row) {
  let res = '';
  switch (row.SearchType) {
    case 'Titre':
      res = await searchForTitle(row.Keywords);
      break;

    case 'Expression exacte':
      res = await SearchForExpressionExacte(row.Keywords);
      break;

    case 'Tous les mots':
      res = await SearchForTousLesMots(row.Keywords);
      break;

    case 'Un des mots':
      res = await SearchForUnDesMots(row.Keywords);
      break;

    default:
      res = [];
      break;
  }
  return res;
}

function MultiQueriesAggregation(QueryA, QueryB) {
  if (!QueryA) return QueryB;
  if (!QueryB) return QueryA;
  if (QueryB) {
    QueryB.finalResults.forEach((doc) => {
      const found = QueryA.finalResults.find((d) => d.document.id === doc.document.id);
      if (found) {
        found.hits += doc.hits;
      } else {
        QueryA.finalResults.push(doc);
      }
    });
    QueryB.exeptFinalResults.forEach((doc) => {
      const found = QueryA.exeptFinalResults.find((d) => d.document.id === doc.document.id);
      if (!found) {
        QueryA.exeptFinalResults.push(doc);
      }
    });
  }
  return QueryA;
}

function orAggregation(RowResults, NextRowResults) {
  if (!RowResults) return NextRowResults;
  if (NextRowResults) {
    NextRowResults.forEach((doc) => {
      const found = RowResults.find((d) => d.document.id === doc.document.id);
      if (found) {
        found.hits += doc.hits;
      } else {
        RowResults.push(doc);
      }
    });
  }
  return RowResults;
}

function andAggregation(RowResults, NextRowResults) {
  if (!RowResults) return NextRowResults;
  const FinalResults = [];
  if (NextRowResults.finalResults) {
    NextRowResults.finalResults.forEach((doc) => {
      const found = RowResults.finalResults.find((d) => d.document.id === doc.document.id);
      if (found) {
        found.hits += doc.hits;
        FinalResults.push(found);
      }
    });
  }
  // eslint-disable-next-line no-param-reassign
  RowResults.finalResults = FinalResults;
  if (NextRowResults.exeptFinalResults) {
    NextRowResults.exeptFinalResults.forEach((doc) => {
      const found = RowResults.exeptFinalResults.find((d) => d.document.id === doc.document.id);
      if (!found) {
        RowResults.exeptFinalResults.push(found);
      }
    });
  }
  return RowResults;
}
function exeptAggregation(RowResults, NextRowResults) {
  if (!RowResults) return NextRowResults;
  if (NextRowResults.exeptFinalResults) {
    NextRowResults.exeptFinalResults.forEach((doc) => {
      const found = RowResults.exeptFinalResults.find((d) => d.document.id === doc.document.id);
      if (!found) {
        RowResults.exeptFinalResults.push(doc);
      }
    });
  }
  if (NextRowResults.finalResults && NextRowResults.finalResults.length > 0) {
    NextRowResults.finalResults.forEach((doc) => {
      const found = RowResults.finalResults.find((d) => d.document.id === doc.document.id);
      if (!found) {
        RowResults.finalResults.push(found);
      }
    });
  }
  return RowResults;
}
async function getAgregatedResults(query, index) {
  const RowResults = {
    finalResults: [],
    exeptFinalResults: [],
  };

  const Qrow = query[index];
  let nextQrow = query[index + 1];

  if (Qrow.SearchSelector === 'ou' || !nextQrow) {
    if (Qrow.SearchSelector === 'sauf') {
      RowResults.exeptFinalResults = await getRowQueryResults(Qrow);
    } else {
      RowResults.finalResults = await getRowQueryResults(Qrow);
    }
    return RowResults;
  } // downward : Not 'or' and not last row

  let NextRowResults = await getAgregatedResults(query, index + 1);

  if (Qrow.SearchSelector === 'sauf') RowResults.exeptFinalResults = await getRowQueryResults(Qrow);
  else RowResults.finalResults = await getRowQueryResults(Qrow);

  let i = 1;
  let nQSS = nextQrow.SearchSelector;
  while (nQSS === 'ou') { // agregate results and move to next line
    if (Qrow.SearchSelector === 'sauf') {
      RowResults.exeptFinalResults = orAggregation(
        RowResults.exeptFinalResults,
        NextRowResults.finalResults,
      );
    } else {
      RowResults.finalResults = orAggregation(
        RowResults.finalResults,
        NextRowResults.finalResults,
      );
    }
    nextQrow = query[index + 1 + i];
    if (nextQrow) {
      // eslint-disable-next-line no-await-in-loop
      NextRowResults = await getAgregatedResults(query, index + 1 + i);
      nQSS = nextQrow.SearchSelector;
    } else break;
    i += 1;
  }
  if (!nextQrow) {
    return RowResults;
  } // downward : Next row is Not 'or' and exists

  if (nQSS === 'et') {
    return andAggregation(RowResults, NextRowResults);
  }
  if (nQSS === 'sauf') {
    return exeptAggregation(RowResults, NextRowResults);
  }

  return RowResults;
}

async function searchdB(query) {
  let documents = {
    finalResults: [],
    exeptFinalResults: [],
  };
  if (query.length > 0) documents = await getAgregatedResults(query, 0);
  if (documents.exeptFinalResults
    && documents.exeptFinalResults.length > 0) {
    documents.exeptFinalResults.forEach((doc) => {
      documents.finalResults = documents
        .finalResults
        .filter((d) => d.document.id !== doc.document.id);
    });
  }
  return documents.finalResults;
}

async function searchdBInAllLanguages(query, language) {
  let documents = {
    finalResults: [],
    exeptFinalResults: [],
  };
  let finalDocuments = {
    finalResults: [],
    exeptFinalResults: [],
  };
  if (query.length === 0) return null;

  // Translate the query to all languages
  // const translatedQueries = [query];
  const translatedQueries = await translateQuery(query, language);

  // loop through each language's query
  await asyncForEach(translatedQueries, async (tquery) => {
    documents = await getAgregatedResults(tquery, 0);
    finalDocuments = await MultiQueriesAggregation(finalDocuments, documents);
  });
  console.log('documents before exeptions: ', finalDocuments.finalResults);
  if (finalDocuments.exeptFinalResults
    && finalDocuments.exeptFinalResults.length > 0) {
    finalDocuments.exeptFinalResults.forEach((doc) => {
      finalDocuments.finalResults = finalDocuments
        .finalResults
        .filter((d) => d.document.id !== doc.document.id);
    });
  }
  console.log('documents after exeptions: ', finalDocuments.finalResults);
  return finalDocuments.finalResults;
}
module.exports = {
  searchdB,
  searchdBInAllLanguages,
  requestFormatter,
};
