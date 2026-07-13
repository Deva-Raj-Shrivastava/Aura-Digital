/*
====================================================
        THE AURA DIGITAL
        MAIN JAVASCRIPT v2.0
        PART 1
----------------------------------------------------
✓ Sticky Header
✓ Smooth Scroll
✓ Active Navigation
✓ Navbar Auto Highlight
====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
        ELEMENTS
    ====================================*/

    const header = document.querySelector(".header");

    const navLinks = document.querySelectorAll(".navbar a");

    const sections = document.querySelectorAll("section[id]");


    /*====================================
        STICKY HEADER
    ====================================*/

    function stickyHeader() {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    /*====================================
        ACTIVE NAVIGATION
    ====================================*/

    function activeNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 140;

            const sectionHeight = section.offsetHeight;

            if (

                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight

            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    /*====================================
        SMOOTH SCROLL
    ====================================*/

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetID = this.getAttribute("href");

            if (!targetID.startsWith("#")) return;

            const target = document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.offsetTop - headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /*====================================
        INITIAL LOAD
    ====================================*/

    stickyHeader();

    activeNavigation();


    /*====================================
        EVENTS
    ====================================*/

    window.addEventListener("scroll", () => {

        stickyHeader();

        activeNavigation();

    });

});

/*
====================================================
        PART 2
        MOBILE NAVIGATION
====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const overlay = document.querySelector(".mobile-overlay");
    const body = document.body;
    const navLinks = document.querySelectorAll(".navbar a");

    if (!menuToggle || !navbar) return;

    function openMenu() {

        navbar.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        body.classList.add("menu-open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

    }

    function closeMenu() {

        navbar.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        body.classList.remove("menu-open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    }

    function toggleMenu() {

        if (navbar.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }

    menuToggle.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

    if (overlay) {

        overlay.addEventListener("click", closeMenu);

    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            closeMenu();

        }

    });

});

/*
====================================================
        PART 3
        SCROLL ANIMATIONS
        BACK TO TOP
====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
        BACK TO TOP
    ====================================*/

    const backTop = document.querySelector(".back-to-top");

    function toggleBackTop() {

        if (!backTop) return;

        if (window.scrollY > 350) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }

    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*====================================
        SCROLL REVEAL
    ====================================*/

    const revealItems = document.querySelectorAll(

        ".why-card, \
         .service-card, \
         .expert-card, \
         .project-card, \
         .price-card, \
         .team-card, \
         .testimonial-card, \
         .contact-info, \
         .contact-form, \
         .faq-card"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    revealItems.forEach((item, index) => {

        item.style.transitionDelay = `${index * 80}ms`;

        observer.observe(item);

    });

    window.addEventListener("scroll", toggleBackTop);

    toggleBackTop();

});

/*
==========================================
        FAQ ACCORDION
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {

        question.addEventListener("click", () => {

            const current = question.parentElement;

            document.querySelectorAll(".faq-item").forEach(item => {

                if (item !== current) {

                    item.classList.remove("active");

                }

            });

            current.classList.toggle("active");

        });

    });

});

/*
==========================================
        CONTACT FORM
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        const inputs = form.querySelectorAll("input, textarea");

        let valid = true;

        inputs.forEach(input => {

            input.style.borderColor = "";

            if (input.value.trim() === "") {

                valid = false;

                input.style.borderColor = "#ef4444";

            }

        });

        if (!valid) {

            e.preventDefault();

            alert("Please fill all required fields.");

        }

    });

});

/*
==========================================
        CAREER FORM
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".career-form form");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        const phone = form.querySelector("#phone");

        const upload = form.querySelector(".upload");

        if (phone && !/^[0-9]{10}$/.test(phone.value)) {

            e.preventDefault();

            alert("Enter a valid 10 digit phone number.");

            return;

        }

        if (upload && upload.files.length > 0) {

            const allowed = ["pdf", "doc", "docx"];

            const ext = upload.files[0].name.split(".").pop().toLowerCase();

            if (!allowed.includes(ext)) {

                e.preventDefault();

                alert("Only PDF, DOC and DOCX files are allowed.");

            }

        }

    });

});

/*
==========================================
        CURRENT YEAR
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const copyright = document.querySelector(".copyright");

    if (!copyright) return;

    copyright.innerHTML = copyright.innerHTML.replace(

        /\d{4}/,

        new Date().getFullYear()

    );

});

/*
==========================================
        LAZY LOADING
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("img").forEach(img => {

        img.loading = "lazy";

        img.decoding = "async";

    });

});


/*
==========================================
        PAGE LOADER
==========================================
*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    loader.classList.add("hide");

});


/*
==========================================
        IMAGE PROTECTION
==========================================
*/

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("contextmenu", (e) => {

        e.preventDefault();

    });

});


/*
==========================================
        PERFORMANCE
==========================================
*/

window.addEventListener(

    "pageshow",

    () => {

        document.body.classList.add("loaded");

    }

);