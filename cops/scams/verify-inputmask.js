$("input[name='input1']").on("input", function(){
    $("input[name='number']").val(destroyMask(this.value));
    this.value = createMask($("input[name='number']").val());
})

function createMask(string){
  console.log(string)
  return string.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/,"$1-$2-$3-$4");
}

function destroyMask(string){
  console.log(string)
  return string.replace(/\D/g,'').substring(0,11);
}

input.addEventListener("input", function() {
$(".phnlrt").addClass("hidden");
 
});
