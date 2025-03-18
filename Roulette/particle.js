
      // explosion construction
function explode() {
    var particles = 100,
        // explosion container and its reference to be able to delete it on animation end
        explosion = document.createElement("div");
    explosion.classList.add("explosion");

    // put the explosion container into the body to be able to get it's size
    document.getElementById("result").append(explosion);

    // position the container to be centered on click
    explosion.style.left = explosion.style.width + 100 + "px";
    explosion.style.top = explosion.style.height + 100 + "px";

    for (var i = 0; i < particles; i++) {
        // positioning x,y of the particle on the circle (little randomized radius)
        var x =
            explosion.style.width / 2 +
            rand(80, 150) *
            Math.cos(
                (2 * Math.PI * i) / rand(particles - 100, particles + 100)
            ),
        y =
            explosion.style.height / 2 +
            rand(80, 150) *
            Math.sin(
                (2 * Math.PI * i) / rand(particles - 100, particles + 100)
            ),
        color = rand(0, 255) + ", " + rand(0, 255) + ", " + rand(0, 255);

        const elm = document.createElement("div");
        elm.classList.add("particle");
        elm.style.backgroundColor = `rgb(${color})`;
        elm.style.top = y + "px";
        elm.style.left = x + "px";

        setTimeout(() => {
        explosion.remove(); // remove this explosion container when animation ended
        }, 2000);

        explosion.append(elm);
    }
}

// get random number between min and max value
function rand(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}