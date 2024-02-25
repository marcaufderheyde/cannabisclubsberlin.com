document.addEventListener('DOMContentLoaded', function() {
    if(document.URL.includes("index.html")){
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default anchor click behavior
                let targetSection = document.querySelector(this.getAttribute('href'));
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            let targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function toggleMenu() {
    var navLinks = document.getElementById('navbar').getElementsByClassName('nav-links')[0];
    const isVisible = navLinks.style.display === "block";
    
    if (!isVisible) {
        navLinks.style.display = "block";
        navLinks.style.maxHeight = "0px";
        setTimeout(() => {
            navLinks.style.transition = "max-height 0.5s ease-in";
            navLinks.style.maxHeight = "500px"; // Set this to a value that can accommodate all menu items
        }, 10);
    } else {
        navLinks.style.maxHeight = "0px";
        setTimeout(() => {
            navLinks.style.display = "none";
        }, 500); // Match the timeout to the transition duration
    }
}
