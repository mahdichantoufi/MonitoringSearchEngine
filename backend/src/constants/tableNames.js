module.exports = {
  Words: {
    mydBName: 'words',
    id: 'id',
    word: 'word',
  }, // Tous les mots de notre base de données
  Documents: {
    mydBName: 'documents',
    id: 'id',
    title: 'title',
    url: 'url',
  }, // Tous les documents et leurs descriptions(titre,url,...)
  DocumentsTitleWordsRelations: {
    mydBName: 'documentsTitleWords',
    id: 'id',
    document_id: 'document_id',
    word_id: 'word_id',
    next_id: 'next_id',
  }, // Quel mot est dans quel titre de document?
  DocumentsWordsRelations: {
    mydBName: 'documentsWords',
    id: 'id',
    document_id: 'document_id',
    word_id: 'word_id',
    next_id: 'next_id',
  }, // Quel mot est dans quel document?
  CheckableKeywordsCategories: {
    mydBName: 'checkableKeywordsCategories',
    id: 'id',
    name: 'name',
  },
  CheckableKeywords: {
    mydBName: 'checkableKeywords',
    id: 'id',
    keyword: 'keyword',
    Category_id: 'Category_id',
  },
};
