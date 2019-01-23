

// <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
// {/* <script> */}
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbPLKiXIC2pOaOBaCYdFdMgri59qoYj-g",
    authDomain: "train-schedule-5543a.firebaseapp.com",
    databaseURL: "https://train-schedule-5543a.firebaseio.com",
    projectId: "train-schedule-5543a",
    storageBucket: "train-schedule-5543a.appspot.com",
    messagingSenderId: "439330888827"
};
firebase.initializeApp(config);
// </script>

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = "";
var frequencey = "";



$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainInput").val().trim();
    console.log(trainName);
    destination = $("#destinationInput").val().trim();
    firstTime = $("#firstTimeInput").val().trim();
    frequencey = $("#frequenceyInput").val().trim();

    database.ref().push({
        name: trainName,
        destin: destination,
        time: firstTime,
        freq: frequencey,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});



database.ref().on("child_added", function(childsnapshot){
    var trainName = childsnapshot.val().name;
    var destination = childsnapshot.val().destin;
    var firstTime = childsnapshot.val().time;
    var frequencey = childsnapshot.val().freq;

    $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTime + "</td><td>" +frequencey + "</td></tr>");
});

