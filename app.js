// Accessed all the dom elements :
const filterOptions = document.querySelectorAll(".option");
const foodItemsContainer = document.querySelector(".foodItems");
const foodItems = document.querySelectorAll(".items");
const itemPrice = document.querySelectorAll(".price");
const orderBtn = document.querySelectorAll(".orderBtn");
const orderHeading = document.querySelectorAll(".des-heading");
const cart = document.querySelector(".cart");
const cartLogo = document.querySelector(".cartLogo");
const addFood = document.querySelector(".addFood");
const foodDialog = document.querySelector(".addCustomItem");
const dialogWrapper = document.querySelector(".wrapper");
const foodNameInput = document.querySelector("#text");
const descriptionInput = document.querySelector("#textarea");
const imageInput = document.querySelector('input[type="file"]');
const setPriceInput = document.querySelector("#setPrice");
const dialogSubmitBtn = document.querySelector("#submit");
const dialogCancelBtn = document.querySelector("#cancel");
const removeItemDialog = document.querySelector(".removeItem");
const removeItemWrapper = document.querySelector("#wrapper");
const removeFoodItemBtn = document.querySelector(".removeFoodItemBtn");
const removeItemText = document.querySelector("#removeItemText");
const removeBtn = document.querySelector(".removeBtn");
const removeCancelBtn = document.querySelector(".removeCancelBtn");
const categorySelect = document.querySelector("#categorySelect");


// food category nodelist to array converion :
const filterOptionsArray = Array.from(filterOptions);
const foodItemArray = Array.from(foodItems);

// function to hide all food items :
function hideAllItems() {
  foodItemArray.forEach((item) => {
    item.classList.add("displayNone");
  });
}

// function to show food items according to category :
function showItemsByCategory(category) {
  foodItemArray.forEach((item) => {
    const itemCategory = item.getAttribute("aria-valuetext");
    if (itemCategory === category || category === "all")
      item.classList.remove("displayNone");
  });
}

filterOptionsArray.forEach((option) => {
  option.addEventListener("click", () => {
    hideAllItems();
    switch (option) {
      case filterOptionsArray[0]:
        showItemsByCategory("all");
        // console.log("All was clicked!");
        break;
      case filterOptionsArray[1]:
        showItemsByCategory("starter");
        // console.log("starters was clicked!");
        break;
      case filterOptionsArray[2]:
        showItemsByCategory("breakfast");
        // console.log("Breakfast was clicked!");
        break;
      case filterOptionsArray[3]:
        showItemsByCategory("lunch");
        // console.log("Lunch was clicked!");
        break;
      case filterOptionsArray[4]:
        showItemsByCategory("shakes");
        // console.log("Shakes was clicked!");
        break;
      case filterOptionsArray[5]:
        showItemsByCategory("lunch");
        // console.log("Dinner was clicked!");
        break;
      default:
        break;
    }
  });
});

// orderHeading array :
const orderHeadingArray = Array.from(orderHeading);

// Add to order and update localstorage :
function addOrder(orderedDish) {
  orderHeadingArray.forEach((order) => {
    const orderName = order.getAttribute("aria-valuetext");
    if (orderName === orderedDish) {
      alert(`${orderedDish} was ordered successfully!`);
      localStorage.setItem(orderedDish, "ordered");
    }
  });
}

// price nodelist to array :
const itemPriceArray = Array.from(itemPrice);
// Calculate Bill :
function calculateBill() {
  let total = 0;
  itemPriceArray.forEach((priceElement) => {
    const itemName = priceElement.getAttribute("data-name");
    if (localStorage.getItem(itemName)) {
      const price =
        parseFloat(priceElement.getAttribute("aria-valuetext")) || 0;
      total += price;
    }
  });
  return total;
}

// Order count tracking element creation :
let btnCount = 0;
const showCount = document.createElement("p");
showCount.style.color = "#fff";
cartLogo.appendChild(showCount);
const orderCount = () => {
  btnCount++;
  console.log(btnCount);
  showCount.textContent = `${btnCount}`;
};

// total bill element creation :
const totalBill = document.createElement("span");
totalBill.style.color = "#fff";
totalBill.style.marginLeft = "1rem";

// Order button functionality :
orderBtn.forEach((button, index) => {
  const dishNames = [
    "Buttermilk Pancakes",
    "Chicken Tikka",
    "Paneer Tikka Masala",
    "Chicken Biriyani",
    "Dosa",
    "Manchurian",
    "Pav Bhaji",
    "MilkShake",
  ];

  button.addEventListener("click", () => {
    addOrder(dishNames[index]);
    const bill = calculateBill();
    console.log(`Total Bill : ${bill}`);

    // show total bill on webpage :
    totalBill.innerText = `Total Bill : ${bill}`;
    cart.appendChild(totalBill);

    let buttonclick = button;
    if (buttonclick) {
      orderCount();
    }
  });
});

// On cart hover appears a text called cart in it :
const cartText = document.createElement("span");
cartText.textContent = "Cart";
cartLogo.addEventListener("mouseover", () => {
  cartLogo.prepend(cartText);
});
cartLogo.addEventListener("mouseout", () => {
  cartLogo.removeChild(cartText);
});

// Toggle dialog :
let addBtnClick = true;
addFood.addEventListener("click", () => {
  if (addBtnClick) {
    foodDialog.showModal();
    addBtnClick = false;
  } else {
    foodDialog.close();
    addBtnClick = true;
  }
});

