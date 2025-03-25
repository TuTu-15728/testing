// Function to include HTML dynamically
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                        setActiveLink();  // After navbar is loaded, set the active class
                        handleModal(); // Call modal handler after the navbar is loaded
                    } else if (this.status == 404) {
                        // First attempt: Try loading the file from the "pages" folder
                        xhttp.open("GET", "pages/" + file, true);  // Correct relative path
                        xhttp.send();
                    }

                      else {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("include-html");
                    includeHTML(); // Recursive call for loading other elements
                }

            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return; // Exit the function once the request is made
        }
    }
}

// Function to highlight the active link based on the current URL
function setActiveLink() {
    const navLinks = document.querySelectorAll(".nav-link");
    let currentUrl = window.location.pathname;

    if (currentUrl.startsWith("/testing/")) {
        currentUrl = currentUrl.substring(9);
    }
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        // Log each link's href to compare
        console.log(currentUrl, linkPath);
        if (linkPath === currentUrl) {
            link.classList.add("active");
        } else {
            // console.log(currentUrl, linkPath);
            link.classList.remove("active");
        }
    });
}

// Function to handle modal open and close actions
function handleModal() {
    const modal = document.getElementById("myModal");
    const enquiryLink = document.getElementById("enquiryLink");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Ensure modal and enquiryLink are available before adding event listeners
    if (enquiryLink && modal && closeBtn) {
        // Open the modal when the enquiry link is clicked
        enquiryLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior
            modal.style.display = "block"; // Show the modal
        });

        // Close the modal when the user clicks on the close button (×)
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none"; // Hide the modal
        });

        // Close the modal when the user clicks anywhere outside the modal content
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none"; // Hide the modal if user clicks outside
            }
        });
    } else {
        console.error("Modal or enquiry link not found");
    }
}

// Ensure the JS runs after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Call the includeHTML function to load the navbar
    includeHTML();
});

window.onload = function() {
        const hash = window.location.hash;
        
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                // Scroll to the target section, adjusted for the header height
                window.scrollTo({
                    top: target.offsetTop - 80,  // Adjust 80 based on your header's height
                    behavior: 'smooth'
                });
            }
        }
    };
