const openModalHandler = async () => {
  const response = await fetch(
    "https://cicccmidterm-default-rtdb.firebaseio.com/items.json"
  );
  const data = await response.json();
  let results = [];
  for (const key in data) {
    data[key].id = key;
    results.push(data[key]);
  }
  const modalElement = document.createElement("div");
  modalElement.classList.add("modal");
  // modalElement.insertAdjacentHTML("beforeend", link);

  results.map((result) => {
    const innerElement = document.createElement("div");
    innerElement.innerHTML = `
    <h2>${result.title}</h2>
    <div class="inModal">
    <ul><li><img src=${result.image} alt=${result.title}/></li></ul>
    </div>
    `;
    innerElement.classList.add("inner");
    modalElement.appendChild(innerElement);
  });
  modalElement.insertAdjacentHTML(
    "beforeend",
    `<div id="modal" class="closeModal">×</div> <a class="link" href="./cart.html">See All</a><p class="items">Items: ${results.length}</p>`
  );
  document.body.appendChild(modalElement);
  modalElement.addEventListener("click", () => {
    closeModalWindow(modalElement);
  });
};

document
  .querySelector("#new-modal")
  .addEventListener("click", openModalHandler);

function closeModalWindow(modalElement) {
  document.body.removeChild(modalElement);
}
