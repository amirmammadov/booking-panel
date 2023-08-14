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

const getElement = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

const staffItemsContainer = getElement('[data-id="main__content__container"]');
const nextBtn = getElement("[data-id='next__btn']");
const alert = getElement("[data-id='alert']");

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
let isStaffItemSelected = false;

const selectedStaffData = JSON.parse(localStorage.getItem("staff"));

function dissappearAlert() {
  setTimeout(() => {
    alert.style.visibility = "hidden";
  }, 2000);
}

function switchBetweenPages(href) {
  location.href = href;
}

function renderStaffItem(staff) {
  const isActive = selectedStaffData && selectedStaffData[0] === staff.id;
  const activeClass = isActive ? "staff--active" : "";

  return `<div id=${staff.id} class="main__content__item ${activeClass}" data-id="item">
    <img
      src=../public/assets/${staff.image}
      alt=${staff.name}
      class="main__content__item__img"
    />
    <div class="main__content__item__info">
      <h2 class="main__content__item__info__name">${staff.name}</h2>
      <p class="main__content__item__info__mail">
      ${staff.email}
      </p>
    </div>
  </div>`;
}

function displayStaffItems() {
  if (selectedStaffData) {
    isStaffItemSelected = true;
  }
  const displayItems = staff.map(renderStaffItem).join("");
  staffItemsContainer.innerHTML = displayItems;
}
displayStaffItems();

const staffItems = getElements("[data-id='item']");

function removeAllActiveClasses() {
  staffItems.forEach((item) => {
    item.classList.remove("staff--active");
  });
}

function selectStaffItem() {
  staffItems.forEach((staffItem) => {
    staffItem.addEventListener("click", () => {
      removeAllActiveClasses();

      localStorage.removeItem("service");

      staffItem.classList.add("staff--active");
      selectedStaffId = Number(staffItem.id);

      staff.forEach((staffItem) => {
        if (staffItem.id === selectedStaffId) {
          selectedStaffName = staffItem.name;
        }
      });

      isStaffItemSelected = true;
    });
  });
}
selectStaffItem();

function switchNextPage() {
  const selectedStaffArray = [selectedStaffId, selectedStaffName];
  if (selectedStaffId) {
    localStorage.setItem("staff", JSON.stringify(selectedStaffArray));
  }
  switchBetweenPages("../pages/services.html");
}

nextBtn.addEventListener("click", () => {
  if (!isStaffItemSelected) {
    alert.style.visibility = "visible";
    dissappearAlert();
  } else {
    switchNextPage();
  }
});
