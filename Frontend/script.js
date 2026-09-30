/* =====================================================
   MACET WEBSITE - COMMON JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. PAGE LOAD
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("MACET Website Loaded Successfully");


    /* =================================================
       2. CURRENT YEAR IN FOOTER
       ================================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =================================================
       3. MOBILE NAVIGATION
       ================================================= */

    const navLinks =
        document.querySelector(".nav-links");

    const navbar =
        document.querySelector(".navbar");


    if (navLinks && navbar) {

        // Create menu button
        const menuButton =
            document.createElement("button");

        menuButton.innerHTML = "☰";

        menuButton.className =
            "menu-button";


        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        navbar.insertBefore(
            menuButton,
            navLinks
        );


        menuButton.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle(
                    "show-menu"
                );

            }
        );


        // Close menu after clicking a link

        const links =
            navLinks.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "show-menu"
                    );

                }
            );

        });

    }

});


/* =====================================================
   4. COURSE DETAILS
   ===================================================== */

function showCourse(course) {

    const detailsSection =
        document.getElementById("courseDetails");

    const detailsContent =
        document.getElementById("detailsContent");


    if (!detailsSection ||
        !detailsContent) {

        return;

    }


    let content = "";


    /* ================= AI & DS ================= */

    if (course === "aids") {

        content = `

            <h2>
                Artificial Intelligence & Data Science
            </h2>

            <p>
                This course focuses on Artificial Intelligence,
                Machine Learning, Data Science and modern
                computational technologies.
            </p>

            <h3>Major Areas</h3>

            <ul>
                <li>Artificial Intelligence</li>
                <li>Machine Learning</li>
                <li>Deep Learning</li>
                <li>Data Analytics</li>
                <li>Python Programming</li>
                <li>Generative AI</li>
            </ul>

        `;

    }


    /* ================= CSE ================= */

    else if (course === "cse") {

        content = `

            <h2>
                Computer Science & Engineering
            </h2>

            <p>
                Computer Science & Engineering focuses on
                software development, programming, databases,
                networking and computer technologies.
            </p>

            <h3>Major Areas</h3>

            <ul>
                <li>Programming</li>
                <li>Data Structures</li>
                <li>Database Management</li>
                <li>Web Development</li>
                <li>Computer Networks</li>
                <li>Cloud Computing</li>
            </ul>

        `;

    }


    /* ================= ECE ================= */

    else if (course === "ece") {

        content = `

            <h2>
                Electronics & Communication Engineering
            </h2>

            <p>
                ECE combines electronics, communication systems,
                embedded systems and modern digital technologies.
            </p>

            <h3>Major Areas</h3>

            <ul>
                <li>Digital Electronics</li>
                <li>Communication Systems</li>
                <li>Embedded Systems</li>
                <li>Microprocessors</li>
                <li>Signal Processing</li>
                <li>IoT</li>
            </ul>

        `;

    }


    /* ================= EEE ================= */

    else if (course === "eee") {

        content = `

            <h2>
                Electrical & Electronics Engineering
            </h2>

            <p>
                EEE deals with electrical systems, power systems,
                electronics and electrical machines.
            </p>

            <h3>Major Areas</h3>

            <ul>
                <li>Electrical Machines</li>
                <li>Power Systems</li>
                <li>Control Systems</li>
                <li>Power Electronics</li>
                <li>Renewable Energy</li>
                <li>Electrical Circuits</li>
            </ul>

        `;

    }


    /* ================= MECHANICAL ================= */

    else if (course === "mech") {

        content = `

            <h2>
                Mechanical Engineering
            </h2>

            <p>
                Mechanical Engineering focuses on machines,
                manufacturing, design and mechanical systems.
            </p>

            <h3>Major Areas</h3>

            <ul>
                <li>Thermodynamics</li>
                <li>Machine Design</li>
                <li>Manufacturing Technology</li>
                <li>Fluid Mechanics</li>
                <li>CAD / CAM</li>
                <li>Automobile Engineering</li>
            </ul>

        `;

    }


    /* ================= CIVIL ================= */

    else if (course === "civil") {

        content = `

            <h2>
                Civil Engineering
            </h2>

            <p>
                Civil Engineering focuses on construction,
                infrastructure, structural design and
                environmental engineering.
            </p>

            <h3>Major Areas</h3>

            <ul>
                <li>Structural Engineering</li>
                <li>Construction Technology</li>
                <li>Surveying</li>
                <li>Geotechnical Engineering</li>
                <li>Transportation Engineering</li>
                <li>Environmental Engineering</li>
            </ul>

        `;

    }


    /* ================= SHOW DETAILS ================= */

    if (content !== "") {

        detailsContent.innerHTML =
            content;


        detailsSection.style.display =
            "block";


        detailsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   5. CLOSE COURSE DETAILS
   ===================================================== */

function closeCourse() {

    const detailsSection =
        document.getElementById("courseDetails");


    if (detailsSection) {

        detailsSection.style.display =
            "none";

    }

}


/* =====================================================
   6. CONTACT FORM
   ===================================================== */

function handleContactForm(event) {

    event.preventDefault();


    const message =
        document.getElementById(
            "contactMessage"
        );


    if (message) {

        message.textContent =
            "Thank you! Your message has been received.";

        message.style.color =
            "green";

    }


    event.target.reset();

}


/* =====================================================
   7. SCROLL TO TOP
   ===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const scrollButton =
            document.getElementById(
                "scrollTopButton"
            );


        if (!scrollButton) {

            return;

        }


        if (window.scrollY > 300) {

            scrollButton.style.display =
                "block";

        } else {

            scrollButton.style.display =
                "none";

        }

    }
);


/* =====================================================
   8. GO TO TOP
   ===================================================== */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   9. ADMISSION PAGE SHORTCUT
   ===================================================== */

function goToAdmission() {

    window.location.href =
        "admission.html";

}


/* =====================================================
   10. ADMIN LOGIN SHORTCUT
   ===================================================== */

function goToAdminLogin() {

    window.location.href =
        "login.html";

}


/* =====================================================
   11. LOGOUT
   ===================================================== */

function logoutUser() {

    window.location.href =
        "login.html";

}


/* =====================================================
   12. SIMPLE FORM VALIDATION
   ===================================================== */

function validateMobileNumber(mobile) {

    return /^[0-9]{10}$/.test(
        mobile
    );

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/* =====================================================
   13. PREVENT MULTIPLE FORM SUBMISSIONS
   ===================================================== */

function disableButton(button) {

    if (!button) {

        return;

    }


    button.disabled = true;

    button.style.opacity =
        "0.6";

}


function enableButton(button) {

    if (!button) {

        return;

    }


    button.disabled = false;

    button.style.opacity =
        "1";

}


/* =====================================================
   END OF SCRIPT
   ===================================================== */

console.log(
    "MACET script.js loaded successfully"
);