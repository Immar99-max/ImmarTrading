/* ==========================================
   IMMAR TRADING SERVICES PAGE JS
========================================== */


/* ==========================================
   MOBILE MENU
========================================== */


const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");


if(menuToggle && navLinks){


    menuToggle.addEventListener("click",()=>{


        navLinks.classList.toggle("active");


    });



    document
    .querySelectorAll(".nav-links a")
    .forEach(link=>{


        link.addEventListener("click",()=>{


            navLinks.classList.remove("active");


        });


    });


}





/* ==========================================
   SERVICE TAB FILTERING
========================================== */


const tabs = document.querySelectorAll(".tab");

const serviceCards = document.querySelectorAll(".service-card");



/*
Add category names to cards
*/

const serviceCategories = {


    "Executive Vehicle Hire":"corporate",

    "SUV & 4x4 Hire":"travel",

    "Corporate Transport Solutions":"corporate",

    "Airport Transfers":"travel",

    "Intercity & Long Distance Travel":"travel",

    "Mining & Industrial Transport":"projects",

    "Events & Special Occasions":"events",

    "Chauffeur Services":"corporate"


};



serviceCards.forEach(card=>{


    const title =
    card.querySelector("h3").innerText;


    card.dataset.category =
    serviceCategories[title] || "all";


});






tabs.forEach(tab=>{


    tab.addEventListener("click",()=>{


        /*
        Remove active class
        */


        tabs.forEach(button=>{


            button.classList.remove("active");


        });



        tab.classList.add("active");



        const selected =
        tab.innerText.toLowerCase();




        serviceCards.forEach(card=>{


            const category =
            card.dataset.category;



            if(
                selected.includes("all") ||
                selected.includes(category)
            ){


                card.style.display="block";


            }

            else{


                card.style.display="none";


            }


        });


    });


});






/* ==========================================
   CARD ANIMATION
========================================== */


const cards =
document.querySelectorAll(".service-card");



if("IntersectionObserver" in window){


const observer =

new IntersectionObserver(entries=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


            observer.unobserve(entry.target);


        }


    });


},{


    threshold:0.15


});



cards.forEach(card=>{


    card.classList.add("hidden");


    observer.observe(card);


});


}







/* ==========================================
   SMOOTH SCROLL FOR INTERNAL LINKS
========================================== */


document
.querySelectorAll('a[href^="#"]')
.forEach(link=>{


    link.addEventListener("click",function(e){


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});






/* ==========================================
   WHATSAPP SERVICE REQUEST
========================================== */


document
.querySelectorAll(".service-card a")
.forEach(button=>{


    button.addEventListener("click",function(){


        const service =
        this.closest(".service-card")
        .querySelector("h3")
        .innerText;



        if(this.href.includes("#contact")){


            const message =

`Hello Immar Trading,

I would like to enquire about:

${service}

Please provide more information.

Thank you.`;



            this.href =

            "https://wa.me/260977123456?text="

            + encodeURIComponent(message);



            this.target="_blank";


        }



    });


});