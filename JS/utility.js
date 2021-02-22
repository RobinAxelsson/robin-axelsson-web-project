function select(element){
    if (document.querySelector(element) !== null) {
        return document.querySelector(element);
    } else {
        console.error('select(element): ' + element + ' is not found!');
        return null;
    }
}
function hideAllPages(){
    document.querySelectorAll(".page").forEach(page =>{
         page.style.display = "none";
    });
}
function bindBtnPage(btn, page){
    btn.addEventListener("click", event =>{
        event.preventDefault;
        hideAllPages();
        page.style.display = "flex";
    });
}
function bindBtnFunc(btn, func){
    btn.addEventListener("click", event =>{
        event.preventDefault;
        func();
    });
}
function jumpToPage(page){
    hideAllPages();
    page.style.display = "flex";
}

function roundDec(float) {
    if (isNaN(float)) {
        console.error('function roundDec have wrong input');
        return null;
    } else {
        return Math.round(float * 100) / 100;        
    }
}