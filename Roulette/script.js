let balance = 1000;
let currentBet = 0;
let selectedColor = null;
const segments = [
  "red",
  "green",
  "blue",
  "yellow",
  "red",
  "green",
  "blue",
  "yellow",
];
const multiplier = 2;

function createWheel() {
  const wheel = document.getElementById("wheel");
  wheel.innerHTML = "";
  const segmentCount = segments.length;
  const segmentAngle = 360 / segmentCount;

  segments.forEach((color, index) => {
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.backgroundColor = color;
    segment.style.transform = `rotate(${index * segmentAngle}deg)`;
    wheel.appendChild(segment);
  });
}

function selectColor(color) {
  selectedColor = color;
  document
    .querySelectorAll(".color-btn")
    .forEach((btn) => (btn.style.border = ""));
  event.target.style.border = "3px solid white";
  document.getElementById("spin-btn").disabled = false;
  currentBet = 0;
}

function selectBet(amount) {
  if (amount > balance) {
    alert("You dont have enough balance");
    return;
  } else {
    currentBet = amount;
  }
  
  if (selectedColor != null){
      document
      .querySelectorAll(".bet-btn")
      .forEach((btn) => (btn.style.border = ""));
    event.target.style.border = "3px solid " + selectedColor;
  }
  
}

function updateScore() {
  const scoreText = document.getElementById("score");
  scoreText.innerText = "$ " + balance;
}

function getCurrentRotation(element) {
  const transform = window
    .getComputedStyle(element)
    .getPropertyValue("transform");
  if (transform !== "none") {
    const values = transform.split("(")[1].split(")")[0].split(",");
    const a = values[0],
      b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle; // Ensure positive rotation
  }
  return 90; // Default if no rotation applied
}

function spinWheel() {
  if (!selectedColor) return;

  if (currentBet <= 0) return;

  const wheel = document.getElementById("wheel");
  const resultDiv = document.getElementById("result");
  const resultText = document.getElementById("result_text");
  const spinBtn = document.getElementById("spin-btn");

  spinBtn.disabled = true;

  // Get current rotation angle
  let currentRotation = getRotationFromStyle(wheel);

  // Define the spin (number of segments to move)
  const segmentAngle = 360 / segments.length;
  const randomSegments = Math.floor(Math.random() * segments.length); // Random number of segments
  const targetRotation =
    currentRotation + 360 * 10 + randomSegments * segmentAngle;

  // Apply rotation
  wheel.style.transform = `rotate(${targetRotation}deg)`;

  setTimeout(() => {
    // Get final rotation and determine segment at 270° (bottom)
    let effectiveRotation = getRotationFromStyle(wheel) % 360;
    let bottomAngle = (270 - effectiveRotation + 360) % 360; // Ensure positive angle
    let targetSegment =
      Math.floor(bottomAngle / segmentAngle) % segments.length;
    console.log(targetSegment);

    // Determine result
    const resultColor = segments[targetSegment];
    if (resultColor === selectedColor) {
      balance += currentBet * multiplier;
      updateScore();
      resultText.innerText = `Winner! ${resultColor.toUpperCase()}!`;
      resultDiv.style.display = "flex";
      explode();
      explode();
      resultDiv.style.color = "lime";
    } else {
      balance -= currentBet;
      updateScore();
      resultText.innerText = `Landed on ${resultColor.toUpperCase()}`;
      resultDiv.style.display = "flex";
      resultDiv.style.color = "red";
    }
    updatePrevColor(resultColor);
    // Update balance
    document.getElementById("score").textContent = `$ ${balance}`;

    // Reset selection
    selectedColor = null;
    spinBtn.disabled = false;
    document
      .querySelectorAll(".color-btn")
      .forEach((btn) => (btn.style.border = ""));

    document
      .querySelectorAll(".bet-btn")
      .forEach((btn) => (btn.style.border = ""));

    setTimeout(() => {
      resultDiv.style.display = "none";
    }, 1600);
  }, 6700);
}

function getRotationFromStyle(element) {
  const transform = element.style.transform; // Get the transform string

  if (!transform.includes("rotate")) return 0; // Default to 0 if no rotation

  const match = transform.match(/rotate\(([-\d.]+)deg\)/); // Extract number
  return match ? parseFloat(match[1]) : 0;
}

function updatePrevColor(color){
  const prevContainer = document.getElementById("prev_container");
  const new_color = document.createElement('div')
  new_color.classList.add('prev_color')
  new_color.style.background = color;

  if (prevContainer.children.length > 15){
    // remove first child
    const child = prevContainer.firstChild();
    prevContainer.remove(child);
  } else{
    prevContainer.append(new_color);
  }

  
}
// Initialize the wheel
createWheel();