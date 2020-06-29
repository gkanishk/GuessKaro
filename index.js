const card=document.querySelectorAll(".memoryCard");
var isFlip=false;
var firstC,secondC;
var count=0;
var lock=false;
card.forEach(card=>card.addEventListener("click",flip));
function flip(){
    if (lock) return;
    if (this ===firstC) return;
    this.classList.add("flip");
    if(!isFlip){
        isFlip=true;
        firstC=this;
        return;
    }
    secondC=this;
    check();
}
function check()
{
    var isMatch=firstC.dataset.image===secondC.dataset.image;
    isMatch?success():fail();
}
function success()
{
    count=count+1;    
    firstC.removeEventListener("click",flip);
    secondC.removeEventListener("click",flip);
    var box=document.getElementById("showResult");
    box.style.backgroundColor="aliceblue"
    box.innerHTML=`You guessed ${firstC.dataset.image} framework. Score=${count}`;
    console.log(firstC.dataset.image)
    if(count==8)
    alert("Congratulations")
    reset();
}
function fail(){
    lock=true;
    setTimeout(()=>{
        firstC.classList.remove("flip");
        secondC.classList.remove("flip");
        reset();
    },1000);
}
function reset(){
    [isFlip,lock]=[false,false];
    [firstC,secondC]=[null,null];
}
(function shuffle(){
    card.forEach(cd=>{
        var position=Math.floor(Math.random()*16);
        cd.style.order=position;
    });
})();