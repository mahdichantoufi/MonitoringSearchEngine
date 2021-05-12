const form = document.querySelector('#form');
// your function
var formSubmited = async function(event) {
  event.preventDefault();
  let res = APICall();
};
form.addEventListener("submit", formSubmited, true);


async function APICall() {
  const pdffile = document.getElementById('myFile');
  const textfile = document.getElementById('myFileText');
  const formPayload = new FormData();
  formPayload.append('pdffile', pdffile);
  formPayload.append("textfile", textfile.nodeValue);
  try {
    // var xhr = new XMLHttpRequest();
    // xhr.open('PUT', 'http://localhost:5050/api/v1/Documents/', true);  
    // xhr.send(formPayload);

    let response = await fetch('http://localhost:5050/api/v1/Documents/', {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data'
      },
      method: 'PUT',
      data: formPayload
    });
    return false;
  } catch (error) {
    throw (error);
  }
}