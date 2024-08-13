// calculator.js
// Define date ranges
var startDate1 = new Date('2024-01-01');
var endDate1 = new Date('2024-06-25');
var startDate2 = new Date('2024-06-26');
var endDate2 = new Date('2024-12-31');
function validateDate(date, minDate, maxDate) {
   return date >= minDate && date <= maxDate;
}
function getValidatedValue(id) {
   var value = document.getElementById(id).value;
   return value ? parseFloat(value) : 0;
}
function validateInputsForSituation1() {
   var dateInput = document.getElementById('exerciseDate1');
   var exerciseDate = new Date(dateInput.value);
   if (!dateInput.value) {
       alert("Exercise date for situation 1 is mandatory.");
       dateInput.focus();
       return false;
   }
   if (!validateDate(exerciseDate, startDate1, endDate1)) {
       alert("Exercise date for Situation 1 must be between " + startDate1.toDateString() + " and " + endDate1.toDateString() + ".");
       dateInput.focus();
       return false;
   }
   return true;
}
function validateInputsForSituation2() {
   var dateInput = document.getElementById('exerciseDate2');
   var exerciseDate = new Date(dateInput.value);
   if (!dateInput.value) {
       alert("Exercise date for situation 2 is mandatory.");
       dateInput.focus();
       return false;
   }
   if (!validateDate(exerciseDate, startDate2, endDate2)) {
       alert("Exercise date for situation 2 must be between " + startDate2.toDateString() + " and " + endDate2.toDateString() + ".");
       dateInput.focus();
       return false;
   }
   return true;
}
function calculateForSituation(grantPriceId, exercisePriceId, fmvAtExerciseId, numberOfSharesId, employeeContributionId, exerciseDateId, minDate, maxDate) {
   var grantPrice = getValidatedValue(grantPriceId);
   var exercisePrice = getValidatedValue(exercisePriceId);
   var fmvAtExercise = getValidatedValue(fmvAtExerciseId);
   var numberOfShares = parseInt(getValidatedValue(numberOfSharesId));
   var employeeContribution = getValidatedValue(employeeContributionId);
   var exerciseDate = new Date(document.getElementById(exerciseDateId).value);
   // Calculate the taxable benefit
   var taxableBenefit = ((fmvAtExercise - exercisePrice) * numberOfShares) - employeeContribution;
   // Initialize the amounts
   var box90Amount = 0;
   var box91Amount = 0;
   var box38Amount = 0;
   var box39Amount = 0;
   // Calculate the amounts based on the date ranges
   if (exerciseDate >= minDate && exerciseDate <= maxDate) {
       if (minDate.getTime() === startDate1.getTime()) { // Situation 1
           box90Amount = taxableBenefit; // Code 90 for Situation 1
           box91Amount = 0.5 * taxableBenefit; // Deduction for Situation 1
       } else { // Situation 2
           box38Amount = taxableBenefit; // Code 38 for Situation 2
           box39Amount = (1/3) * taxableBenefit; // Deduction for Situation 2
       }
   }
   return { box90Amount, box91Amount, box38Amount, box39Amount };
}
function calculateT4Values() {
   // Hide results initially
   var results = document.querySelectorAll('.result');
   results.forEach(function(element) {
       element.style.display = 'none';
   });
   // Validate inputs and dates for each situation
   var isValidSituation1 = true;
   var isValidSituation2 = true;
   if (document.getElementById('exerciseDate1').value) {
       isValidSituation1 = validateInputsForSituation1();
   }
   if (document.getElementById('exerciseDate2').value) {
       isValidSituation2 = validateInputsForSituation2();
   }
   if (!isValidSituation1 && !isValidSituation2) {
       return; // If any situation is invalid, stop calculation
   }
   // Calculate for the situations
   var result1 = calculateForSituation('grantPrice1', 'exercisePrice1', 'fmvAtExercise1', 'numberOfShares1', 'employeeContribution1', 'exerciseDate1', startDate1, endDate1);
   var result2 = calculateForSituation('grantPrice2', 'exercisePrice2', 'fmvAtExercise2', 'numberOfShares2', 'employeeContribution2', 'exerciseDate2', startDate2, endDate2);
   // Aggregate results
   var totalBox90Amount = result1.box90Amount;
   var totalBox91Amount = result1.box91Amount;
   var totalBox38Amount = result2.box38Amount;
   var totalBox39Amount = result2.box39Amount;
   // Calculate the total taxable benefit
   var totalBox14Amount = totalBox90Amount + totalBox38Amount;
   // Display the results
   document.getElementById('box14').textContent = "Box 14 - Employment income (may include other income): $" + totalBox14Amount.toFixed(2);
   document.getElementById('box90').textContent = "Code 90 - Security options benefits - From January 1 to June 24, 2024: $" + totalBox90Amount.toFixed(2);
   document.getElementById('box91').textContent = "Code 91 or 92 - Security options deduction- From January 1 to June 24, 2024: $" + totalBox91Amount.toFixed(2);
   document.getElementById('box38').textContent = "Code 38 - Security options benefits - From June 25 to December 31, 2024: $" + totalBox38Amount.toFixed(2);
   document.getElementById('box39').textContent = "Code 39 or 41 - Security options deduction - From June 25 to December 31, 2024: $" + totalBox39Amount.toFixed(2);
   // Show results after calculation
   results.forEach(function(element) {
       element.style.display = 'block';
   });
}
function resetResults() {
   // Hide results
   var results = document.querySelectorAll('.result');
   results.forEach(function(element) {
       element.style.display = 'none';
   });
}
// Attach input event listeners to reset results on input change
document.querySelectorAll('input').forEach(function(input) {
   input.addEventListener('input', function() {
       resetResults();
   });
});
