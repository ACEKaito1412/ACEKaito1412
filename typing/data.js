const inputDiv = document.getElementById("sql_input");
const textDiv = document.getElementById("sql_text");
const marker = document.getElementById("sql_blinking");
let inputbrTrig = false;
let dataList = [];
let nQuery = 0;

async function loadData() {
  try {
    const response = await fetch("./data.json"); // Load the JSON file
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse JSON
    dataList = data.queries;
    createText();
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

loadData();

function createText() {
  if (nQuery == dataList.length) {
    nQuery = 0;
  }

  let text = dataList[nQuery].query;
  inputbrTrig = false;
  nQuery += 1;
  textDiv.innerHTML = "";
  let brTrig = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const elm = document.createElement("span");
    elm.innerText = char;
    textDiv.append(elm);
    if (i > 25 && char == " " && !brTrig) {
      const br = document.createElement("br");
      textDiv.append(br);
      brTrig = true;
    }
  }
}

document.addEventListener("keypress", (event) => {
  if (inputDiv.children.length - 1 == textDiv.children.length) {
    const a = getAllText(inputDiv);
    const b = getAllText(textDiv);

    if (a == b) {
      createText();
      removeElementChild(inputDiv, marker);
    }
  }

  const key = event.key;

  if (key.length > 1) {
    return;
  }
  const elm = document.createElement("span");
  elm.innerText = key;
  elm.classList.add("sql_text");
  const curIndex = inputDiv.children.length - 1;
  const curLetter = textDiv.children[curIndex];

  if (curIndex > 25 && key == " " && !inputbrTrig) {
    const br = document.createElement("br");
    marker.before(br);
    inputbrTrig = true;
  }

  if (key !== curLetter.innerText) {
    curLetter.style.color = "lightcoral";
    elm.style.color = "lightcoral";
  } else {
    curLetter.style.color = "lime";
    elm.style.color = "lime";
  }
  marker.before(elm);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    let child = marker.previousElementSibling;
    if (child.tagName == "BR") {
      inputDiv.removeChild(child);
      child = inputDiv.lastChild;
      inputDiv.removeChild(child);
      inputbrTrig = false;
    } else {
      inputDiv.removeChild(child);
    }

    const curIndex = inputDiv.children.length - 1;
    const curLetter = textDiv.children[curIndex];
    curLetter.style.color = "lightskyblue";
  }
});

function removeElementChild(parentElement, skipElement) {
  const items = parentElement.children;
  Array.from(items).forEach((element) => {
    if (element != skipElement) {
      parentElement.removeChild(element);
    }
  });
}

function getAllText(parentDiv) {
  const items = parentDiv.children;
  let text_ = "";
  Array.from(items).forEach((element) => {
    if (element.tagName == "SPAN") {
      text_ += element.innerText;
    }
  });
}

function isMobile() {
  if(window.innerWidth <= 768){
      
  }
}

