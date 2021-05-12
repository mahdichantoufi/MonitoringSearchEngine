/**
 * Sets the first tab content of categories to "show" and sets "active" where need be
 */
async function showKeywordsWithCategories() {
  try {
    await setKeywordsCategories(false);
    showKeywords();
  } catch (error) {
    console.error(error);
  }
}
showKeywordsWithCategories();

function setUpdateButtons(CardBodyDiv) {
  const updateButton = document.createElement('button');
  updateButton.classList.add('btn');
  updateButton.classList.add('btn-success');
  updateButton.setAttribute("type", 'button');
  updateButton.setAttribute("onClick", 'updateselectedkeyword()');
  updateButton.innerText = 'Modifier';
  CardBodyDiv.appendChild(updateButton);
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn');
  deleteButton.classList.add('btn-danger');
  deleteButton.setAttribute("type", 'button');
  deleteButton.setAttribute("onClick", 'deleteselectedkeyword()');
  deleteButton.innerText = 'Supprimer';
  CardBodyDiv.appendChild(deleteButton);
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('btn');
  cancelButton.classList.add('btn-primary');
  cancelButton.setAttribute("type", 'button');
  cancelButton.setAttribute("onClick", 'cancel()');
  cancelButton.innerText = 'Annuler';
  CardBodyDiv.appendChild(cancelButton);
}

function setAddButtons(CardBodyDiv) {
  const updateButton = document.createElement('button');
  updateButton.classList.add('btn');
  updateButton.classList.add('btn-success');
  updateButton.setAttribute("type", 'button');
  updateButton.setAttribute("onClick", 'addEnteredkeyword()');
  updateButton.innerText = 'Ajouter';
  CardBodyDiv.appendChild(updateButton);
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('btn');
  cancelButton.classList.add('btn-primary');
  cancelButton.setAttribute("type", 'button');
  cancelButton.setAttribute("onClick", 'cancel()');
  cancelButton.innerText = 'Annuler';
  CardBodyDiv.appendChild(cancelButton);
}

function setCategoriesDropDown(categories, categoryId = null) {
  const categoriesDropDown = document.createElement('select');
  categoriesDropDown.required = true;
  categoriesDropDown.classList.add('form-control');
  categoriesDropDown.setAttribute('name', 'updatedCategory');
  categoriesDropDown.setAttribute('id', 'updatedCategory');
  const isNullCategory = (categoryId === null);

  categories.forEach(cat => {
    const categoriesOtpion = document.createElement('option');
    categoriesOtpion.setAttribute('value', cat.id);
    if (!isNullCategory && categoryId === cat.id) {
      categoriesOtpion.selected = true;
    }
    categoriesOtpion.textContent = cat.name;
    categoriesDropDown.appendChild(categoriesOtpion);
  });
  return categoriesDropDown;
}

async function setSelectedKeywordForUpdate(keyword_id) {
  let keyword = await getKeywordById(keyword_id);
  let categories = await getAllCategories();
  let category;
  categories.forEach((element) => {
    if (element.id === keyword.Category_id) {
      category = element;
    }
  });
  setkeywordInUpdateSpan(keyword_id, keyword, category, categories);
}

function setkeywordInUpdateSpan(keyword_id, keyword, category, categories) {
  const updateSpan = document.getElementById('KeywordManagementSpan');
  updateSpan.innerHTML = '';

  const CardDiv = document.createElement('div');
  CardDiv.classList.add('card');
  CardDiv.classList.add('bg-secondary');
  CardDiv.classList.add('mb-3');
  CardDiv.setAttribute('style', 'max-width: 20rem;');
  updateSpan.appendChild(CardDiv);

  const CardHeaderDiv = document.createElement('div');
  CardHeaderDiv.classList.add('card-header');
  CardHeaderDiv.textContent = 'Modifier le mot-clé';
  CardDiv.appendChild(CardHeaderDiv);

  const CardBodyDiv = document.createElement('div');
  CardBodyDiv.classList.add('card-body');
  CardDiv.appendChild(CardBodyDiv);

  const keywordId = document.createElement('input');
  keywordId.setAttribute('type', 'hidden');
  keywordId.setAttribute('name', 'id');
  keywordId.setAttribute('id', 'id');
  keywordId.setAttribute('value', keyword_id);
  CardBodyDiv.appendChild(keywordId);

  const keywordLabel = document.createElement('label');
  keywordLabel.classList.add('col-form-label');
  keywordLabel.setAttribute('for', 'updatedKeyword');
  keywordLabel.textContent = 'De "'.concat(keyword.keyword).concat('" à:');
  CardBodyDiv.appendChild(keywordLabel);
  CardBodyDiv.appendChild(document.createElement('br'));

  const keywordText = document.createElement('input');
  keywordText.setAttribute('name', 'updatedKeyword');
  keywordText.setAttribute('id', 'updatedKeyword');
  keywordText.setAttribute('value', keyword.keyword);
  keywordText.required = true;
  CardBodyDiv.appendChild(keywordText);
  CardBodyDiv.appendChild(document.createElement('br'));

  const categoryLabel = document.createElement('label');
  categoryLabel.classList.add('col-form-label');
  categoryLabel.setAttribute('for', 'updatedCategory');
  categoryLabel.textContent = 'Appartenant à la catégorie "'.concat(category.name).concat('". Modifier:');
  CardBodyDiv.appendChild(categoryLabel);
  CardBodyDiv.appendChild(document.createElement('br'));

  const categoriesDropDown = setCategoriesDropDown(categories, category.id);
  CardBodyDiv.appendChild(categoriesDropDown);

  setUpdateButtons(CardBodyDiv);

  let helpPElmt = document.createElement('p');
  helpPElmt.classList.add('text-success');
  helpPElmt.textContent = 'Le mot-clé et sa catégorie seront modifiés!';
  CardBodyDiv.appendChild(helpPElmt);

  helpPElmt = document.createElement('p');
  helpPElmt.classList.add('text-danger');
  helpPElmt.textContent = 'Le mot-clé sera supprimé ! Vous pourrez toujours l\'insérer de nouveau.';
  CardBodyDiv.appendChild(helpPElmt);
}
async function updateselectedkeyword() {
  const updateSpan = document.getElementById('KeywordManagementSpan');
  const id = updateSpan.querySelector('#id').value;
  const updatedKeyword = updateSpan.querySelector('#updatedKeyword').value;
  const updatedCategory = updateSpan.querySelector('#updatedCategory').value;

  const keyword = {
    id,
    keyword: updatedKeyword,
    Category_id: updatedCategory,
  }
  await addKeyword(keyword);
  showKeywordsWithCategories();
}
async function deleteselectedkeyword() {
  const updateSpan = document.getElementById('KeywordManagementSpan');
  const id = updateSpan.querySelector('#id').value;
  const keyword = await deleteKeywordById(id);
  showKeywordsWithCategories();
}
async function cancel() {
  const updateSpan = document.getElementById('KeywordManagementSpan');
  updateSpan.innerHTML = '';
}

