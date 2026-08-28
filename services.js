/* ==========================================
   IMMAR TRADING - SERVICES PAGE
========================================== */


/* ==========================================
   SERVICE TABS
========================================== */

const serviceTabs =
document.querySelectorAll(".service-tab");


serviceTabs.forEach(tab=>{

    tab.addEventListener("click",()=>{


        /*
           Update active tab.
        */

        serviceTabs.forEach(item=>{

            item.classList.remove("active");

        });


        tab.classList.add("active");


        /*
           Find section.
        */

        const targetId =
        tab.dataset.target;


        const targetSection =
        document.getElementById(targetId);


        if(!targetSection){

            return;

        }


        /*
           Scroll smoothly.
        */

        targetSection.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });


        /*
           Briefly highlight the destination.
        */

        if(
            targetId !== "allServices"
        ){

            targetSection
            .classList
            .remove("tab-highlight");


            /*
               Restart animation.
            */

            void targetSection.offsetWidth;


            targetSection
            .classList
            .add("tab-highlight");


            setTimeout(()=>{

                targetSection
                .classList
                .remove(
                    "tab-highlight"
                );

            },1500);

        }

    });

});


/* ==========================================
   UPDATE TAB WHILE SCROLLING
========================================== */

const trackedSections = [

    {
        id:"corporateServices",
        tab:"corporateServices"
    },

    {
        id:"travelServices",
        tab:"travelServices"
    },

    {
        id:"projectServices",
        tab:"projectServices"
    },

    {
        id:"eventServices",
        tab:"eventServices"
    }

];


if(
    "IntersectionObserver" in window
){

    const sectionObserver =

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(
                    !entry.isIntersecting
                ){

                    return;

                }


                const id =
                entry.target.id;


                const matchingTab =
                document.querySelector(
                    `.service-tab[data-target="${id}"]`
                );


                if(!matchingTab){

                    return;

                }


                serviceTabs.forEach(tab=>{

                    tab.classList
                    .remove("active");

                });


                matchingTab
                .classList
                .add("active");

            });

        },

        {

            threshold:0.30

        }

    );


    trackedSections.forEach(item=>{

        const section =
        document.getElementById(
            item.id
        );


        if(section){

            sectionObserver
            .observe(section);

        }

    });

}


/* ==========================================
   CARD ENTRANCE ANIMATION
========================================== */

const serviceCards =
document.querySelectorAll(
    ".detailed-service-card"
);


if(
    "IntersectionObserver" in window
){

    const cardObserver =

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(
                    entry.isIntersecting
                ){

                    entry.target
                    .classList
                    .add(
                        "service-card-visible"
                    );


                    cardObserver
                    .unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold:0.12

        }

    );


    serviceCards.forEach(card=>{

        card.classList.add(
            "service-card-hidden"
        );


        cardObserver
        .observe(card);

    });

}


/* ==========================================
   END
========================================== */
