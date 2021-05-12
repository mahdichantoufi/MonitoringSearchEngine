let QueryData = {
  Language: '',
  Data: [],
};
const rowDivElmt = form.getElementsByClassName('searchRows')[0];

form.addEventListener('change', () => {
  QueryData.Data = [];
  QueryData.Language = form.getElementsByClassName('language')[0].value;
  for (var c = 1; c <= rowDivElmt.childElementCount; c++) {
    if (rowDivElmt.childNodes[c]) {
      let row = rowDivElmt.childNodes[c].className.replace(/row criteria_/g,'');
      let keywords = document.querySelector('#keywords_'.concat(row));
      if (keywords.value !== '') {
        let SearchSelector = (c==1 ? null : document.querySelector('#criteriaType_'.concat(row)).value);
        let SearchType = document.querySelector('#searchType_'.concat(row)).value;
        QueryData.Data.push({
          row,
          rowPosition: c,
          SearchSelector,
          SearchType,
          Keywords: keywords.value,
        });
      }
    }
  }

  const checkboxes = document.getElementsByName("CheckableKeyword");
  const selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked==true);
  selectedCboxes.forEach(Cbox => {
    let SearchType = 'CheckedKeyword';
    let Keywords = Cbox.value;
    QueryData.Data.push({
      row: 0, // may be deleted if unused for form rebuild
      rowPosition: 0, // may be deleted if unused for form rebuild
      SearchSelector: null,
      SearchType,
      Keywords,
    });
  });

  let StringQueryData = JSON.stringify(Object.assign({}, QueryData));
  let JsonQueryData = JSON.parse(StringQueryData);
  console.log(JsonQueryData);

}, false);
