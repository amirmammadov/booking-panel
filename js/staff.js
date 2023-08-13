function removeLogDataStorage() {
  document.addEventListener("DOMContentLoaded", function () {
    let storedLogData = localStorage.getItem("logData");

    if (storedLogData) {
      console.log(JSON.parse(storedLogData));
      localStorage.removeItem("logData");
    }
  });
}
removeLogDataStorage();

const itemsContainer = document.querySelector(
  '[data-id="main__content__container"]'
);
const nextBtn = document.querySelector("[data-id='next__btn']");
const alert = document.querySelector("[data-id='alert']");

const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "staff-1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "staff-2.png",
  },
];

let selectedStaffId = null;
let selectedStaffName = "";
let isItemSelected = false;

const selectedStaffData = JSON.parse(localStorage.getItem("staff"));

function dissappearAlert() {
  setTimeout(() => {
    alert.style.visibility = "hidden";
  }, 2000);
}

function switchBetweenPages(href) {
  location.href = href;
}

function displayStaffItems() {
  let displayItem = staff.map((person) => {
    if (selectedStaffData) {
      isItemSelected = true;
    }

    return `<div id=${person.id} class="main__content__item ${
      selectedStaffData
        ? selectedStaffData[0] === person.id && "staff--active"
        : ""
    }" data-id="item">
      <img
        src=../public/assets/${person.image}
        alt=${person.name}
        class="main__content__item__img"
      />
      <div class="main__content__item__info">
        <h2 class="main__content__item__info__name">${person.name}</h2>
        <p class="main__content__item__info__mail">
        ${person.email}
        </p>
      </div>
    </div>`;
  });

  displayItem = displayItem.join("");
  itemsContainer.innerHTML = displayItem;
}
displayStaffItems();

const items = document.querySelectorAll("[data-id='item']");

function selectStaffItem() {
  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((item) => {
        item.classList.remove("staff--active");
      });

      localStorage.removeItem("service");

      item.classList.add("staff--active");
      selectedStaffId = Number(item.id);

      staff.forEach((staffItem) => {
        if (staffItem.id === selectedStaffId) {
          selectedStaffName = staffItem.name;
        }
      });

      isItemSelected = true;
    });
  });
}
selectStaffItem();

nextBtn.addEventListener("click", () => {
  if (!isItemSelected) {
    alert.style.visibility = "visible";
    dissappearAlert();
  } else {
    const selectedStaffArray = [selectedStaffId, selectedStaffName];
    if (selectedStaffId) {
      localStorage.setItem("staff", JSON.stringify(selectedStaffArray));
    }
    switchBetweenPages("../pages/services.html");
  }
});
