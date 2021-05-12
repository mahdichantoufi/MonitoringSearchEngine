var formData = null;
// your form
const form = document.querySelector('#form');
// your function
var formSubmited = async function(event) {
  event.preventDefault();
  let MatchingDocuments = await requestResultsFromAPI();
  serveResults(MatchingDocuments);
};
form.addEventListener("submit", formSubmited, true);

async function requestResultsFromAPI() {
  let MatchingDocuments = await SearchCall();
  return MatchingDocuments;
}
function serveResults(MatchingDocuments){
  const ResultSpan = document.getElementById('ResultSpan');
  
  if(!MatchingDocuments){
    ResultSpan.innerHTML = '<h5 class="mb-1">Aucun document ne correspond à votre recherche !</h5>';
    return false;
  }

  ResultSpan.innerHTML = '<h5 class="mb-1">Documents correspondants à votre recherche :</h5>';
  for (let i = 0; i < MatchingDocuments.length; i++) {
    const matchingDoc = MatchingDocuments[i];
    const Gdiv = document.createElement('a');
    Gdiv.classList.add(
      'list-group-item', 'list-group-item-action', 
      'flex-column', 'align-items-start'
    );
    if (i % 2 === 0) Gdiv.classList.add('active');
    ResultSpan.appendChild(Gdiv);
  
    const div = document.createElement('div');
    div.classList.add('d-flex', 'w-100', 'justify-content-between');
    
    const apdf = document.createElement('a')
    apdf.setAttribute('href', '/backend/'+matchingDoc.document.url);
    apdf.setAttribute('target', '_blank' );
    const pdfbutton = document.createElement('button');
    pdfbutton.innerText = 'PDF';
    apdf.appendChild(pdfbutton);
    div.appendChild(apdf);    
    
    let txtpath = matchingDoc.document.url;
    txtpath = txtpath.replace('.pdf','.txt')
    txtpath = txtpath.replace('Original_PDFs','Converted_PDFs')
    const atxt = document.createElement('a')
    atxt.setAttribute('href', '/backend/' + txtpath );
    atxt.setAttribute('target', '_blank' );
    const txtbutton = document.createElement('button');
    txtbutton.innerText = 'txt version';
    atxt.appendChild(txtbutton);
    div.appendChild(atxt);
    
    Gdiv.appendChild(div);
    const header = document.createElement('div');
    header.classList.add('mb-1');
    header.textContent = matchingDoc.document.title;
    div.appendChild(header);
    const small = document.createElement('div');
    small.textContent = 'Hits : '.concat(matchingDoc.hits);
    div.appendChild(small);
  }
  
  ResultSpan.scrollIntoView();

}

function resetResultSpan(){
  const ResultSpan = document.getElementById('ResultSpan');
  ResultSpan.innerHTML = '';
}
//API call
async function SearchCall() {
  try {
    let response = await fetch('http://localhost:5050/api/v1/Search/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(QueryData),
    })
    let MatchingDocuments = await response.json();
    if (MatchingDocuments.length > 0) {
      return MatchingDocuments;
    }
    console.log('no documents found');
    return false;
  } catch (error) {
    throw (error);
  }
}