async function selectKeywordAddForSelectedCategoryId(catId) {
  let categories = await getAllCategories();
  resetAddKeywordSpan(catId, categories);
}
async function resetAddKeywordSpan(catId, categories) {
  const addSpan = document.getElementById('KeywordManagementSpan');
  addSpan.innerHTML = '';

  const CardDiv = document.createElement('div');
  CardDiv.classList.add('card');
  CardDiv.classList.add('bg-secondary');
  CardDiv.classList.add('mb-3');
  CardDiv.setAttribute('style', 'max-width: 20rem;');
  addSpan.appendChild(CardDiv);

  const CardHeaderDiv = document.createElement('div');
  CardHeaderDiv.classList.add('card-header');
  CardHeaderDiv.textContent = 'Ajouter un mot-clé';
  CardDiv.appendChild(CardHeaderDiv);

  const CardBodyDiv = document.createElement('div');
  CardBodyDiv.classList.add('card-body');
  CardDiv.appendChild(CardBodyDiv);

  const keywordLabel = document.createElement('label');
  keywordLabel.classList.add('col-form-label');
  keywordLabel.setAttribute('for', 'updatedKeyword');
  keywordLabel.textContent = 'mot-clé';
  CardBodyDiv.appendChild(keywordLabel);
  CardBodyDiv.appendChild(document.createElement('br'));

  const keywordText = document.createElement('input');
  keywordText.setAttribute('name', 'updatedKeyword');
  keywordText.setAttribute('id', 'updatedKeyword');
  keywordText.setAttribute('value', 'mot-clé');
  keywordText.required = true;
  CardBodyDiv.appendChild(keywordText);
  CardBodyDiv.appendChild(document.createElement('br'));

  const categoryLabel = document.createElement('label');
  categoryLabel.classList.add('col-form-label');
  categoryLabel.setAttribute('for', 'updatedCategory');
  categoryLabel.textContent = 'Catégorie';
  CardBodyDiv.appendChild(categoryLabel);
  CardBodyDiv.appendChild(document.createElement('br'));

  const categoriesDropDown = setCategoriesDropDown(categories, catId);
  CardBodyDiv.appendChild(categoriesDropDown);

  setAddButtons(CardBodyDiv);
  const helpPElmt = document.createElement('p');
  helpPElmt.classList.add('text-success');
  helpPElmt.textContent = 'Si le mot-clé existe, sa catégories sera modifiée.';
  CardBodyDiv.appendChild(helpPElmt);
}
async function addEnteredkeyword() {
  const addSpan = document.getElementById('KeywordManagementSpan');
  const addedKeyword = addSpan.querySelector('#updatedKeyword').value;
  const addedCategory = addSpan.querySelector('#updatedCategory').value;
  const cardDivElmt = addSpan.querySelector('.card');

  const keyword = {
    keyword: addedKeyword,
    Category_id: addedCategory,
  }
  try {
    const insertedk = await addKeyword(keyword);
    cardDivElmt.classList.remove('bg-secondary');
    cardDivElmt.classList.add('bg-success');
  } catch (error) {
    cardDivElmt.classList.remove('bg-secondary');
    cardDivElmt.classList.add('bg-primary');
    alert('Oups something went wrong ...');
  }
  showKeywordsWithCategories();
}

// API calls
/**
 * Requests keyword with ID from dB
 * @param {Number} id : dB ID of a keywod
 */
async function getKeywordById(id) {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CheckableKeywords/id/'.concat(id));
    let keyword = await response.json();
    return keyword;
  } catch (error) {
    throw error;
  }
}
/**
 * deletes keyword with ID in dB
 * @param {Number} id : dB ID of a keywod
 */
async function deleteKeywordById(id) {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CheckableKeywords/delete/'.concat(id), {
      method: 'DELETE'
    });
    let keyword = await response.json();
    return keyword;
  } catch (error) {
    throw error;
  }
}
/**
 * Requests Add keyword to dB through API
 * @param {
 *          id: Number,
 *          keyword: string
 *          Category_id: Number
 *        } keyword : updated keyword structure
 */
async function addKeyword(keyword) {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CheckableKeywords/add/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(keyword),
    })
    let insertedKeyword = await response.json();
    return insertedKeyword;
  } catch (error) {
    throw error;
  }
}