// Load saved custom items on page load :
function loadCustomItems() {
  const storedItems = JSON.parse(localStorage.getItem("customItems")) || [];

  storedItems.forEach((item) => {
    const newItem = document.createElement("div");
    newItem.className = "items";
    newItem.setAttribute("aria-valuetext", item.category);

    newItem.innerHTML = `
        <div class="bg-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="description">
            <h2 class="des-heading" aria-valuetext="${item.name}">
            ${item.name.toUpperCase()}
                <span
                  class="price"
                  aria-valuetext="${item.price}"
                  data-name="${item.name}"
                  >&#8377;${item.price}
                </span>
            </h2>
            <p>
              ${item.description}
            </p>
            <div class="order">
              <button class="orderBtn">Order</button>
            </div>    
        </div>
    `;

    const heading = newItem.querySelector(".des-heading");
    const priceElement = newItem.querySelector(".price");
    const newOrderBtn = newItem.querySelector(".orderBtn");

    orderHeadingArray.push(heading);
    itemPriceArray.push(priceElement);

    // Add order functionality to new button :
    newOrderBtn.addEventListener("click", () => {
      addOrder(item.name);
      const bill = calculateBill();
      totalBill.innerText = `Total Bill : ₹${bill}`;
      cart.appendChild(totalBill);
      orderCount();
    });

    foodItemsContainer.appendChild(newItem);
  });
}
loadCustomItems();

// Dialog Submit :
dialogSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const foodName = foodNameInput.value.trim();
  const description = descriptionInput.value.trim();
  const file = imageInput.files[0];
  const foodPrice = setPriceInput.value.trim();
  const category = categorySelect.value.trim();

  if (!foodName || !description || !file || !foodPrice) {
    alert("Please fill all fields and upload image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const newItem = document.createElement("div");
    newItem.className = "items";
    newItem.setAttribute("aria-valuetext", category);

    newItem.innerHTML = `
      <div class="bg-img">
        <img src="${reader.result}" alt="${foodName}" />
      </div>
      <div class="description">
        <h2 class="des-heading" aria-valuetext="${foodName}">
          ${foodName.toUpperCase()}
          <span class="price" aria-valuetext="${foodPrice}" data-name="${foodName}">₹${foodPrice}</span>
        </h2>
        <p>${description}</p>
        <div class="order">
          <button class="orderBtn">Order</button>
        </div>
      </div>
    `;

    const heading = newItem.querySelector(".des-heading");
    const priceElement = newItem.querySelector(".price");
    const newOrderBtn = newItem.querySelector(".orderBtn");

    orderHeadingArray.push(heading);
    itemPriceArray.push(priceElement);
    foodItemsContainer.appendChild(newItem);
    foodItemArray.push(newItem);

    newOrderBtn.addEventListener("click", () => {
      addOrder(foodName);
      const bill = calculateBill();
      totalBill.innerText = `Total Bill : ₹${bill}`;
      cart.appendChild(totalBill);
      orderCount();
    });

    foodItemsContainer.appendChild(newItem);
    foodDialog.close();
    addBtnClick = true;

    // Save to localStorage
    const storedItems = JSON.parse(localStorage.getItem("customItems")) || [];
    storedItems.push({
      name: foodName,
      description : description,
      image: reader.result,
      price: foodPrice,
      category: category,
    });
    localStorage.setItem("customItems", JSON.stringify(storedItems));

    // Reset fields
    foodNameInput.value = "";
    descriptionInput.value = "";
    imageInput.value = "";
    setPriceInput.value = "";
  };

  reader.readAsDataURL(file);
});

dialogCancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  foodDialog.close();
  addBtnClick = true;

  // Reset fields :
  foodNameInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";
  setPriceInput.value = "";
});

// Close dialog when clicking outside :
foodDialog.addEventListener("click", (e) => {
  if (!dialogWrapper.contains(e.target)) {
    foodDialog.close();
  }
});

removeItemDialog.addEventListener("click", (e) => {
  if (!removeItemWrapper.contains(e.target)) {
    removeItemDialog.close();
  }
});

removeFoodItemBtn.addEventListener("click", () => {
  removeItemDialog.showModal();
});

// Remove Food item from Food Menu :
removeBtn.addEventListener("click", () => {
  const foodHeading = removeItemText.value.trim();

  if (!foodHeading) {
    alert("Please Enter Food Item Name.");
    return;
  }

  let found = false;

  // Remove from DOM and Array :
  const allItems = document.querySelectorAll(".items");
  allItems.forEach((item) => {
    const heading = item.querySelector(".des-heading");
    const itemName = heading?.getAttribute("aria-valuetext");

    if ((itemName && itemName.toLowerCase() === foodHeading.toLowerCase())) {
      item.remove();
      found = true;

      // Remove from localstorage if it's a custom item :
      let storedItems = JSON.parse(localStorage.getItem("customItems")) || [];
      storedItems = storedItems.filter(
        (obj) => obj.name.toLowerCase() !== foodHeading.toLowerCase()
      );
      localStorage.setItem("customItems", JSON.stringify(storedItems));

      localStorage.removeItem(itemName);

      console.log(`copmpairing : ${itemName}, with ${foodHeading}`);
    }
  });

  if (!found) {
    alert("Item not found");
  } else {
    alert(`${foodHeading} removed successfully.`);
  }

  removeItemText.value = "";
  removeItemDialog.close();
});
removeCancelBtn.addEventListener("click" ,() => {
  removeItemDialog.close();
})

// Removes all the localStorage data whenever page is reloaded :
// const navigationEntries = window.performance.getEntriesByType("navigation");
// if (navigationEntries.length > 0) {
//   const navigationType = navigationEntries[0].type;

//   if (navigationType === "reload") {
//     localStorage.clear();
//   } else {
//     console.log("page was not reloaded");
//   }
// }
