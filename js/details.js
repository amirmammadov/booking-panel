const inputs = document.querySelectorAll('[data-id="detail__input"]');
const prevBtn = document.querySelector("[data-id='prev__btn']");
const confirmBtn = document.querySelector("[data-id='confirm__btn']");
const okModal = document.querySelector('[data-id="ok__modal"]');
const errorModal = document.querySelector('[data-id="error__modal"]');
const okModalBtn = document.querySelector('[data-id="ok__modal__btn"]');
const errorModalBtn = document.querySelector('[data-id="error__modal__btn"]');
const notesContainer = document.querySelector('[data-id="notes__container"]');

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const mail = document.querySelector("#mail");
const phone = document.querySelector("#phone");

const selectedStaffData = JSON.parse(localStorage.getItem("staff"));
const selectedServiceData = JSON.parse(localStorage.getItem("service"));
const selectedDateData = JSON.parse(localStorage.getItem("date"));

function switchBetweenPages(href) {
  location.href = href;
}

function createOutputFile(firstName, lastName, mail, phone) {
  const reservationInfo = {
    staff_id: selectedStaffData[0],
    service_id: selectedServiceData[0],
    date: selectedDateData[0],
    time: selectedDateData[1].split("-")[0],
    customer: {
      name: firstName,
      surname: lastName,
      email: mail,
      phone: phone,
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

prevBtn.addEventListener("click", () => {
  switchBetweenPages("../pages/date.html");
});

confirmBtn.addEventListener("click", () => {
  let unfilledInputs = 0;

  inputs.forEach((input) => {
    if (!input.value) {
      unfilledInputs++;
    }
  });

  if (unfilledInputs === 0) {
    okModal.style.display = "block";

    createOutputFile(firstName.value, lastName.value, mail.value, phone.value);

    inputs.forEach((input) => {
      input.value = "";
    });

    setTimeout(() => {
      localStorage.removeItem("staff");
      localStorage.removeItem("service");
      localStorage.removeItem("date");
      switchBetweenPages("../pages/staff.html");
    }, 2000);
  } else {
    errorModal.style.display = "block";
  }
});

errorModalBtn.addEventListener("click", () => {
  errorModal.style.display = "none";
});

okModalBtn.addEventListener("click", () => {
  okModal.style.display = "none";
});
