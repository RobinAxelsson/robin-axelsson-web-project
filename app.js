let startPage = document.querySelector("#startPage");
startPage.style.display = 'flex';
let menuButtons = document.querySelectorAll(".menuBtn");

menuButtons.forEach(element =>{
    element.addEventListener('click', event =>{
        event.preventDefault;
        let page = document.getElementById(event.target.id.slice(0, -3));
        if (page != null) {
            menuButtons.forEach(element =>{
                let page = document.getElementById(element.id.slice(0, -3));
                if (page != null) {
                    page.style.display = 'none';                
                }
            });
            page.style.display = 'flex';
        }
    });
});