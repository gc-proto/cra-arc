let setValue = function(valDisplayRange, rangeValue) {
  document.getElementById(valDisplayRange).innerHTML = rangeValue;
};

document.addEventListener("DOMContentLoaded", function() { 
  setValue("paymentYearsOutput", document.getElementById("paymentYears").value); 
});

document.getElementById("paymentYears").addEventListener("input", function() { 
  setValue("paymentYearsOutput", this.value); 
});
document.addEventListener("DOMContentLoaded", function() { 
  setValue("savingYearsOutput", document.getElementById("savingYears").value); 
});

document.getElementById("savingYears").addEventListener("input", function() { 
  setValue("savingYearsOutput", this.value); 
});

//currency formatted

document.addEventListener("DOMContentLoaded", function() { 
  setValue("paymentAmountOutput", currencyFormatter.format(document.getElementById("paymentAmount").value)); 
});

document.getElementById("paymentAmount").addEventListener("input", function() { 
  setValue("paymentAmountOutput", currencyFormatter.format(this.value)); 
});

document.addEventListener("DOMContentLoaded", function() { 
  setValue("savingsDirectAmountOutput", currencyFormatter.format(document.getElementById("savingsDirectAmount").value)); 
//  setValue("savingsDirectAmountOutput", intCurrencyFormat(document.getElementById("savingsDirectAmount").value)); 
});


//conditional functions

document.addEventListener("DOMContentLoaded", function() { 
  setValue("savingsAmountOutput", currencyFormatter.format(document.getElementById("savingsAmount").value));
  if (parseInt(document.getElementById("savingsAmount").value, 10) < parseInt(document.getElementById("savingsDirectAmount").value, 10)) {
    document.getElementById("savingsDirectAmount").value = document.getElementById("savingsAmount").value;
    setValue("savingsDirectAmountOutput", currencyFormatter.format(document.getElementById("savingsAmount").value)); 
  }
});

document.getElementById("savingsAmount").addEventListener("input", function() { 
  setValue("savingsAmountOutput", currencyFormatter.format(this.value)); 
  if (parseInt(document.getElementById("savingsAmount").value, 10) < parseInt(document.getElementById("savingsDirectAmount").value, 10)) {
    setValue("savingsDirectAmountOutput", currencyFormatter.format(document.getElementById("savingsAmount").value)); 
  }
});

document.getElementById("savingsDirectAmount").addEventListener("input", function(event) { 
  if (parseInt(document.getElementById("savingsDirectAmount").value, 10) <= parseInt(document.getElementById("savingsAmount").value, 10)) {
    setValue("savingsDirectAmountOutput", currencyFormatter.format(this.value)); 
  }
});
