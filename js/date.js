const getElement = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

const hoursContainer = getElement("[data-id='hours__container']");
const allDaysConatiner = getElement('[data-id="days__container"]');
const currentDateContainer = getElement('[data-id="current__date"]');
const calendarBtns = getElements('[data-id="calendar__btn"]');
const selectedDayForHour = getElement('[data-id="hour__for__day"]');
const nextBtn = getElement("[data-id='next__btn']");
const prevBtn = getElement("[data-id='prev__btn']");
const alert = getElement("[data-id='alert']");

const date = ["2023-08-14", "2023-08-15", "2023-08-16", "2023-08-17"];

const time = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    start_time: "10:00",
    end_time: "10:30",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let isHourSelected = false;

const selectedDateData = JSON.parse(localStorage.getItem("date"));

selectedDateData && selectedDateData[1] && (isHourSelected = true);

let currDate = new Date();
let currYear = currDate.getFullYear();
let currMonth = currDate.getMonth();

function dissappearAlert() {
  setTimeout(() => {
    alert.style.visibility = "hidden";
  }, 2000);
}

function switchBetweenPages(href) {
  location.href = href;
}

function renderCalendar() {
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

  let daysForMonth = "";

  for (let i = 0; i < weeks.length; i++) {
    daysForMonth += `<div class="main__content__month__content__week__day">${weeks[i]}</div>`;
  }

  for (let i = firstDayOfMonth; i > 0; i--) {
    daysForMonth += `<div class="main__content__month__content__item previous__month">${
      lastDateOfLastMonth - i + 1
    }</div>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    daysForMonth += `<div class="main__content__month__content__item">${i}</div>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    daysForMonth += `<div class="main__content__month__content__item next__month">${
      i - lastDayofMonth + 1
    }</div>`;
  }

  currentDateContainer.innerText = `${months[currMonth]} ${currYear}`;
  allDaysConatiner.innerHTML = daysForMonth;
}
renderCalendar();

function makeCalendarSwitchable() {
  calendarBtns.forEach((calendarBtn) => {
    calendarBtn.addEventListener("click", () => {
      currMonth =
        calendarBtn.id === "calendar__prev__btn"
          ? currMonth - 1
          : currMonth + 1;

      if (currMonth < 0 || currMonth > 11) {
        currDate = new Date(currYear, currMonth);
        currYear = currDate.getFullYear();
        currMonth = currDate.getMonth();
      } else {
        currDate = new Date();
      }

      if (currMonth === new Date().getMonth()) {
        location.reload(true);
      }
      renderCalendar();
    });
  });
}
makeCalendarSwitchable();

const allDays = Array.from(getElement('[data-id="days__container"]').children);

function showActiveDays() {
  const savedDate = selectedDateData && new Date(selectedDateData[0]).getDate();

  date.map((dateItem) => {
    const availableDay = new Date(dateItem).getDate();

    allDays.forEach((day) => {
      const formattedDay = Number(day.firstChild.nodeValue);
      if (formattedDay === availableDay) {
        day.classList.add("date--active");
        day.dataset.id = "monthDay";
      }
      if (formattedDay === savedDate) {
        day.classList.add("date--clicked");
      }
    });
  });
}
showActiveDays();

function displayHours() {
  let displayItem = time.map((hour) => {
    return ` <div
    class="main__content__hour__content__available__item ${
      selectedDateData ? selectedDateData[1] && "date__hour--active" : ""
    }"
    data-id="hour"
  >
    <div
      class="main__content__hour__content__available__item__start"
    >
      ${hour.start_time}
    </div>
    <div
      class="main__content__hour__content__available__item__end"
    >
    ${hour.end_time}
    </div>
  </div>`;
  });

  displayItem = displayItem.join("");
  hoursContainer.innerHTML = displayItem;
}
displayHours();

const monthDays = getElements("[data-id='monthDay']");
const hours = getElements("[data-id='hour']");

let fullDay = (selectedDateData && selectedDateData[0]) || "";
let fullHour = "";

function showSavedHour() {
  let savedHourValue = selectedDateData && selectedDateData[1].split("-")[0];

  hours.forEach((hour) => {
    let startHourValue = hour.children[0].firstChild.nodeValue.trim();
    if (savedHourValue === startHourValue) {
      hour.classList.add("date__hour--clicked");
    }
  });
}
showSavedHour();

function showCurrDateForHour(selectedDay) {
  let editedCurrMonth = currMonth < 10 ? `0${currMonth + 1}` : currMonth + 1;
  let editedCurrDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;

  console.log(selectedDateData);

  selectedDayForHour.innerText = `${currYear}-${editedCurrMonth}-${editedCurrDay}`;
}
selectedDateData && showCurrDateForHour(selectedDateData[0].split("-")[2]);

function makeMonthDaysClickable() {
  monthDays.forEach((day) => {
    day.addEventListener("click", () => {
      monthDays.forEach((day) => {
        day.classList.remove("date--clicked");

        hours.forEach((hour) => {
          hour.classList.remove("date__hour--clicked");
        });
      });

      day.classList.add("date--clicked");

      isHourSelected = false;

      let selectedDay = Number(day.firstChild.nodeValue);

      date.map((dateItem) => {
        const availableDay = new Date(dateItem).getDate();
        if (availableDay === selectedDay) {
          showCurrDateForHour(selectedDay);
          fullDay = dateItem;
        }
      });

      hours.forEach((hour) => {
        hour.classList.add("date__hour--active");
      });

      isMonthSelected = true;
    });
  });
}
makeMonthDaysClickable();

function makeHoursClickable() {
  hours.forEach((hour) => {
    hour.addEventListener("click", () => {
      hours.forEach((hour) => {
        hour.classList.remove("date__hour--clicked");
      });

      hour.classList.add("date__hour--clicked");

      let startHour = hour.children[0].firstChild.nodeValue.trim();
      let endHour = hour.children[1].firstChild.nodeValue.trim();

      fullHour = startHour + "-" + endHour;

      isHourSelected = true;
    });
  });
}
makeHoursClickable();

function switchNextPage() {
  const selectedDateArray = [fullDay, fullHour];
  if (fullHour) {
    localStorage.setItem("date", JSON.stringify(selectedDateArray));
  }
  switchBetweenPages("../pages/details.html");
}

nextBtn.addEventListener("click", () => {
  if (!isHourSelected) {
    alert.style.visibility = "visible";
    dissappearAlert();
  } else {
    switchNextPage();
  }
});

prevBtn.addEventListener("click", () => {
  switchBetweenPages("../pages/services.html");
});
