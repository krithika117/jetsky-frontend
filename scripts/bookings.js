var server = "http://127.0.0.1:5000/";
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
$(document).ready(function () {
    //select individual API Call

    $(document).on("click", '.editselect', function (e) {
        e.preventDefault();
        var flightid = $(this).attr("id");
        $.ajax({
            method: "POST",
            url: server + "/flights/indiv",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'flightid': flightid,
            }),
            dataType: 'json',
            success: function (data) {

                document.getElementById("eflightname").value = data.response[0].flightname;
                document.getElementById("edeparture").value = data.response[0].departure;
                document.getElementById("earrival").value = data.response[0].arrival;
                document.getElementById("etod").value = data.response[0].departureTime;
                document.getElementById("etoa").value = data.response[0].arrivalTime;
                document.getElementById("ecost").value = data.response[0].cost;
                document.getElementById("eseats").value = data.response[0].seats;
                // document.getElementById("edate").value = s;
                
                $('#eflightdate').val(formatDate(new Date(data.response[0].flightdate)));
               

            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    //Create API Call
    $('#addflight').on('click', function (e) {
        e.preventDefault();
        var flightid = document.getElementById("flightid").value;
        var flightname = document.getElementById("flightname").value;
        var departure = document.getElementById("departure").value;
        var arrival = document.getElementById("arrival").value;
        var tod = document.getElementById("tod").value;
        var toa = document.getElementById("toa").value;
        var cost = document.getElementById("cost").value;
        var seats = document.getElementById("seats").value;
        var flightdate = $('#flightdate').val();


        if (flightid == "" || flightname == "" || departure == "" || arrival == "" || tod == "" || toa == "" || cost == "" || seats == "") {
            alert("Please fill all details.");

        } else {
            $.ajax({
                method: "POST",
                url: server + 'flights/add',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    flightid: flightid,
                    flightname: flightname,
                    departure: departure,
                    arrival: arrival,
                    tod: tod,
                    toa: toa,
                    cost: cost,
                    seats: seats,
                    flightdate: flightdate

                }),

                success: function (response) {
                    location.replace('bookings.html')
                    console.log('inserted')
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }

    });


    //Retrieve API Call
    $.ajax({
        method: "POST",
        url: server + "flights",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('tbody').empty();
            for (var i = 0; i < data.response.length; i++) {
                var s = new Date(data.response[i].flightdate).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                });
                s = s.split(',')[0]
                var datearray = s.split("/");
                s = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
                var row = ''
                row = $('<tr><td>' +
                    data.response[i].flightid +
                    '</td><td>' +
                    data.response[i].flightname +
                    '</td><td>' +
                    s +
                    '</td><td>' +
                    data.response[i].departureTime + '<br>' +
                    data.response[i].departure +

                    '</td><td>' +
                    // '<img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/20/000000/external-flight-interface-kiranshastry-lineal-color-kiranshastry.png"/>' +
                    '✈️' +
                    '</td><td>' +
                    data.response[i].arrivalTime + '<br>' +
                    data.response[i].arrival +
                    '</td><td>' +
                    data.response[i].cost + '/-' +
                    '</td><td>' +
                    data.response[i].seats + ' seats' +
                    '</td><td>' +

                    '<a class="delete" id="' + data.response[i].num + '">🗑️</a>&nbsp;' +
                    '<a class="editselect" data-toggle="modal" data-target="#edit_data_Modal" id="' + data.response[i].flightid + '">✏️</a></td>' +
                    '</td></tr>');

                $('tbody').append(row);
                console.log('done')
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });

    //Delete API Call
    $(document).on("click", '.delete', function (e) {
        e.preventDefault();
        var num = $(this).attr("id");
        $.ajax({
            method: "POST",
            url: server + "flights/delete",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'num': num,
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