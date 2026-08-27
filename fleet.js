/* ==========================================
   IMMAR TRADING - FLEET PAGE
   COMPLETE FLEET.JS
========================================== */


/* ==========================================
   PAGE ELEMENTS
========================================== */

const vehicleSelect =
document.getElementById("vehicleSelect");

const hireType =
document.getElementById("hireType");

const days =
document.getElementById("days");

const totalPrice =
document.getElementById("totalPrice");

const summary =
document.getElementById("summary");

const whatsapp =
document.getElementById("bookWhatsapp");

const calculateButton =
document.getElementById("calculateQuote");

const decreaseDays =
document.getElementById("decreaseDays");

const increaseDays =
document.getElementById("increaseDays");


/* ==========================================
   VEHICLE PRICING
========================================== */

/*
   You can change any of these rates later.

   local      = local daily rate
   intercity  = intercity daily rate
*/

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

    "Budget Friendly":{
        local:500,
        intercity:1200
    }

};


/* ==========================================
   IMAGE GALLERY
========================================== */

/*
   Called directly by the thumbnail buttons
   inside fleet.html.

   Example:

   changeImage(
       'familyMain',
       'familysuv2.jpeg',
       this
   );
*/

function changeImage(
    imageId,
    imageSrc,
    button
){

    const mainImage =
    document.getElementById(imageId);


    if(!mainImage){
        return;
    }


    /*
       Fade image slightly while changing.
    */

    mainImage.style.opacity = "0";


    setTimeout(()=>{

        mainImage.src = imageSrc;

        mainImage.style.opacity = "1";

    },150);


    /*
       Update active thumbnail.
    */

    if(button){

        const thumbnailRow =
        button.closest(".thumbnail-row");


        if(thumbnailRow){

            thumbnailRow
            .querySelectorAll(".thumbnail-button")
            .forEach(thumbnail=>{

                thumbnail
                .classList
                .remove("active-thumb");

            });


            button
            .classList
            .add("active-thumb");

        }

    }

}


/* ==========================================
   IMAGE TRANSITION
========================================== */

document
.querySelectorAll(".vehicle-main-image")
.forEach(image=>{

    image.style.transition =
    "opacity .2s ease";

});


/* ==========================================
   FORMAT HIRE TYPE
========================================== */

function getHireLabel(hire){

    if(hire === "local"){

        return "Local Hire";

    }

    if(hire === "intercity"){

        return "Intercity Hire";

    }

    return hire;

}


/* ==========================================
   QUOTE CALCULATOR
========================================== */

function calculateQuote(){

    if(
        !vehicleSelect ||
        !hireType ||
        !days ||
        !totalPrice ||
        !summary
    ){
        return;
    }


    const vehicle =
    vehicleSelect.value;


    const hire =
    hireType.value;


    /*
       IMPORTANT:

       Do NOT automatically replace an empty
       field with 1 here.

       When somebody deletes "1" to type "2",
       the input is temporarily empty.

       Resetting it immediately was the reason
       users could not type another number.
    */

    const bookingDays =
    parseInt(days.value,10);


    if(
        Number.isNaN(bookingDays) ||
        bookingDays < 1
    ){

        return;

    }


    const rates =
    vehicleRates[vehicle];


    if(!rates){

        console.warn(
            "No rental pricing configured for:",
            vehicle
        );

        return;

    }


    const dailyRate =
    hire === "intercity"
    ? rates.intercity
    : rates.local;


    const total =
    dailyRate * bookingDays;


    /*
       Update price.
    */

    totalPrice.textContent =
    `ZMW ${total.toLocaleString()}`;


    /*
       Quote summary.
    */

    const hireLabel =
    getHireLabel(hire);


    summary.innerHTML = `

        <strong>
            ${vehicle}
        </strong>

        <br><br>

        Hire Type:
        ${hireLabel}

        <br>

        Daily Rate:
        ZMW ${dailyRate.toLocaleString()}

        <br>

        Duration:
        ${bookingDays}
        ${bookingDays === 1 ? "Day" : "Days"}

        <br>

        <strong>
            Estimated Total:
            ZMW ${total.toLocaleString()}
        </strong>

    `;


    /*
       WhatsApp booking message.
    */

    const whatsappMessage =

`Hello IMMAR TRADING,

I would like to enquire about hiring a vehicle.

Vehicle: ${vehicle}
Hire Type: ${hireLabel}
Daily Rate: ZMW ${dailyRate.toLocaleString()}
Duration: ${bookingDays} ${bookingDays === 1 ? "day" : "days"}
Estimated Total: ZMW ${total.toLocaleString()}

Please confirm vehicle availability and the final rental quotation.

Thank you.`;


    /*
       Update WhatsApp booking link.
    */

    if(whatsapp){

        whatsapp.href =

        "https://wa.me/260973188676?text=" +

        encodeURIComponent(
            whatsappMessage
        );

    }

}


/* ==========================================
   CALCULATE BUTTON
========================================== */

if(calculateButton){

    calculateButton
    .addEventListener(
        "click",
        calculateQuote
    );

}


/* ==========================================
   VEHICLE DROPDOWN
========================================== */

if(vehicleSelect){

    vehicleSelect
    .addEventListener(
        "change",
        calculateQuote
    );

}


