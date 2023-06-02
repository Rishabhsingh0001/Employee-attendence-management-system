// Globals Vars
let video;
let live_stream; // stream
let attendance_photo;
let register_photo;

function modal_controler( modal_id , btn_id , close_btn_id ) {
    // Get the modal
    var modal = document.getElementById(modal_id);

    // Get the button that opens the modal
    var btn = document.getElementById(btn_id);

    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName(close_btn_id)[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    // modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function modal_take_photo_controler( modal_id , btn_id , camera_elem_id , close_btn_id ) {
    var modal = document.getElementById(modal_id);
    var btn = document.getElementById(btn_id);
    var span = document.getElementById(close_btn_id);
    btn.onclick = function() {
        modal.style.display = "block";
        camera_stream_player(camera_elem_id)
    }

    span.onclick = function() {
        modal.style.display = "none";
        stop_live_stream(live_stream);
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            stop_live_stream(live_stream);
        }
    }
}

function camera_stream_player( video_elem_id ) {
    video = document.getElementById(video_elem_id);
    if( navigator.mediaDevices.getUserMedia ) {
        navigator.mediaDevices.getUserMedia({video:true})
            .then( function(stream) {
                video.srcObject = stream;
                live_stream = stream;
                console.log(stream);
            })
            .catch( function(error) {
                console.log( "Something went Wrong..." );
            } )
    } else {
        console.log( "Media Error" );
    }
}

// stop live stream
function stop_live_stream(stream) {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
            track.stop();
        }
    });
}

function click_photo_attendance(e) {
    var btn = document.getElementById("click-photo-attendance");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    btn.onclick = function() {
        document.getElementById("cameraModal").style.display = "none";
        progress_ok( 0 , 2000 );
        attendance_photo = video;
        stop_live_stream(live_stream);
    }

    // btn.onclick = function() {
    //     canvas.style.display = "block";
    //     canvas.setAttribute("width" , "100px");
    //     context.drawImage(video, 0, 0);
    // }
}

function progress_ok( _progress_time=4000 , _ok_time=2000 ) {
    var progress_modal = document.getElementById("progressModal");
    var _img1 = document.getElementById("img1");
    var _img2 = document.getElementById("img2");
    
    progress_modal.style.display = "block";
    _img1.style.display = "block";
    _img2.style.display = "none";

    setTimeout( function() { 
        _img1.style.display = "none";
        _img2.style.display = "block";
        setTimeout( function() {
            progress_modal.style.display = "none";
        } , _ok_time );
     } , _progress_time );
}

function important_functions() {

    // REGISTER ATTENDANCE
    var btnAttendance = document.getElementById("registerAttendance");
    btnAttendance.onclick = function() {
        var _id = document.getElementById("employeid").value;
        if( _id.length <= 0 ) {
            alert( "Employe ID Empty ..." );
            return;
        }
        var dateTime = new Date().toLocaleString().replace(",","").replace(/:.. /," ");
        
        var encoded_query = encodeURI("id="+_id+"&time="+dateTime);

        progress_ok();

        fetch('apiSaveAttendance.php?'+encoded_query )
            .then((response) => response)
            .then(function(data) {
                console.log(data);
            });
    }


    // REGISTER NEW EMPLOYE
    var btnRegister = document.getElementById("registerBtn");
    btnRegister.onclick = function() {
        var adminPass = document.getElementById("adminPass");
        if( adminPass.value != '1234' ) {
            alert("Wrong Admin Password.");
            return;
        }
        var name = document.getElementById("newemployename").value;
        var email = document.getElementById("newemployeemail").value;
        if( name.length <= 0 ) {
            alert( "Employe Name Empty ..." );
            return;
        }
        if( email.length <= 0 ) {
            alert( "Employe Email Empty ..." );
            return;
        }

        var id = Math.floor(Math.random()*100000).toString();
        var dateTime = new Date().toLocaleString().replace(",","").replace(/:.. /," ");
        
        var encoded_query = encodeURI("id="+id+"&name="+name+"&email="+email+"&time="+dateTime);
        
        document.getElementById('myModal').style.display='none';
        progress_ok();

        fetch('apiNewRegistration.php?'+encoded_query )
            .then((response) => response)
            .then(function(data) {
                console.log(data);
            });
    }
}


important_functions();
modal_controler( "myModal" , "myBtn" , "close-myModal"  );
modal_take_photo_controler( "cameraModal" , "takeaphoto-btn" , "cameraStream" , "close-take-photo-Modal"  );
modal_take_photo_controler( "cameraModal" , "takeaphoto-register-btn" , "cameraStream" , "close-take-photo-Modal"  );
click_photo_attendance(1);
// camera_stream_player("cameraStream");