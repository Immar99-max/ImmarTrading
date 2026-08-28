document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;


    /* =========================
       PREVENT PAST DATES
    ========================= */

    const contactDate = document.getElementById("contactDate");

    if (contactDate) {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        contactDate.min = `${year}-${month}-${day}`;
    }


    /* =========================
       FORM SUBMISSION
    ========================= */

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document
            .getElementById("contactName")
            .value
            .trim();

        const phone = document
            .getElementById("contactPhone")
            .value
            .trim();

        const service = document
            .getElementById("contactService")
            .value;

        const vehicle = document
            .getElementById("contactVehicle")
            .value;

        const date = document
            .getElementById("contactDate")
            .value;

        const days = document
            .getElementById("contactDays")
            .value;

        const destination = document
            .getElementById("contactDestination")
            .value
            .trim();

        const additionalDetails = document
            .getElementById("contactMessage")
            .value
            .trim();


        /* =========================
           VALIDATION
        ========================= */

        if (!name) {
            alert("Please enter your full name.");
            document.getElementById("contactName").focus();
            return;
        }

        if (!phone) {
            alert("Please enter your phone number.");
            document.getElementById("contactPhone").focus();
            return;
        }

        if (!service) {
            alert("Please select a service.");
            document.getElementById("contactService").focus();
            return;
        }


        /* =========================
           FORMAT DATE
        ========================= */

        let formattedDate = "Not specified";

        if (date) {
            const parts = date.split("-");

            if (parts.length === 3) {
                formattedDate =
                    `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }


        /* =========================
           NUMBER OF DAYS
        ========================= */

        let numberOfDays = "Not specified";

        if (days) {

            const parsedDays = parseInt(days, 10);

            if (isNaN(parsedDays) || parsedDays < 1) {
                alert("Number of days must be at least 1.");
                document.getElementById("contactDays").focus();
                return;
            }

            numberOfDays = parsedDays;
        }


        /* =========================
           BUILD WHATSAPP MESSAGE
        ========================= */

        let message =
`Hello IMMAR TRADING,

I would like to make a vehicle hire enquiry.

CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}

BOOKING DETAILS

Service: ${service}
Preferred Vehicle: ${vehicle || "Not selected"}
Preferred Date: ${formattedDate}
Number of Days: ${numberOfDays}
Destination: ${destination || "Not specified"}`;


        if (additionalDetails) {

            message +=
`

ADDITIONAL DETAILS

${additionalDetails}`;

        }


        message +=
`

Please confirm vehicle availability and provide the applicable quotation.

Thank you.`;


        /* =========================
           OPEN WHATSAPP
        ========================= */

        const whatsappNumber = "260973188676";

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank"
        );

    });


    /* =========================
       DAYS INPUT
    ========================= */

    const daysInput = document.getElementById("contactDays");

    if (daysInput) {

        daysInput.addEventListener("input", function () {

            if (this.value === "") return;

            const value = parseInt(this.value, 10);

            if (value > 365) {
                this.value = 365;
            }

        });


        daysInput.addEventListener("blur", function () {

            if (this.value === "") return;

            const value = parseInt(this.value, 10);

            if (isNaN(value) || value < 1) {
                this.value = 1;
            }

        });

    }


    /* =========================
       AUTO SELECT FROM URL
    ========================= */

    const params = new URLSearchParams(window.location.search);

    const requestedService = params.get("service");
    const requestedVehicle = params.get("vehicle");


    /* SERVICE */

    const serviceSelect =
        document.getElementById("contactService");

    if (requestedService && serviceSelect) {

        const options =
            Array.from(serviceSelect.options);

        const matchingOption =
            options.find(function (option) {

                return option.value.toLowerCase() ===
                    requestedService.toLowerCase();

            });

        if (matchingOption) {
            serviceSelect.value = matchingOption.value;
        }

    }


    /* VEHICLE */

    const vehicleSelect =
        document.getElementById("contactVehicle");

    if (requestedVehicle && vehicleSelect) {

        const options =
            Array.from(vehicleSelect.options);

        const matchingOption =
            options.find(function (option) {

                return option.value.toLowerCase() ===
                    requestedVehicle.toLowerCase();

            });

        if (matchingOption) {
            vehicleSelect.value = matchingOption.value;
        }

    }

});