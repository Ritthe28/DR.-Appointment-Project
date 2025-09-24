let inputs = document.getElementsByTagName("input");
console.log ("Rohit Trimbak Ritthe ")
console.log(inputs)

const btn = document.querySelector("button")
btn.addEventListener("click",async()=>{

   
   const s = await fetch(`/save/${inputs[0].value}/${inputs[1].value}`)
  

})