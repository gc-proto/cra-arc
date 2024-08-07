/**
 * @title WET-BOEW Input range plugin
 * @overview Plugin to display current value on an input of type range 
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
(function calculateProfit() { 
  
 // Get the input values 
 let numOptions = document.getElementById('numOptions').value; 
 let exercisePrice = document.getElementById('exercisePrice').value; 
 let currentStockPrice = document.getElementById('currentStockPrice').value; 
 let yearsToExercise = document.getElementById('yearsToExercise').value; 
   
// Check if any input is empty 
 if (!numOptions || !exercisePrice || !currentStockPrice || !yearsToExercise) { document.getElementById('result').textContent = "Please fill in all fields."; document.getElementById('warning').textContent = ""; return; } 
  
// Calculate the potential profit 
let potentialProfit = (currentStockPrice - exercisePrice) * numOptions; 

// Display the result
document.getElementById('result').textContent = `Potential Profit: $${potentialProfit.toFixed(2)}`; 

// Display a warning if the potential profit is over $250,000 if (potentialProfit > 250000) 
  { document.getElementById('warning').textContent = "Warning: Potential profit exceeds $250,000!"; } 
  
  else { document.getElementById('warning').textContent = ""; } }
