const servicesContainer = document.querySelector(
  '[data-id="main__content__container"]'
);
const nextBtn = document.querySelector("[data-id='next__btn']");
const prevBtn = document.querySelector("[data-id='prev__btn']");
const alert = document.querySelector("[data-id='alert']");

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "service-1.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "service-2.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 3,
    name: "Check up",
    image: "service-3.png",
    duration: "1 hour 12 minutes",
    price: 140.0,
  },
];

let selectedServiceId = null;
let selectedServiceName = "";
let selectedServicePrice = null;
let isServiceSelected = false;

const selectedServiceData = JSON.parse(localStorage.getItem("service"));

function displayServiceItems() {
  let displayItem = services.map((service) => {
    if (selectedServiceData) {
      isItemSelected = true;
    }

    return `<div id=${service.id} class="main__content__item ${
      selectedServiceData
        ? selectedServiceData[0] === service.id && "service--active"
        : ""
    }" data-id="item">
    <div class="main__content__item__left">
      <img
        src=../public/assets/${service.image}
        alt=${service.name}
        class="main__content__item__left__img"
      />
      <div class="main__content__item__left__info">
        <h2 class="main__content__item__left__info__name">
          ${service.name}
        </h2>
        <p class="main__content__item__left__info__time">${service.duration}</p>
      </div>
    </div>
    <div class="main__content__item__right">
      <span class="main__content__item__right__price">${service.price}$</span>
    </div>
  </div>`;
  });

  displayItem = displayItem.join("");
  servicesContainer.innerHTML = displayItem;
}

displayServiceItems();

const serviceItems = document.querySelectorAll("[data-id='item']");

function dissappearAlert() {
  setTimeout(() => {
    alert.style.visibility = "hidden";
  }, 2000);
}

function switchBetweenPages(href) {
  location.href = href;
}

function removeAllActiveClasses() {
  serviceItems.forEach((serviceItem) => {
    serviceItem.classList.remove("service--active");
  });
}

function selectServiceItem() {
  serviceItems.forEach((serviceItem) => {
    serviceItem.addEventListener("click", () => {
      removeAllActiveClasses();

      localStorage.removeItem("date");

      serviceItem.classList.add("service--active");
      selectedServiceId = Number(serviceItem.id);

      services.forEach((serviceItem) => {
        if (serviceItem.id === selectedServiceId) {
          selectedServiceName = serviceItem.name;
          selectedServicePrice = serviceItem.price;
        }
      });

      isServiceSelected = true;
    });
  });
}
selectServiceItem();

function switchNextPage() {
  const selectedServiceArray = [
    selectedServiceId,
    selectedServiceName,
    selectedServicePrice,
  ];
  if (selectedServiceId) {
    localStorage.setItem("service", JSON.stringify(selectedServiceArray));
  }
  switchBetweenPages("../pages/date.html");
}

nextBtn.addEventListener("click", () => {
  if (!isServiceSelected) {
    alert.style.visibility = "visible";
    dissappearAlert();
  } else {
    switchNextPage();
  }
});

prevBtn.addEventListener("click", () => {
  switchBetweenPages("../pages/staff.html");
});
