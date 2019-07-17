var firebaseConfig = {
    apiKey: "AIzaSyDxvnyfrNP7SylVfPtpUvRZp9PPtAMjJn0",
    authDomain: "timesheet-b66ca.firebaseapp.com",
    databaseURL: "https://timesheet-b66ca.firebaseio.com",
    projectId: "timesheet-b66ca",
    storageBucket: "",
    messagingSenderId: "371053767747",
    appId: "1:371053767747:web:8de884702dc2e653"
  };
  
  firebase.initializeApp(config);
var database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = $("#start-input").val().trim();
  var empRate = $("#rate-input").val().trim();

  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

 
  console.log(newEmp); 
  console.log("click");
  database.ref().push(newEmp);

  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Alert
  alert("Employee successfully added");

  
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

 
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

 
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

 
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data in table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});