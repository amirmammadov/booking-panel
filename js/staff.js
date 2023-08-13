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

const staffItemsContainer = document.querySelector(
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

function displayStaffItems() {
  let displayItem = staff.map((person) => {
    if (selectedStaffData) {
      isStaffItemSelected = true;
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
  staffItemsContainer.innerHTML = displayItem;
}
displayStaffItems();

const staffItems = document.querySelectorAll("[data-id='item']");

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
