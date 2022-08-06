$(document).ready(function () {
    var server = "http://127.0.0.1:5000/flights";
    $.ajax({
        method: "POST",
        url: server,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('tbody').empty();
            for (var i = 0; i < data.response.length; i++) {
                var row = ''
                row = $('<tr><td>' +
                    data.response[i].flightid +
                    '</td><td>' +
                    data.response[i].flightname +
                    '</td><td>' +
                    data.response[i].departure +
                    '</td><td>' +
                    data.response[i].arrival +
                    '</td><td>' +
                    data.response[i].departureTime + 
                    '</td><td>' + 
                    data.response[i].arrivalTime +
                    '</td><td>' +
                    data.response[i].cost +
                    '</td><td>' +
                    data.response[i].seats +
                    
                    
                    '</td></tr>');
                $('tbody').append(row);
                console.log('done')
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error: ' + textStatus + ' - ' + errorThrown);
        }

    });
    $(document).on("click", '.delete', function (e) {
        e.preventDefault();

        var flightid = document.getElementById("flightid").value;
        
        var server = "http://127.0.0.1:5000/";

        $.ajax({
            method: "POST",
            url: server + "/flights/delete",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'flightid': flightid,
            }),
            dataType: 'json',
            success: function (data) {
                //Add Toastify
                location.replace('bookings.html')
                console.log('deleted')
            },
            error: function (err) {
                console.log(err);
            }
        })


    });

});

// '</td><td>' + '<select id="dept"><option id='+ data.response[i].departure +'>'+data.response[i].departure+'</option></select></td><td>' +
// '</td><td>' + '<select id="arr"><option id='+ data.response[i].departure +'>'+data.response[i].departure+'</option></select></td><td>' +