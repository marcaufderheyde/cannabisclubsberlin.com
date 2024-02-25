function toggleMenu() {
    var navLinks = document.getElementById('navbar').getElementsByClassName('nav-links')[0];
    if (navLinks.style.display === "block") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "block";
    }
}
