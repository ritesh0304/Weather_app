const Base_URL="https://api.forexrateapi.com/v1/latest?api_key=ea45854ef768a6923a8d92a12b4fad4a";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for ( let select of dropdowns){
    for( let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name == "from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name == "to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption) 
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag =(element)=>{
 let currCode=element.value;
 let countryCode=countryList[currCode];
 let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
 let img =element.parentElement.querySelector("img");
 img.src=newSrc;
}


btn.addEventListener('click',async (e)=>{
    e.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtValue=amount.value;
    
    if(amtValue === ""  || amtValue <1){
        amtValue=1;
        amount.value="1";
    }
    const URL=`${Base_URL}&base=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}`;
        

    let toCurrValue=toCurr.value;   
    let promise=await fetch(URL);
    let jsonData= await promise.json();

    let rate=jsonData["rates"][toCurrValue];

    let finalAmount=rate*amtValue;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `

})


