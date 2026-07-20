/* =========================
   IMMAR TRADING WEBSITE JS
========================= */


// Mobile Menu Toggle

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");


if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}




// Close mobile menu after selecting a page

const menuItems = document.querySelectorAll(".nav-links a");


menuItems.forEach(item=>{


    item.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });


});







// Dynamic WhatsApp Booking Function

function bookVehicle(vehicleName){


    const phoneNumber = "260XXXXXXXXX";


    const message = 
    `Hello Immar Trading, I would like to hire the ${vehicleName}. Please provide availability and pricing.`;


    const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


    window.open(whatsappURL,"_blank");


}







// Add booking buttons automatically

const bookingButtons = document.querySelectorAll("[data-vehicle]");


bookingButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        const vehicle =
        button.getAttribute("data-vehicle");


        bookVehicle(vehicle);


    });


});







// Current Year Footer Update

const yearElement = document.querySelector(".copyright");


if(yearElement){

    const year = new Date().getFullYear();

    yearElement.innerHTML =
    `© ${year} Immar Trading. All Rights Reserved.`;

}







// Smooth appearance animation

const cards =
document.querySelectorAll(".vehicle-card, .feature, .testimonial");


const observer =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){

        entry.target.style.opacity="1";
        entry.target.style.transform="translateY(0)";

    }


});


});




cards.forEach(card=>{


    card.style.opacity="0";
    card.style.transform="translateY(30px)";
    card.style.transition="0.6s ease";


    observer.observe(card);


});