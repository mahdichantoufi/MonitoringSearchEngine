var formSubmited = function(event) {
  event.preventDefault();
};
form.addEventListener("submit", formSubmited, true);

async function addCategoryName() {
  const updateSpan = document.getElementById('AddCategoryManagementSpan');
  const newName = updateSpan.querySelector('#name').value;
  const cat = {
    name: newName,
  }
  await addKeywordCategory(cat);
  showKeywordsWithCategories();
  setCategoryManagerSpan();
}
async function cancelCategory() {
  addCategoryManagerSpan();
}
async function updateWithCategoryId() {
  const updateSpan = document.getElementById('UpdateCategoryManagementSpan');
  const updatedname = updateSpan.querySelector('#updatedname').value;
  const updatedCategory = updateSpan.querySelector('#updatedCategory').value;

  const cat = {
    name: updatedname,
    id: updatedCategory,
  }
  await addKeywordCategory(cat);
  showKeywordsWithCategories();
  setCategoryManagerSpan();
}
async function deleteWithCategoryId() {
  const updateSpan = document.getElementById('UpdateCategoryManagementSpan');
  const id = updateSpan.querySelector('#updatedCategory').value;
  const keyword = await deleteKeywordCategoryById(id);
  showKeywordsWithCategories();
  setCategoryManagerSpan();
}

function createdeleteCategoryButtonElement() {
  const buttonElmt = document.createElement('button');
  buttonElmt.classList.add('btn');
  buttonElmt.classList.add('btn-danger');
  buttonElmt.setAttribute("type", 'button');
  buttonElmt.setAttribute("onClick", 'deleteWithCategoryId()');
  buttonElmt.innerText = 'Supprimer';
  return buttonElmt;
}
function createupdateCategoryButtonElement() {
  const buttonElmt = document.createElement('button');
  buttonElmt.classList.add('btn');
  buttonElmt.classList.add('btn-success');
  buttonElmt.setAttribute("type", 'button');
  buttonElmt.setAttribute("onClick", 'updateWithCategoryId()');
  buttonElmt.innerText = 'Modifier';
  return buttonElmt;
}
function createAddCategoryButtonElement() {
  const buttonElmt = document.createElement('button');
  buttonElmt.classList.add('btn');
  buttonElmt.classList.add('btn-success');
  buttonElmt.setAttribute("type", 'button');
  buttonElmt.setAttribute("onClick", 'addCategoryName()');
  buttonElmt.innerText = 'Ajouter';
  return buttonElmt;
}
function createCancelCategoryButtonElement() {
  const buttonElmt = document.createElement('button');
  buttonElmt.classList.add('btn');
  buttonElmt.classList.add('btn-primary');
  buttonElmt.setAttribute("type", 'button');
  buttonElmt.setAttribute("onClick", 'cancelCategory()');
  buttonElmt.innerText = 'Annuler';
  return buttonElmt;
}

async function addCategoryManagerSpan() {
  const updateSpan = document.getElementById('AddCategoryManagementSpan');
  updateSpan.innerHTML = '';

  const CardDiv = document.createElement('div');
  CardDiv.classList.add('card');
  CardDiv.classList.add('bg-secondary');
  CardDiv.classList.add('mb-3');
  CardDiv.setAttribute('style', 'max-width: 20rem;');
  updateSpan.appendChild(CardDiv);

  const CardHeaderDiv = document.createElement('div');
  CardHeaderDiv.classList.add('card-header');
  CardHeaderDiv.textContent = 'Ajouter une catégorie';
  CardDiv.appendChild(CardHeaderDiv);

  const CardBodyDiv = document.createElement('div');
  CardBodyDiv.classList.add('card-body');
  CardDiv.appendChild(CardBodyDiv);

  const CatNameLabel = document.createElement('label');
  CatNameLabel.classList.add('col-form-label');
  CatNameLabel.setAttribute('for', 'name');
  CatNameLabel.textContent = 'Nom de la catégorie : ';
  CardBodyDiv.appendChild(CatNameLabel);
  CardBodyDiv.appendChild(document.createElement('br'));

  const CatNameText = document.createElement('input');
  CatNameText.setAttribute('name', 'name');
  CatNameText.setAttribute('id', 'name');
  CatNameText.required = true;
  CardBodyDiv.appendChild(CatNameText);
  CardBodyDiv.appendChild(document.createElement('br'));
  CardBodyDiv.appendChild(document.createElement('br'));
  
  buttonElmt = createAddCategoryButtonElement();
  CardBodyDiv.appendChild(buttonElmt);

  buttonElmt = createCancelCategoryButtonElement();
  CardBodyDiv.appendChild(buttonElmt);
}
async function updateCategoryManagerSpan() {
  const updateSpan = document.getElementById('UpdateCategoryManagementSpan');
  updateSpan.innerHTML = '';

  const CardDiv = document.createElement('div');
  CardDiv.classList.add('card');
  CardDiv.classList.add('bg-secondary');
  CardDiv.classList.add('mb-3');
  CardDiv.setAttribute('style', 'max-width: 20rem;');
  updateSpan.appendChild(CardDiv);

  const CardHeaderDiv = document.createElement('div');
  CardHeaderDiv.classList.add('card-header');
  CardHeaderDiv.textContent = 'Modifier une catégorie';
  CardDiv.appendChild(CardHeaderDiv);

  const CardBodyDiv = document.createElement('div');
  CardBodyDiv.classList.add('card-body');
  CardDiv.appendChild(CardBodyDiv);

  let categories = await getAllCategories();
  const categoriesDropDown = setCategoriesDropDown(categories);
  CardBodyDiv.appendChild(categoriesDropDown);

  const CatNameLabel = document.createElement('label');
  CatNameLabel.classList.add('col-form-label');
  CatNameLabel.setAttribute('for', 'name');
  CatNameLabel.textContent = 'Modifier le nom : ';
  CardBodyDiv.appendChild(CatNameLabel);
  CardBodyDiv.appendChild(document.createElement('br'));

  const CatNameText = document.createElement('input');
  CatNameText.setAttribute('name', 'updatedname');
  CatNameText.setAttribute('id', 'updatedname');
  CatNameText.required = true;
  CardBodyDiv.appendChild(CatNameText);
  CardBodyDiv.appendChild(document.createElement('br'));
  CardBodyDiv.appendChild(document.createElement('br'));
  
  buttonElmt = createupdateCategoryButtonElement();
  CardBodyDiv.appendChild(buttonElmt);

  buttonElmt = createdeleteCategoryButtonElement();
  CardBodyDiv.appendChild(buttonElmt);
}
function setCategoryManagerSpan() {
  addCategoryManagerSpan();
  updateCategoryManagerSpan();
}
setCategoryManagerSpan();

// API calls
/**
 * deletes keyword category with ID in dB
 * @param {Number} id : dB ID of a keywod category
 */
async function deleteKeywordCategoryById(id) {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CKCategories/delete/'.concat(id), {
      method: 'DELETE'
    });
    let category = await response.json();
    return category;
  } catch (error) {
    throw error;
  }
}
/**
 * Requests Add keyword category to dB through API
 * @param {
 *          id: Number,
 *          name: string
 *        } category : updated category structure
 */
async function addKeywordCategory(category) {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CKCategories/add/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(category),
    })
    let insertedCategory = await response.json();
    return insertedCategory;
  } catch (error) {
    throw error;
  }
}
