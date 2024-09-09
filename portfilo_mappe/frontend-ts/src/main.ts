import "./style.css";
import { Project } from "./types";

const loadServer = async () => {
  const response = await fetch("http://localhost:3999", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.status);
  console.log(response.ok);

  const data = await response.json();
  console.log(data.data);

  const repositoryList = document.getElementById("jsonData");

  if (repositoryList) {
    repositoryList.innerHTML = "";

    data.data.forEach((project: Project) => {
      const card = document.createElement("article");
      card.classList.add("repository-item");

      const repositoryTitle = document.createElement("h2");
      repositoryTitle.textContent = project.title;
      card.appendChild(repositoryTitle);

      const repositoryURL = document.createElement("a");
      repositoryURL.textContent = "Link here";
      repositoryURL.href = project.url;
      card.appendChild(repositoryURL);

      const description = document.createElement("p");
      description.textContent = project.description;
      card.appendChild(description);

      repositoryList.appendChild(card);
    });
  }
};

const addToData = async (project: Project) => {
  try {
    const response = await fetch("http://localhost:3999", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    console.log(response.status);
    console.log(response.ok);
    const data = await response.json();
    console.log(data);
    loadServer();
  } catch (error) {
    console.error(error);
  }
};

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = (form.elements.namedItem("repoName") as HTMLInputElement)?.value;
  const url = (form.elements.namedItem("repoUrl") as HTMLInputElement)?.value;
  const description = 
    (form.elements.namedItem("repoDescription") as HTMLInputElement)?.value;
  try {
    await addToData({ title, description, url });
  } catch (error) {
    console.log(error);
    
  }
});

loadServer();
