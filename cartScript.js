const ordersContainer = document.querySelector(".ordersContainer");
const showBtn = document.querySelector(".btn");
showBtn.addEventListener("click", () => {
  showOrders();
});

function showOrders() {
  ordersContainer.innerHTML = "";
  let hasOrders = false;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (value === "ordered") {
      hasOrders = true;
      const order = document.createElement("span");
      order.textContent = key;
      order.style.display = "block";
      order.style.color = "#fff";
      ordersContainer.appendChild(order);
    }
  }
  if (!hasOrders) {
    const noOrderMsg = document.createElement("span");
    noOrderMsg.textContent = "There are no orders.";
    noOrderMsg.style.color = "#fff";
    ordersContainer.appendChild(noOrderMsg);
  }
}

const navigationEntries = window.performance.getEntriesByType("navigation");
if (navigationEntries.length > 0) {
  const navigationType = navigationEntries[0].type;

  if (navigationType === "reload") {
    localStorage.clear();
  } else {
    console.log("page was not reloaded");
  }
}
