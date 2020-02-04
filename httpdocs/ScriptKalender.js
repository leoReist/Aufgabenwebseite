var backendUrl = 'https://inf-431-19i-vogt.iet-gibb.net/php/lib.php';
var currentMonth = new Date();

function previousMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    loadCalendar();
}

function nextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    loadCalendar();
}

function loadCalendar() {
    var month = currentMonth.getMonth() + 1;
    var year = currentMonth.getFullYear();

    var url = backendUrl + '?action=getTage&month=' + month + '&year=' + year;
    $.get(url, function(data) {
        var json = JSON.parse(data);

        var currentDay = new Date(year + '-' + month + '-1');

        var table = $('table#kalender');
        table.find('thead td#month').html(formatMonth(currentMonth));
        table.find('tbody').empty();

        var currentRow = $('<tr></tr>');
        table.find('tbody').append(currentRow);

        var firstDay = currentDay.getDay();
        if (firstDay == 0) {
            firstDay = 7;
        }

        for (var i = 1; i < firstDay; i++) {
            currentRow.append('<td></td>');
        }

        while (currentDay.getMonth() == month - 1) {
            if (currentDay.getDay() == 1 && currentDay.getDate() != 1) {
                currentRow = $('<tr></tr>');
                table.find('tbody').append(currentRow);
            }

            var hasTasks = json.some(e => new Date(e.Datum).toDateString() == currentDay.toDateString());

            var day = $('<td class="day"></td>')
                .html(currentDay.getDate())
                .addClass(hasTasks ? 'has-tasks' : 'no-tasks');
            currentRow.append(day);
            currentDay.setDate(currentDay.getDate() + 1);
        }
    });
}

function formatMonth(date) {
    var format = '';
    switch (date.getMonth()) {
        case 0: format = 'Januar'; break;
        case 1: format = 'Februar'; break;
        case 2: format = 'März'; break;
        case 3: format = 'April'; break;
        case 4: format = 'Mai'; break;
        case 5: format = 'Juni'; break;
        case 6: format = 'Juli'; break;
        case 7: format = 'August'; break;
        case 8: format = 'September'; break;
        case 9: format = 'Oktober'; break;
        case 10: format = 'November'; break;
        case 11: format = 'Dezember'; break;
    }

    format += ' ' + date.getFullYear();
    return format;
}

$(function() {
    loadCalendar();

    $('table#kalender').on('click', 'td.day', function() {
        var day = $(this).text();
        var month = currentMonth.getMonth() + 1;
        var year = currentMonth.getFullYear();
        var openPopupData = day + month + year;
        
    
        var url = backendUrl + '?action=getAufgaben&day=' + day + '&month=' + month + '&year=' + year;
        console.log(url);
  	window.open("https://inf-431-19i-vogt.iet-gibb.net/detailsTage.html")
        openPopup(openPopupData);
    });
});

function openPopup(openPopupData) {
    console.log(openPopupData);

}