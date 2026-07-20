/* ==========================================
   IMMAR TRADING - FLEET PAGE
   PART 1
========================================== */

/* ==========================================
   CHANGE MAIN IMAGE
========================================== */

function changeImage(imageId, imageSrc){

    const mainImage = document.getElementById(imageId);

    if(mainImage){

        mainImage.src = imageSrc;

    }

}

/* ==========================================
   GET PAGE ELEMENTS
========================================== */

const vehicleSelect = document.getElementById("vehicleSelect");

const hireType = document.getElementById("hireType");

const days = document.getElementById("days");

const totalPrice = document.getElementById("totalPrice");

const summary = document.getElementById("summary");

const whatsapp = document.getElementById("bookWhatsapp");

const calculateButton = document.getElementById("calculateQuote");

/* ==========================================
   VEHICLE SELECTION
========================================== */

document.querySelectorAll(".selectVehicle").forEach(button=>{

    button.addEventListener("click",()=>{

        vehicleSelect.value = button.dataset.vehicle;

        document.querySelector(".quote-section").scrollIntoView({

            behavior:"smooth"

        });

        calculateQuote();

    });

});

/* ==========================================
   VEHICLE PRICING
========================================== */

const vehicleRates = {

    "Executive Sedan":{

        local:500,
        intercity:1200

    },

    "Executive SUV":{

        local:700,
        intercity:1500

    },

    "Family SUV":{

        local:650,
        intercity:1400

    },

    "Double Cab Pickup":{

        local:800,
        intercity:1800

    },

    "Passenger Minibus":{

        local:1500,
        intercity:2500

    },

    "Luxury SUV":{

        local:1000,
        intercity:2000

    }

};

/* ==========================================
   CALCULATE QUOTE
========================================== */

function calculateQuote(){

    const vehicle = vehicleSelect.value;

    const hire = hireType.value;

    let bookingDays = parseInt(days.value);

    if(isNaN(bookingDays) || bookingDays < 1){

        bookingDays = 1;

        days.value = 1;

    }

    let dailyRate;

    if(hire === "local"){

        dailyRate = vehicleRates[vehicle].local;

    }else{

        dailyRate = vehicleRates[vehicle].intercity;

    }

    const total = dailyRate * bookingDays;

    totalPrice.textContent =

    "ZMW " + total.toLocaleString();

    summary.innerHTML = `

        <strong>${vehicle}</strong><br><br>

        Hire Type: ${hire.charAt(0).toUpperCase() + hire.slice(1)}<br>

        Daily Rate: ZMW ${dailyRate.toLocaleString()}<br>

        Duration: ${bookingDays} Day(s)<br>

        <strong>Total: ZMW ${total.toLocaleString()}</strong>

    `;

    const message =

`Hello Immar Trading,

I would like to hire the ${vehicle}.

Hire Type: ${hire.charAt(0).toUpperCase() + hire.slice(1)}

Daily Rate: ZMW ${dailyRate.toLocaleString()}

Duration: ${bookingDays} day(s)

Estimated Total: ZMW ${total.toLocaleString()}

Please confirm availability.

Thank you.`;

    whatsapp.href =

    "https://wa.me/260977123456?text=" +

    encodeURIComponent(message);

}
/* ==========================================
   PART 2
   EVENTS + INTERACTIONS
========================================== */


/* ==========================================
   CALCULATOR EVENTS
========================================== */


if(calculateButton){

    calculateButton.addEventListener("click",()=>{

        calculateQuote();

    });

}



if(vehicleSelect){

    vehicleSelect.addEventListener("change",()=>{

        calculateQuote();

    });

}



if(hireType){

    hireType.addEventListener("change",()=>{

        calculateQuote();

    });

}



if(days){

    days.addEventListener("input",()=>{

        calculateQuote();

    });

}



/* ==========================================
   INITIAL QUOTE LOAD
========================================== */


if(vehicleSelect && hireType && days){

    calculateQuote();

}



/* ==========================================
   THUMBNAIL ACTIVE STATE
========================================== */


document
.querySelectorAll(".thumbnail-row img")
.forEach(image=>{


    image.addEventListener("click",function(){


        const thumbnailGroup =
        this.parentElement;


        thumbnailGroup
        .querySelectorAll("img")
        .forEach(img=>{


            img.classList.remove(
                "active-thumb"
            );


        });



        this.classList.add(
            "active-thumb"
        );


    });


});



/* ==========================================
   VEHICLE CARD ANIMATION
========================================== */


const fleetCards =
document.querySelectorAll(".fleet-card");



if(
"IntersectionObserver" in window
){


const cardObserver =

new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.style.opacity="1";


            entry.target.style.transform=
            "translateY(0)";


            cardObserver.unobserve(
                entry.target
            );


        }


    });


},{

    threshold:0.15

});



fleetCards.forEach(card=>{


    card.style.opacity="0";


    card.style.transform=
    "translateY(40px)";


    card.style.transition=
    "all .6s ease";


    cardObserver.observe(card);


});



}else{


    fleetCards.forEach(card=>{


        card.style.opacity="1";


    });


}



/* ==========================================
   UPDATE QUOTE WHEN VEHICLE BUTTON CLICKED
========================================== */


document
.querySelectorAll(".selectVehicle")
.forEach(button=>{


    button.addEventListener("click",()=>{


        if(vehicleSelect){


            vehicleSelect.value =
            button.dataset.vehicle;


        }


        calculateQuote();



    });


});



/* ==========================================
   IMAGE PRELOAD CHECK
========================================== */


document
.querySelectorAll(".main-image img")
.forEach(image=>{


    image.addEventListener("error",()=>{


        console.warn(
        "Image failed to load:",
        image.src
        );


    });


});



/* ==========================================
   END OF FLEET.JS
========================================== */