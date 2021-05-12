/**
 * Requests all categories from API
 */
async function getAllCategories() {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CKCategories/');
    let categories = await response.json();
    return categories;
  } catch (error) {
    throw error;
  }
}
/**
 * Requests keyword with ID from dB
 * @param {Number} id : dB ID of a keywod
 */
async function getKeywordsByCategoryId(id) {
  try {
    let response = await fetch('http://localhost:5050/api/v1/CheckableKeywords/categoryId/'.concat(id));
    let keywords = await response.json();
    return keywords;
  } catch (error) {
    throw error;
  }
}
async function setCategorysContent(catId, form){
  try {
    const CategoriesContentElmt = document.getElementById('myTabContent');

    const CatdivElmt = document.createElement('div');
    CatdivElmt.classList.add('tab-pane');
    CatdivElmt.classList.add('fade');
    CatdivElmt.setAttribute("id", 'C'.concat(catId));

    if (!form){
      const ButtonsdivElmt = document.createElement('div');
      ButtonsdivElmt.classList.add('form-check');

      let buttonElmt = createAddKeywordButtonElement(catId);
      ButtonsdivElmt.appendChild(buttonElmt);
      
      CatdivElmt.appendChild(ButtonsdivElmt);
      CatdivElmt.appendChild(document.createElement('br'));
    }
    const CatFormdivElmt = document.createElement('div');
    CatFormdivElmt.classList.add('form-check');
    
    CatdivElmt.appendChild(CatFormdivElmt);
    CategoriesContentElmt.appendChild(CatdivElmt);

    let keywords = await getKeywordsByCategoryId(catId);
    if (keywords.length) {
      keywords.forEach( (keyword) => {
        const keyworddivElmt = addKeywordToCategoryTabContent(form, keyword);
        CatFormdivElmt.appendChild(keyworddivElmt);
      });
    } else {
      const noKeyworddivElmt = document.createElement('h1');
      noKeyworddivElmt.textContent = 'No keywords for this category in dB';
      CatFormdivElmt.appendChild(noKeyworddivElmt);
    }
  } catch (error) {
    console.error(error);
  }
}

function addKeywordToCategoryTabContent(form, keyword) {
  const keyworddivElmt = document.createElement('div');
  keyworddivElmt.classList.add('column');
  keyworddivElmt.classList.add('checkbox');

  if (form) {
    const inputElmt = createInputElement(keyword);
    keyworddivElmt.appendChild(inputElmt);

    const labelElmt = createLabelElement(keyword);
    keyworddivElmt.appendChild(labelElmt);
  } else {
    const buttonElmt = createUpdateButtonElement(keyword);
    keyworddivElmt.appendChild(buttonElmt);
  }
  return keyworddivElmt;
}

function createUpdateButtonElement(keyword) {
  const buttonElmt = document.createElement('button');
  buttonElmt.classList.add('btn');
  buttonElmt.classList.add('btn-secondary');
  buttonElmt.setAttribute("type", 'button');
  buttonElmt.setAttribute("onClick", 'setSelectedKeywordForUpdate('.concat(keyword.id).concat(')'));
  buttonElmt.innerText = keyword.keyword;
  return buttonElmt;
}
function createAddKeywordButtonElement(catId) {
  const buttonElmt = document.createElement('button');
  buttonElmt.classList.add('btn');
  buttonElmt.classList.add('btn-primary');
  buttonElmt.setAttribute("type", 'button');
  buttonElmt.setAttribute("onClick", 'selectKeywordAddForSelectedCategoryId('.concat(catId).concat(')'));
  buttonElmt.innerText = 'Ajouter un mot-clé';
  return buttonElmt;
}

function createInputElement(keyword) {
  const inputElmt = document.createElement('input');
  inputElmt.classList.add('form-check-input');
  inputElmt.setAttribute("type", 'checkbox');
  inputElmt.setAttribute("name", "CheckableKeyword");
  inputElmt.setAttribute("id", keyword.id);
  inputElmt.setAttribute("value", keyword.id);
  return inputElmt;
}

function createLabelElement(keyword) {
  const labelElmt = document.createElement('label');
  labelElmt.classList.add('form-check-label');
  labelElmt.setAttribute("for", keyword.id);
  labelElmt.innerHTML = keyword.keyword;
  return labelElmt;
}

async function setAllCategoriesTitles(categories) {
  // const CategoriesTitlesElmt = document.getElementById('myTabTitle');
  const form = document.querySelector('form');
  const CategoriesTitlesElmt = form.getElementsByClassName('nav-tabs')[0];
  CategoriesTitlesElmt.innerHTML = '';
  
  categories.forEach((cat) => {
    const liElmt = document.createElement('li');
    liElmt.classList.add('nav-item')
    
    const aElmt = document.createElement('a');
    aElmt.classList.add('nav-link')
    aElmt.setAttribute("data-toggle", 'tab');
    aElmt.setAttribute("href", '#C'.concat(cat.id));
    aElmt.innerHTML = cat.name.toUpperCase();
    
    const spanElmt = document.createElement('a');
    spanElmt.setAttribute("id", 'C'.concat(cat.id.toString()).concat('_selected'));

    liElmt.appendChild(aElmt);
    liElmt.appendChild(spanElmt);
    CategoriesTitlesElmt.appendChild(liElmt);
  })
}
async function setKeywordsCategories(form = true) {
  let categories = await getAllCategories();
  await setAllCategoriesTitles(categories);

  const CategoriesContentElmt = document.getElementById('myTabContent');
  CategoriesContentElmt.innerHTML = '';
  categories.forEach((cat) => {
    try {
      return setCategorysContent(cat.id, form);
    } finally {
      return;
    }
  });
}

function showKeywords(){
  const ulElmt = document.getElementsByTagName('ul')[1];
  const liElmt = ulElmt.getElementsByTagName('li')[0];
  const activeElmt = liElmt.querySelector('.nav-link');
  activeElmt.classList.add('active');
  const tabContentElmt = document.querySelector('.tab-content');
  const firstElmt = tabContentElmt.firstChild;
  firstElmt.classList.add('show');
  firstElmt.classList.add('active');
}