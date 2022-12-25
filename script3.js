const calElement = document.getElementById('calendar');
const calOptions={
    initialView: 'dayGridMonth',
    events:[
        {
            id:'some',
            title: 'Something',
            start: '2022-12-21 18:00',
            end: '2022-12-22 18:00'
        }
    ],
    dateClick: (info) => {
        console.log(info.dateStr);
    }
};
const calendar = new FullCalendar.Calendar(calElement,calOptions);
calendar.render();