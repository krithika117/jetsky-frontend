var server = "http://127.0.0.1:5000/";
$(document).ready(function () {
    //Create API Call
    $('#addflight').on('click', function (e) {
        e.preventDefault();

        var flightname = document.getElementById("flightname").value;
        var departure = document.getElementById("departure").value;
        var arrival = document.getElementById("arrival").value;
        var tod = document.getElementById("tod").value;
        var toa = document.getElementById("toa").value;
        var cost = document.getElementById("cost").value;
        var seats = document.getElementById("seats").value;


        if (flightname == "" || departure == "" || arrival == "" || tod == "" || toa == "" || cost == "" || seats == "") {
            alert("Please fill all details.");

        } else {
            $.ajax({
                method: "POST",
                url: server + 'flights/add',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({

                    flightname: flightname,
                    departure: departure,
                    arrival: arrival,
                    tod: tod,
                    toa: toa,
                    cost: cost,
                    seats: seats

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
                var row = ''
                row = $('<tr><td>' +
                    data.response[i].flightid +
                    '</td><td>' +
                    data.response[i].flightname +
                    '</td><td>' +
                    data.response[i].departureTime + '<br>' 
                    + data.response[i].departure +

                    '</td><td>' +
                    '<img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/22/000000/external-flight-interface-kiranshastry-lineal-color-kiranshastry.png"/>' +
                    '</td><td>' +
                    data.response[i].arrivalTime + '<br>' +
                    data.response[i].arrival +


                    '</td><td>' +
                    data.response[i].cost +'/-'+
                    '</td><td>' +
                    data.response[i].seats +' seats'+
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
        var flightid = document.getElementById("flightid").value;
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