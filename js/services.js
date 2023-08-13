const servicesContainer = document.querySelector(
  '[data-id="main__content__container"]'
);

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

let isItemSelected = false;
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

const items = document.querySelectorAll("[data-id='item']");
const nextBtn = document.querySelector("[data-id='next__btn']");
const prevBtn = document.querySelector("[data-id='prev__btn']");
const alert = document.querySelector("[data-id='alert']");

let serviceId = null;
let serviceName = "";
let servicePrice = 0;

function dissappearAlert() {
  setTimeout(() => {
    alert.style.visibility = "hidden";
  }, 2000);
}

function switchBetweenPages(href) {
  location.href = href;
}

items.forEach((item) => {
  item.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.remove("service--active");
    });

    localStorage.removeItem("date");

    item.classList.add("service--active");
    serviceId = Number(item.id);

    services.forEach((serviceItem) => {
      if (serviceItem.id === serviceId) {
        serviceName = serviceItem.name;
        servicePrice = serviceItem.price;
      }
    });

    isItemSelected = true;
  });
});

nextBtn.addEventListener("click", () => {
  if (!isItemSelected) {
    alert.style.visibility = "visible";
    dissappearAlert();
  } else {
    const selectedServiceArray = [serviceId, serviceName, servicePrice];
    if (serviceId) {
      localStorage.setItem("service", JSON.stringify(selectedServiceArray));
    }
    switchBetweenPages("../pages/date.html");
  }
});

prevBtn.addEventListener("click", () => {
  switchBetweenPages("../pages/staff.html");
});
