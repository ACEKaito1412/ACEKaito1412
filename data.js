// Function to fetch data from JSON file
async function loadData() {
  try {
    const response = await fetch("data.json"); // Load the JSON file
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse JSON

    displayWork(data.work);
    displayStudies(data.studies);
    displayProject(data.projects);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

// Function to display work experience
function displayWork(workData) {
  const workList = document.getElementById("work-container");
  workList.innerHTML = ""; // Clear existing content

  workData.forEach((job) => {
    const div_main = document.createElement("div");
    const div_sec = document.createElement("div");
    const div_third = document.createElement("div");
    const title = document.createElement("h6");
    const company = document.createElement("p");
    const date = document.createElement("p");
    const skill = document.createElement("p");

    div_main.classList.add(
      "d-flex",
      "gap-3",
      "py-3",
      "border-0",
      "bg-transparent"
    );
    div_sec.classList.add(
      "d-flex",
      "gap-2",
      "w-100",
      "justify-content-start",
      "align-items-center"
    );

    title.classList.add("mb-0", "text-uppercase");
    company.classList.add("mb-0", "opacity-75", "text-secondary");
    date.classList.add("mb-0", "opacity-75", "text-secondary");
    skill.classList.add("mb-0", "secondary-text", "fw-bold", "opacity-75");

    title.innerHTML = `${job.position}`;
    company.innerHTML = `${job.company}`;
    date.innerHTML = `${job.start_date} - ${job.end_date}`;

    const skill_list = job.skills;
    skill_list.forEach((name) => {
      const span = document.createElement("span");
      span.classList.add("me-2");
      span.innerHTML = name;

      skill.appendChild(span);
    });

    div_third.appendChild(title);
    div_third.appendChild(company);
    div_third.appendChild(skill);
    div_third.appendChild(date);

    div_sec.appendChild(div_third);
    div_main.appendChild(div_sec);
    workList.appendChild(div_main);
  });
}

// Function to display studies
function displayStudies(workData) {
  const workList = document.getElementById("cert-container");
  workList.innerHTML = ""; // Clear existing content

  workData.forEach((job) => {
    const div_main = document.createElement("div");
    const div_sec = document.createElement("div");
    const div_third = document.createElement("div");
    const field = document.createElement("h6");
    const institution = document.createElement("p");
    const topic = document.createElement("div");

    div_main.classList.add(
      "d-flex",
      "gap-3",
      "py-3",
      "border-0",
      "bg-transparent"
    );
    div_sec.classList.add(
      "d-flex",
      "gap-2",
      "w-100",
      "justify-content-start",
      "align-items-center"
    );

    field.classList.add("mb-0", "text-uppercase");
    institution.classList.add("mb-0", "opacity-75", "text-secondary");
    topic.classList.add(
      "mb-0",
      "secondary-text",
      "fw-bold",
      "opacity-75",
      "d-flex",
      "flex-wrap"
    );

    field.innerHTML = `${job.field}`;
    institution.innerHTML = `${job.institution}`;

    var button;
    if (job.link == "") {
      button = document.createElement("button");
      button.classList.add(
        "btn",
        "btn-sm",
        "btn-outline-secondary",
        "no-hover",
        "mt-2"
      );
      button.dissabled = true;
      button.innerHTML = "View Certificate";
      button.target = "_blank";
      button.style.cursor = "not-allowed";
      button.style.opacity = "0.5";
    } else {
      button = document.createElement("a");
      button.classList.add("btn", "btn-outline-secondary", "btn-sm", "mt-2");
      button.innerHTML = "View Certificate";
      button.target = "_blank";
      button.href = `${job.link}`;
    }

    const topic_list = job.topics;
    topic_list.forEach((name) => {
      const span = document.createElement("span");
      span.classList.add("me-2");

      span.innerHTML = name;

      topic.appendChild(span);
    });

    div_third.appendChild(field);
    div_third.appendChild(institution);
    div_third.appendChild(topic);
    div_third.appendChild(button);

    div_sec.appendChild(div_third);
    div_main.appendChild(div_sec);
    workList.appendChild(div_main);
  });
}

function displayProject(projectData) {
  const project_list = document.getElementById("project-container");
  project_list.innerHTML = ""; // Clear existing content

  var count = 0
  const div_monsry_1 = document.createElement("div");
  const div_monsry_2 = document.createElement("div");

  div_monsry_1.classList.add("col-8", "col-md-6")
  div_monsry_2.classList.add("col-8", "col-md-6")
  projectData.forEach((project) => {
    const div_main = document.createElement("div");
    const div_sec = document.createElement("div");
    const div_image = document.createElement("div");
    const div_skill = document.createElement("div");
    const div_description = document.createElement("div");
    const div_button = document.createElement("div");
    const image = document.createElement("img")
    const title = document.createElement("h5");
    const description = document.createElement("p");
    const link = document.createElement("a");

    div_main.classList.add(
      "bg-transparent"
    );

    div_sec.classList.add(
      "d-flex", "flex-column", "justify-content-center", "align-items-center","border", "m-2", "p-2", "rounded"
    );

    div_image.classList.add(
        "opacity-75", "col-11", "d-flex", "justify-content-center", "overflow-hidden"
    );

    div_image.style.height = "200px";

    image.style.height = "250px";

    div_description.classList.add(
        "px-0", "col-11", "m-3", "row", "d-flex", "align-content-between"
    );

    div_skill.classList.add(
        "d-flex", "flex-row", "flex-wrap", "gap-2", "mt-2"
    );
    div_skill.style.lineHeight = "1px";

    title.classList.add("card-title")
    description.classList.add(
       "card-text", "text-secondary", "d-none", "d-md-block", "mt-2" 
    );

    link.classList.add(
        "btn", "btn-outline-secondary", "btn-sm"
    );
    link.innerHTML = "Check on GitHub >"

    title.innerHTML = `${project.title}`;
    description.innerHTML = `${project.description}`;
    image.src = `${project.images_uri[0]}`


    const skill_list = project.skills;
    skill_list.forEach((name) => {
      const p = document.createElement("p");
      p.classList.add("fw-bold","secondary-text");
      p.innerHTML = name;

      div_skill.appendChild(p);
    });

    link.href = `${project.link}`;
    div_button.appendChild(link);

    div_image.appendChild(image);
    div_description.append(title);
    div_description.append(description)
    div_description.append(div_skill)
    
    div_description.append(div_button)

    div_sec.append(div_image)
    div_sec.append(div_description)

    div_main.append(div_sec)

    if (count == 0){
        div_monsry_1.append(div_main)
        count++;
    }else{
        div_monsry_2.append(div_main)
        count = 0;
    }
  });
  project_list.appendChild(div_monsry_1);
  project_list.appendChild(div_monsry_2);
}

// Load JSON data on page load
loadData();
