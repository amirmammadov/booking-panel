const inputs = document.querySelectorAll('[data-id="detail__input"]');
const prevBtn = document.querySelector("[data-id='prev__btn']");
const confirmBtn = document.querySelector("[data-id='confirm__btn']");
const okModal = document.querySelector('[data-id="ok__modal"]');
const errorModal = document.querySelector('[data-id="error__modal"]');
const okModalBtn = document.querySelector('[data-id="ok__modal__btn"]');
const errorModalBtn = document.querySelector('[data-id="error__modal__btn"]');
const notesContainer = document.querySelector('[data-id="notes__container"]');

function getFormElements() {
  return {
    firstName: document.querySelector("#firstName"),
    lastName: document.querySelector("#lastName"),
    mail: document.querySelector("#mail"),
    phone: document.querySelector("#phone"),
  };
}

function getSavedDataFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function removeAllStorage() {
  localStorage.removeItem("staff");
  localStorage.removeItem("service");
  localStorage.removeItem("date");
}

const selectedStaffData = getSavedDataFromStorage("staff");
const selectedServiceData = getSavedDataFromStorage("service");
const selectedDateData = getSavedDataFromStorage("date");

function switchBetweenPages(href) {
  location.href = href;
}

function createOutputData() {
  const { firstName, lastName, mail, phone } = getFormElements();

  const reservationInfo = {
    staff_id: selectedStaffData[0],
    service_id: selectedServiceData[0],
    date: selectedDateData[0],
    time: selectedDateData[1].split("-")[0],
    customer: {
      name: firstName.value,
      surname: lastName.value,
      email: mail.value,
      phone: phone.value,
    },
  };

  localStorage.setItem("logData", JSON.stringify(reservationInfo));
}

function displaySelectedValues() {
  let displayItem = `<div class="main__content__notes__info__item">
  <div class="main__content__notes__info__item__key">Staff:</div>
  <div class="main__content__notes__info__item__value">
    ${selectedStaffData[1]}
  </div>
</div>
<div class="main__content__notes__info__item">
  <div class="main__content__notes__info__item__key">
    Service:
  </div>
  <div class="main__content__notes__info__item__value">
    ${selectedServiceData[1]}
  </div>
</div>
<div class="main__content__notes__info__item">
  <div class="main__content__notes__info__item__key">Date:</div>
  <div class="main__content__notes__info__item__value">
    ${selectedDateData[0]} / ${selectedDateData[1]}
  </div>
</div>
<div class="main__content__notes__info__item">
  <div class="main__content__notes__info__item__key">Price:</div>
  <div class="main__content__notes__info__item__value">
    <span>$${selectedServiceData[2]}</span>
  </div>
</div>`;

  notesContainer.innerHTML = displayItem;
}
displaySelectedValues();

function makeConfirmation() {
  okModal.style.display = "block";

  createOutputData();

  inputs.forEach((input) => {
    input.value = "";
  });

  setTimeout(() => {
    removeAllStorage();
    switchBetweenPages("../pages/staff.html");
  }, 2000);
}

confirmBtn.addEventListener("click", () => {
  let unfilledInputs = 0;

  inputs.forEach((input) => {
    if (!input.value) {
      unfilledInputs++;
    }
  });

  if (unfilledInputs === 0) {
    makeConfirmation();
  } else {
    errorModal.style.display = "block";
  }
});

prevBtn.addEventListener("click", () => {
  switchBetweenPages("../pages/date.html");
});

errorModalBtn.addEventListener("click", () => {
  errorModal.style.display = "none";
});

okModalBtn.addEventListener("click", () => {
  okModal.style.display = "none";
});
