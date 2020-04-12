
const domReady = () => {
  console.log("dom is ready");

  document.getElementById("hi").addEventListener("click", () => setTimeout(() => alert('hello'), 1000));


}
