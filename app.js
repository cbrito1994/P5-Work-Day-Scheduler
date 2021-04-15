let pDay = $('.header__date');
let main = $('main');
let day = moment().format('dddd, MMMM Do');
let timePicker = $('.timePicker');
let storedActivity = JSON.parse(localStorage.getItem("time"));
let initialTime = storedActivity !== null ? storedActivity[storedActivity.length - 1].start : 9;
let finishTime = storedActivity !== null ? storedActivity[storedActivity.length - 1].finish : 18;
pDay.text(day);

