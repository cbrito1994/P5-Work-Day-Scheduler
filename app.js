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
    formActivity.each(function(){
        $(this).on("submit", (e) => {
            e.preventDefault();
            let activitiesHistory = JSON.parse(localStorage.getItem("time")) || [];
            let time = e.target.childNodes[1].innerText;
            let dayInputValue = e.target.childNodes[3].value;
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
        console.log(storedActivity)
        $(storedActivity).each(function(i) {
            console.log($(this)[i])
            let storedTime = $(this)[0].time;
            let storedValue = $(this)[0].activity;
            let test = $(this)[0].start;
            console.log(test)
            for(let i = 0; i < formActivity.length; i++){
                if($(formActivity[i])[0].childNodes[1].innerText === storedTime){
                    $(formActivity[i])[0].childNodes[3].value = storedValue
                }
            }
        })
    }
}

const setColors = () => {
    let formActivity = $('.rowSchedule');
    formActivity.each(function(){
        let currentTime = moment().format('H') * 1;
        let blockTime = $(this)[0].innerText.substr(0, 2);
        let formInput = $(this)[0].childNodes[3];
        if(blockTime < currentTime){
            $(formInput).css("backgroundColor", "whitesmoke");
            $(formInput).disabled = true;
            $(formInput).css("cursor", "not-allowed");
        } else if (blockTime > currentTime){
            $(formInput).css("backgroundColor", "green");
        } else {
            $(formInput).css("backgroundColor", "red");
        }
    })
}

timePicker.on('submit', (e) => {
    e.preventDefault();
    let childs = e.target.childNodes;
    let rowSchedule = '';

    if(childs[3].matches('#timePicker__start')){
        initialTime = $(childs[3]).val() * 1;
    }
    if(childs[7].matches('#timePicker__finish')){
        finishTime = $(childs[7]).val() * 1;
    }

    if(initialTime < finishTime){
        let timeHistory = JSON.parse(localStorage.getItem("time")) || [];
        let timeActivities = {
            start: initialTime,
            time: "",
            activity: "",
            finish: finishTime
        };
        timeHistory.push(timeActivities);
        localStorage.setItem("time", JSON.stringify(timeHistory));

        for(let i = initialTime; i < finishTime; i++){
            rowSchedule += `
                <form class="rowSchedule">
                    <div class="rowSchedule__time">${i} ${i > 11 ? "PM" : "AM"}</div>
                    <input class="rowSchedule__input" />
                    <button class="rowSchedule__save">
                        <img src="https://image.flaticon.com/icons/png/512/84/84297.png" alt="save" class="inputImage">
                    </button>
                </form>
            `
            main.text("");
            main.append(rowSchedule);
        }
        retrieveInfo();
        localSaving(initialTime, finishTime);
        setColors();
    } else {
        alert("The time you start your day must be less than when you finish your day")
    }
})

const clearSchedule = () => {
    localStorage.removeItem("time");
    location.reload();
}

retrieveInfo();
localSaving(initialTime, finishTime);
setColors();