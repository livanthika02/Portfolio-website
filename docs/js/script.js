// ============ CONFIG ============
// Same-origin API since Express serves this frontend. Change this if you
// deploy frontend and backend separately (e.g. Vercel + Render).
const API_BASE = "/api";

// ============ FALLBACK DATA ============
// Used only if the backend/database isn't reachable (e.g. opening this
// file directly in a browser without running the Node server), so the
// portfolio still looks complete offline/for a quick preview.
const FALLBACK_PROJECTS = [
  {
    title: "AI Chat Assistant",
    description:
      "A smart chatbot web app that answers questions in real time using an NLP API, with chat history and a typing-indicator animation.",
    techStack: ["React", "Node.js", "Express", "OpenAI API"],
    image: "🤖",
    color: "#7C3AED",
  },
  {
    title: "E-Commerce Store",
    description:
      "A full online shopping platform with product filtering, cart management, secure checkout, and an admin dashboard.",
    techStack: ["React", "Express.js", "MongoDB", "Stripe"],
    image: "🛒",
    color: "#F97316",
  },
  {
    title: "Weather Forecast App",
    description:
      "A colorful weather dashboard showing live conditions and a 5-day forecast with animated icons based on live API data.",
    techStack: ["JavaScript", "HTML/CSS", "OpenWeather API"],
    image: "⛅",
    color: "#06B6D4",
  },
  {
    title: "Task Manager (To-Do) App",
    description:
      "A drag-and-drop Kanban-style productivity app with categories, deadlines, and progress tracking.",
    techStack: ["React", "Node.js", "MongoDB", "JWT Auth"],
    image: "✅",
    color: "#22C55E",
  },
];

// ============ MOBILE NAV TOGGLE ============
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-links");
burger.addEventListener("click", () => navLinks.classList.toggle("active"));
document.querySelectorAll(".nav-links a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("active"))
);

// ============ TYPING EFFECT (hero role text) ============
const roles = ["Full-Stack Developer", "React Enthusiast", "Backend Builder", "UI Tinkerer"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById("typed-text");

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// ============ FOOTER YEAR ============
document.getElementById("year").textContent = new Date().getFullYear();

// ============ FETCH & RENDER PROJECTS FROM DATABASE (via backend API) ============
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error("Bad response");
    const projects = await res.json();
    renderProjects(projects.length ? projects : FALLBACK_PROJECTS);
  } catch (err) {
    console.warn("Could not reach backend API, showing sample projects instead.", err);
    renderProjects(FALLBACK_PROJECTS);
  }
}

function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  projects.forEach((p) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.setProperty("--card-color", p.color || "#7C3AED");

    const tags = (p.techStack || [])
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-emoji">${p.image || "🚀"}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tech-tags">${tags}</div>
    `;
    grid.appendChild(card);
  });
}

loadProjects();

// ============ CONTACT FORM SUBMISSION ============
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  status.style.color = "#EAB308";
  status.textContent = "Sending...";

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    if (res.ok) {
      status.style.color = "#22C55E";
      status.textContent = data.message || "Message sent successfully! 🎉";
      form.reset();
    } else {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (err) {
    status.style.color = "#EF4444";
    status.textContent = "⚠️ Backend not reachable. Run the server to enable this form.";
  }
});
