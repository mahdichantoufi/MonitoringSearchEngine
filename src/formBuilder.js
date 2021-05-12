let rowsNumber = 1;

function addOptionsForFirstRow(){
  //Adding first search row options:
  const firstRow = document.getElementsByClassName('criteria_1')[0];
  const searchSelect = firstRow.getElementsByTagName('select')[0];
  fieldTypes.forEach(type => {
    const fieldType = document.createElement('option');
    fieldType.setAttribute('name', type);
    fieldType.textContent = type;
    searchSelect.appendChild(fieldType);
  });
}
/** Cette fonction ajoute une rangée de critères dans le formulaire tel que : (i : Id de la rangée crée)
    <div class="criteria_i row">
      <div class="column side">
        <select id="criteriaType_i" class="form-control"></select>
      </div>
      <div class="column middleleft">
        <select id="searchType_i" class="form-control"></select>
      </div>
      <div class="column middleright">
        <input class="form-control" id="keywords_i" type="text" placeholder="mots-clés">
      </div>
      <div class="column side">
        <button id="add_i" type="button" onclick="addRow(i)">+</button>
        <button id="delete_i" type="button" onclick="deleteRow(i)">-</button>
      </div>
    </div>
 * callerId (int) : identifiant de la rangée appelante pour placer à la suite
**/
function addRow(callerId){
  rowsNumber++;
  const form = document.querySelector('form');
  const rowDivElmt = form.getElementsByClassName('searchRows')[0];
  const rowDivElement = document.createElement('div');
  rowDivElement.classList.add('row');
  rowDivElement.classList.add('criteria_'.concat(rowsNumber));
  
  rowDivElement.appendChild(addOperandSelectors());
  rowDivElement.appendChild(addFieldSelectors());
  rowDivElement.appendChild(createKeywordInputDiv());
  rowDivElement.appendChild(createAddDeleteDiv());

  rowDivElmt.insertBefore(rowDivElement, rowDivElmt.childNodes[callerId+1]);
};
function deleteRow(callerId){
  const form = document.querySelector('form');
  const rowDivElmt = form.getElementsByClassName('searchRows')[0];
  const div = form.getElementsByClassName('criteria_'.concat(callerId))[0];
  rowDivElmt.removeChild(div);
};
function createAddDeleteDiv() {
  const ExtRightColDivElement = document.createElement('div');
  ExtRightColDivElement.classList.add('column');
  ExtRightColDivElement.classList.add('side');

  const addButton = document.createElement('button');
  addButton.setAttribute("id", 'add_'.concat(rowsNumber));
  addButton.setAttribute("name", 'add_'.concat(rowsNumber));
  addButton.setAttribute("type", 'button');
  addButton.setAttribute("onclick", 'addRow('.concat(rowsNumber).concat(')'));
  addButton.textContent = '+';

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute("id", 'delete_'.concat(rowsNumber));
  deleteButton.setAttribute("name", 'delete_'.concat(rowsNumber));
  deleteButton.setAttribute("type", 'button');
  deleteButton.setAttribute("onclick", 'deleteRow('.concat(rowsNumber).concat(')'));
  deleteButton.textContent = '-';

  ExtRightColDivElement.appendChild(addButton);
  ExtRightColDivElement.appendChild(deleteButton);
  return ExtRightColDivElement;
}
function createKeywordInputDiv(enteredKeywor = '') {
  const RightColDivElement = document.createElement('div');
  RightColDivElement.classList.add('column');
  RightColDivElement.classList.add('middleright');

  const keywordsSelect = document.createElement('input');
  keywordsSelect.classList.add('form-control');
  keywordsSelect.setAttribute("id", 'keywords_'.concat(rowsNumber));
  keywordsSelect.setAttribute("name", 'keywords_'.concat(rowsNumber));
  keywordsSelect.setAttribute("type", 'text');
  keywordsSelect.setAttribute("placeholder", 'mots-clés');
  keywordsSelect.value = enteredKeywor;
  RightColDivElement.appendChild(keywordsSelect);
  return RightColDivElement;
}
function addFieldSelectors(selectedType = null) {
  const searchSelect = document.createElement('select');
  searchSelect.setAttribute("name", 'searchType_'.concat(rowsNumber));
  searchSelect.setAttribute("id", 'searchType_'.concat(rowsNumber));
  searchSelect.setAttribute("class", 'form-control');
  fieldTypes.forEach(type => {
    const fieldType = document.createElement('option');
    fieldType.setAttribute('name', type);
    fieldType.setAttribute('value', type);
    fieldType.textContent = type;
    if(type === selectedType) fieldType.selected = true;
    searchSelect.appendChild(fieldType);
  });
  const middleColDivElement = document.createElement('div');
  middleColDivElement.classList.add('column');
  middleColDivElement.classList.add('middleleft');
  middleColDivElement.appendChild(searchSelect);
  return middleColDivElement;
}
function addOperandSelectors(selectedType = null) {
  const leftColDivElement = document.createElement('div');
  leftColDivElement.classList.add('column');
  leftColDivElement.classList.add('side');
  const typeSelect = document.createElement('select');
  typeSelect.setAttribute("id", 'criteriaType_'.concat(rowsNumber));
  typeSelect.setAttribute("name", 'criteriaType_'.concat(rowsNumber));
  typeSelect.setAttribute("class", 'form-control');

  searchTypes.forEach(type => {
    const searchType = document.createElement('option');
    searchType.setAttribute('name', type);
    searchType.setAttribute('value', type);
    searchType.textContent = type;
    if(type === selectedType) searchType.selected = true;
    typeSelect.appendChild(searchType);
  });

  leftColDivElement.appendChild(typeSelect);
  return leftColDivElement;
}

function addLanguageSelector(){
  let selectedType = true;
  const form = document.querySelector('form');
  const select = form.getElementsByClassName('language')[0];
  languages.forEach((lang) => {
    const langOpt = document.createElement('option');
    langOpt.setAttribute('name', lang);
    langOpt.setAttribute('value', lang);
    langOpt.textContent = lang;
    if(selectedType) {
      langOpt.selected = true;
      selectedType = false;
    }
    select.appendChild(langOpt);
  });
}
async function buildForm(){
  addLanguageSelector();
  addOptionsForFirstRow();
  addRow(rowsNumber);
  try {
    await setKeywordsCategories();
    showKeywords();
  } catch (error) {
    console.error(error);
  }
}
buildForm();