/* ==========================================
   HIRE TYPE DROPDOWN
========================================== */

if(hireType){

    hireType
    .addEventListener(
        "change",
        calculateQuote
    );

}


/* ==========================================
   DAYS - MANUAL TYPING
========================================== */

if(days){

    /*
       While typing:

       Allow blank field temporarily.

       This lets the user delete "1"
       and type "2", "5", "10", etc.
    */

    days.addEventListener(
        "input",
        ()=>{

            if(days.value === ""){

                return;

            }


            let value =
            parseInt(days.value,10);


            if(Number.isNaN(value)){

                return;

            }


            /*
               Do not allow negative numbers.
            */

            if(value < 1){

                return;

            }


            /*
               Maximum 365 days.
            */

            if(value > 365){

                days.value = 365;

            }


            calculateQuote();

        }
    );


    /*
       Validate once user finishes
       editing the field.
    */

    days.addEventListener(
        "blur",
        ()=>{

            let value =
            parseInt(days.value,10);


            if(
                Number.isNaN(value) ||
                value < 1
            ){

                value = 1;

            }


            if(value > 365){

                value = 365;

            }


            days.value = value;


            calculateQuote();

        }
    );


    /*
       Press Enter to calculate.
    */

    days.addEventListener(
        "keydown",
        event=>{

            if(event.key === "Enter"){

                event.preventDefault();

                calculateQuote();

            }

        }
    );

}


/* ==========================================
   MINUS BUTTON
========================================== */

if(
    decreaseDays &&
    days
){

    decreaseDays
    .addEventListener(
        "click",
        ()=>{

            let value =
            parseInt(days.value,10);


            if(Number.isNaN(value)){

                value = 1;

            }


            value =
            Math.max(
                1,
                value - 1
            );


            days.value = value;


            calculateQuote();

        }
    );

}


/* ==========================================
   PLUS BUTTON
========================================== */

if(
    increaseDays &&
    days
){

    increaseDays
    .addEventListener(
        "click",
        ()=>{

            let value =
            parseInt(days.value,10);


            if(Number.isNaN(value)){

                value = 1;

            }


            value =
            Math.min(
                365,
                value + 1
            );


            days.value = value;


            calculateQuote();

        }
    );

}


/* ==========================================
   SELECT VEHICLE BUTTONS
========================================== */

document
.querySelectorAll(".selectVehicle")
.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            if(!vehicleSelect){
                return;
            }


            const selectedVehicle =
            button.dataset.vehicle;


            vehicleSelect.value =
            selectedVehicle;


            /*
               Recalculate immediately.
            */

            calculateQuote();


            /*
               Scroll customer to calculator.
            */

            const quoteSection =
            document.getElementById(
                "instantQuote"
            );


            if(quoteSection){

                quoteSection
                .scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }


            /*
               Visual feedback on button.
            */

            const originalText =
            button.textContent;


            button.textContent =
            "Vehicle Selected ✓";


            button.classList.add(
                "vehicle-selected"
            );


            setTimeout(()=>{

                button.textContent =
                originalText;


                button.classList.remove(
                    "vehicle-selected"
                );

            },1800);

        }
    );

});


/* ==========================================
   THUMBNAIL KEYBOARD SUPPORT
========================================== */

document
.querySelectorAll(".thumbnail-button")
.forEach(button=>{

    button.addEventListener(
        "keydown",
        event=>{

            if(
                event.key === "Enter" ||
                event.key === " "
            ){

                /*
                   onclick already handles
                   the actual image switch.
                */

                event.preventDefault();

                button.click();

            }

        }
    );

});


/* ==========================================
   BROKEN IMAGE CHECK
========================================== */

document
.querySelectorAll(
    ".vehicle-main-image, .thumbnail-button img"
)
.forEach(image=>{

    image.addEventListener(
        "error",
        ()=>{

            console.warn(
                "Vehicle image could not be loaded:",
                image.getAttribute("src")
            );

        }
    );

});


/* ==========================================
   OPTIONAL CARD ANIMATION
========================================== */

const fleetCards =
document.querySelectorAll(
    ".fleet-card"
);


if(
    "IntersectionObserver" in window
){

    const cardObserver =

    new IntersectionObserver(

        entries=>{

            entries.forEach(
                entry=>{

                    if(
                        entry.isIntersecting
                    ){

                        entry.target
                        .classList
                        .add(
                            "fleet-card-visible"
                        );


                        cardObserver
                        .unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold:0.12
        }

    );


    fleetCards
    .forEach(card=>{

        card.classList.add(
            "fleet-card-hidden"
        );

        cardObserver.observe(
            card
        );

    });

}
else{

    fleetCards
    .forEach(card=>{

        card.classList.add(
            "fleet-card-visible"
        );

    });

}


/* ==========================================
   INITIAL QUOTE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        /*
           Ensure initial Days value is valid.
        */

        if(days){

            const initialDays =
            parseInt(days.value,10);


            if(
                Number.isNaN(initialDays) ||
                initialDays < 1
            ){

                days.value = 1;

            }

        }


        /*
           Generate first quote immediately.
        */

        calculateQuote();

    }
);


/* ==========================================
   END OF FLEET.JS
========================================== */
