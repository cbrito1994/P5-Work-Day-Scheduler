let pDay = $('.header__date');
let main = $('main');
let day = moment().format('dddd, MMMM Do');
let timePicker = $('.timePicker');
let storedActivity = JSON.parse(localStorage.getItem("time"));
let initialTime = storedActivity !== null ? storedActivity[storedActivity.length - 1].start : 9;
let finishTime = storedActivity !== null ? storedActivity[storedActivity.length - 1].finish : 18;
pDay.text(day);

for(let i = initialTime; i < finishTime; i++){
    let rowSchedule = '';
    rowSchedule += `
        <form class="rowSchedule">
            <div class="rowSchedule__time">${i} ${i > 11 ? "PM" : "AM"}</div>
            <input class="rowSchedule__input" />
            <button class="rowSchedule__save">
                <img src="https://image.flaticon.com/icons/png/512/84/84297.png" alt="save" class="inputImage">
            </button>
        </form>
    `
    main.append(rowSchedule);
}

const localSaving = (initialTime, finishTime) => {
    let formActivity = $('.rowSchedule');
    formActivity.forEach((form) => {
        form.on("submit", (e) => {
            e.preventDefault();
            let activitiesHistory = JSON.parse(localStorage.getItem("time")) || [];
            let time = e.target.childNodes[1].text();
            let dayInputValue = e.target.childNodes[3].val();
            let dayActivities = {
                start: initialTime,
                time: time,
                activity: dayInputValue,
                finish: finishTime
            };
            activitiesHistory.push(dayActivities);
            localStorage.setItem("time", JSON.stringify(activitiesHistory));
        })
    })
}

const retrieveInfo = () => {
    let formActivity = $('.rowSchedule');
    if(storedActivity){
        storedActivity.forEach(saved => {
            let storedTime = saved.time;
            let storedValue = saved.activity;
            for(let i = 0; i < formActivity.length; i++){
                if(formActivity[i].childNodes[1].text(storedTime)){
                    formActivity[i].childNodes[3].val(storedValue)
                }
            }
        })
    }
}

const setColors = () => {
    let formActivity = $('.rowSchedule');
    formActivity.forEach((form) => {
        let currentTime = moment().format('H') * 1;
        let blockTime = form.childNodes[1].text().substr(0, 2);
        let formInput = form.childNodes[3];
        if(blockTime < currentTime){
            formInput.css("background-color", "whitesmoke");
            formInput.disabled = true;
            formInput.css("cursor", "not-allowed");
        } else if (blockTime > currentTime){
            formInput.css("background-color", "green");
        } else {
            formInput.css("background-color", "red");
        }
    })
}