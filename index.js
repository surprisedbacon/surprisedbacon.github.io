
const domReady = () => {
  console.log("dom is ready");
  let name = document.getElementById("user");

  const hiButton = document.getElementById("hi");
  hiButton.addEventListener("click", () => {
    setTimeout(() => {
      let capName = name.value
      capName = capName[0].toUpperCase() + capName.slice(1);
      alert(`Hi ${capName}!`);
    }, 1000)
  });  
}

function bruhFunction () {
    const bruhDiv = document.getElementById('bruhdiv');
    bruhDiv.innerHTML = bruhDiv.innerHTML + "Bruh. "
  }

function wowFunction () {
  const body = document.getElementById('body').style;
  if (body['background-color'] === "palegoldenrod") {
    body['background-color'] = '#1f1f1f';
    body.color = 'ivory';;;;;;;
  } else {
    body['background-color'] = "palegoldenrod";
    body.color = 'black';
  }
}