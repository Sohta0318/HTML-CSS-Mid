const wrapper = document.querySelector(".grid");
let sendTo = [];

const loadData = async () => {
  const response = await fetch("../sample.json");
  const data = await response.json();
  const result = data.testData;
  console.log(result);
  // return data;
  result.map((menu) => {
    const eachContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    const button = document.createElement("button");
    button.className = "button-1";
    button.innerText = "Add to cart";
    eachContainer.setAttribute("id", menu.id);
    eachContainer.classList.add("item");
    image.setAttribute("src", menu.imageURL);
    title.innerText = menu.title;
    eachContainer.appendChild(image);
    eachContainer.appendChild(title);
    eachContainer.appendChild(button);
    wrapper.insertAdjacentElement("beforeend", eachContainer);

    button.addEventListener("click", async () => {
      const menu_id = menu.id;
      const sendItem = result.filter((item) => item.id === menu_id);
      // console.log(sendItem[0]);

      try {
        await fetch(
          "https://cicccmidterm-default-rtdb.firebaseio.com/items.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: sendItem[0].title,
              price: sendItem[0].price,
              image: sendItem[0].imageURL,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  });
};

loadData();
