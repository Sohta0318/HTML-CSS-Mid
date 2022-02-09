const cartList = document.querySelector(".cartWrap");
let sT = 0;
const fetchProducts = async () => {
  const response = await fetch(
    "https://cicccmidterm-default-rtdb.firebaseio.com/items.json"
  );
  const data = await response.json();
  let results = [];
  for (const key in data) {
    data[key].id = key;
    results.push(data[key]);
  }

  // console.log(results);

  results.map((product) => {
    const list = document.createElement("li");
    const infoWrap = document.createElement("div");
    const cartSection = document.createElement("div");
    const prodTotal = document.createElement("div");
    const remove = document.createElement("div");
    const image = document.createElement("img");
    const itemsWrapper = document.createElement("p");
    const items = document.createElement("input");
    const subTotal = document.querySelector(".subTotal");
    const total = document.querySelector(".total");
    const detail = `<h3>${product.title}</h3>`;
    sT += product.price;
    subTotal.innerHTML = `$${sT}.00`;
    total.innerHTML = `$${sT + 5 + 4}.00`;
    items.className = "qty";
    items.setAttribute("type", "text");
    items.setAttribute("placeholder", 1);
    itemsWrapper.innerText = "Items:  ";
    itemsWrapper.appendChild(items);
    list.className = "items odd";
    list.setAttribute("id", product.id);
    infoWrap.className = "infoWrap";
    cartSection.className = "cartSection";
    // cartSection.innerHTML = '<p class="stockStatus">In Stock</p>';
    prodTotal.className = "prodTotal cartSection";

    remove.className = "cartSection removeWrap";
    image.setAttribute("src", product.image);
    image.className = "itemImg";
    prodTotal.innerHTML = `<p>$${+product.price}</p>`;
    cartSection.innerHTML = detail;
    cartSection.appendChild(itemsWrapper);

    remove.innerHTML = `<a  class="remove">
    x
  </a>`;

    cartSection.appendChild(image);
    infoWrap.appendChild(cartSection);
    infoWrap.appendChild(prodTotal);
    infoWrap.appendChild(remove);
    list.appendChild(infoWrap);
    cartList.insertAdjacentElement("beforeend", list);

    items.addEventListener("change", (e) => {
      const value = e.target.value;
      prodTotal.innerHTML = `<p>$${value * +product.price}</p>`;
      //needs to be fixed
      // subTotal.innerHTML = `$${sT + (sT - value * +product.price)}.00`;
      // total.innerHTML = `$${sT + (value - 1) * +product.price + 5 + 4}.00`;
    });

    remove.addEventListener("click", async () => {
      try {
        await fetch(
          `https://cicccmidterm-default-rtdb.firebaseio.com/items/${product.id}.json`,
          {
            method: "DELETE",
          }
        );
        document.location.reload(true);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

fetchProducts();
