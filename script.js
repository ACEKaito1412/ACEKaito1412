const listId = ["work", "certification"];

function showDiv(id) {
if (id != "work") {
    const div = document.getElementById(id);
    const hide = document.getElementById(listId[0]);

    div.style.display = "block";
    hide.style.display = "none";
}

if (id != "certification") {
    const div = document.getElementById(id);
    const hide = document.getElementById(listId[1]);

    div.style.display = "block";
    hide.style.display = "none";
}
}

showDiv("work");

document.addEventListener("mousemove", function (event) {
const particle = document.createElement("div");
particle.classList.add("particle");
document.getElementById("particle-container").appendChild(particle);

var rotation = Math.floor(Math.random() * 90) + 1;
particle.style.transform = "rotate(" + rotation + "deg)";
// Get scroll offsets
const scrollX = window.scrollX || window.pageXOffset;
const scrollY = window.scrollY || window.pageYOffset;

// Set particle position to mouse coordinates + scroll offsets
particle.style.left = `${event.clientX + scrollX}px`;
particle.style.top = `${event.clientY + scrollY}px`;

// Remove particle after animation ends
particle.addEventListener("animationend", () => {
    particle.remove();
});
});