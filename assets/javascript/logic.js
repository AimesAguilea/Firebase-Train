

// <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>

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

var database = firebase.database();


var trainName = "";
var destination = "";
var firstTime = "";
var frequencey = "";
var minTrainAway = "";
// var nextTime = "";


$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTime = $("#firstTimeInput").val().trim();
    frequencey = $("#frequenceyInput").val().trim();
    
    var firstTimeMath = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeMath);
    
    var currentTime = moment();
    console.log(currentTime);
    console.log("current time: " + moment(currentTime).format("HH:mm"));
    
    var timeDiff = moment().diff(moment(firstTimeMath), "minutes");
    console.log("time difference: " + timeDiff);
    
    var remainingTime = timeDiff % frequencey;
    console.log(remainingTime);
    
    var minTrainAway = frequencey - remainingTime;
    console.log("min. till train: " + minTrainAway);
    
    
    var nextTrain = moment().add(minTrainAway, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

    
    database.ref().push({
        name: trainName,
        destin: destination,
        time: firstTime,
        freq: frequencey,
        timeAway: minTrainAway,
        // nextTime: nextTrain
    });

});



database.ref().on("child_added", function(childsnapshot){
    var trainName = childsnapshot.val().name;
    var destination = childsnapshot.val().destin;
    var firstTime = childsnapshot.val().time;
    var frequencey = childsnapshot.val().freq;
    var minTrainAway = childsnapshot.val().timeAway;

    //------
    

    //------

    // THIS LINE OF CODE WORKS THE SAME AS BELOW IT:
    // $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequencey + "</td><td>" + nextTime + "</td></tr>");
   
    var newRow = $("<tr>").append(
        $("<td>").append(trainName),
        $("<td>").append(destination),
        $("<td>").append(frequencey),
        $("<td>").append(firstTime),
        $("<td>").append(minTrainAway)
    );
    $("#table-rows > tbody").append(newRow);

});

