// FIREBASE
var config = {
  apiKey: "AIzaSyDQJ8C_eMwsv6nA0F5rg1EsEiqzMUyerNg",
  authDomain: "shot-scheduler-dfb10.firebaseapp.com",
  databaseURL: "https://shot-scheduler-dfb10.firebaseio.com",
  projectId: "shot-scheduler-dfb10",
  storageBucket: "shot-scheduler-dfb10.appspot.com",
  messagingSenderId: "398474078308"
};

firebase.initializeApp(config);
// FIREBASE

var playerData = firebase.database();

$("#add-player-btn").on("click", function () {

  var playerName = $("#player-name-input").val().trim();
  var penalty = $("#penalty-input").val().trim();
  var firstShot = $("#first-shot-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  var newPlayer = {

    name: playerName,
    penalty: penalty,
    firstShot: firstShot,
    frequency: frequency

  };

  playerData.ref().push(newPlayer);

  console.log(newPlayer.name);
  console.log(newPlayer.penalty);
  console.log(newPlayer.firstShot);
  console.log(newPlayer.frequency);

  alert("Player successfully added");

  $("#player-name-input").val("");
  $("#penalty-input").val("");
  $("#first-player-input").val("");
  $("#frequency-input").val("");

  return false;
});

playerData.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var tName = childSnapshot.val().name;
  var tPenalty = childSnapshot.val().penalty;
  var tFrequency = childSnapshot.val().frequency;
  var tfirstShot = childSnapshot.val().firstShot;

  var timeArr = tfirstShot.split(":");
  var playerTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), playerTime);
  var tMinutes;
  var tArrival;

  if (maxMoment === playerTime) {
    tArrival = playerTime.format("hh:mm A");
    tMinutes = playerTime.diff(moment(), "minutes");
  } else {

    var differenceTimes = moment().diff(playerTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;

    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

  $("#player-table > tbody").append("<tr><td>" + tName + "</td><td>" + tPenalty + "</td><td>" +
    tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

