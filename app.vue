<script setup lang="ts">
type TemplateName = "classic" | "modern" | "compact" | "executive" | "sidebar";

interface ExperienceItem {
  role: string;
  company: string;
  start: string;
  end: string;
  current: boolean;
  location: string;
  highlights: string;
}

interface EducationItem {
  degree: string;
  school: string;
  year: string;
  location: string;
  details: string;
}

interface ProfileLink {
  label: string;
  url: string;
}

interface ResumeDraft {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  skills: string;
  certifications: string;
  template: TemplateName;
  color: string;
  zoom: number;
  links: ProfileLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

const STORAGE_KEY = "resume-studio-draft-v3";

const sampleData: ResumeDraft = {
  name: "Govinda Mandal",
  title: "Senior Full Stack Developer",
  email: "govinda4india@gmail.com",
  phone: "",
  location: "Delhi, India",
  website: "",
  summary:
    "Full Stack Engineer with 8+ years of experience architecting and delivering production-grade backend systems at scale. Deep expertise in Node.js microservices, event-driven architectures with Apache Kafka, MongoDB schema design and query optimisation, and cloud-native deployments on AWS with Kubernetes. Proven track record of designing RESTful APIs, implementing CI/CD pipelines, and leading cross-functional engineering teams. Strong independent problem-solver with an ownership mindset.",
  skills:
    "Node.js, TypeScript, JavaScript, Java, PHP, Python, MongoDB, PostgreSQL, MySQL, Apache Kafka, WebSocket, REST API, AWS Lambda, EC2, S3, Lightsail, AWS CodePipeline, Kubernetes, Docker, CI/CD, NestJS, Express.js, Feathers.js, Vue.js, Nuxt.js, React, Next.js, CodeIgniter, Laravel, Git, Agile/Scrum, JIRA, GraphQL, Webpack, Storybook, Redis, tRPC, OAuth 2.0, JWT, Claude, Cursor, GitHub Copilot, Windsurf",
  certifications:
    "Distributed Systems Design, Event-Driven Architecture with Kafka, MongoDB Schema and Query Optimisation, Kubernetes Deployments, CI/CD Pipeline Automation, Node.js Internals and Async Workflows, Microservices Architecture, RESTful API Design and Governance, Cloud-Native Development with AWS, Root Cause Analysis and Debugging, Agile/Scrum Delivery, Technical Mentorship and Code Review",
  template: "classic",
  color: "#2563eb",
  zoom: 78,
  links: [
    { label: "LinkedIn", url: "" },
    { label: "GitHub", url: "" },
    { label: "Other Social Profile", url: "" }
  ],
  experience: [
    {
      role: "Senior Software Consultant",
      company: "Propulsion Consultancy Service (Client: Golf District)",
      start: "2025-01",
      end: "2026-04",
      current: false,
      location: "Indore, India (Remote)",
      highlights:
        "Redesigned the Golf District admin portal from the ground up using TypeScript, Next.js, React, tRPC, Node.js, and MySQL\nBuilt and shipped 12+ admin modules including course management, providers, customers, bookings, live tee sheets, reports, and analytics\nIntegrated AWS Lambda and S3 for serverless compute and media/document storage\nImplemented Redis caching strategies for high-frequency read operations\nEstablished CI/CD pipelines with Docker for consistent deployments across development and production\nCollaborated with stakeholders in an Agile/JIRA-driven workflow to turn business requirements into scalable technical solutions\nStack: TypeScript, Node.js, React, Next.js, tRPC, MySQL, AWS Lambda, S3, Redis, Docker, CI/CD, REST API, Agile/JIRA"
    },
    {
      role: "Senior Software Engineer",
      company: "First Due",
      start: "2024-07",
      end: "2024-10",
      current: false,
      location: "Hyderabad, India (Remote)",
      highlights:
        "Optimised RESTful APIs in PHP/Node.js for a Fire Management System, achieving a 40% reduction in client integration time\nDesigned and tuned SQL schemas and indexes, improving data retrieval performance and scalability by 25%\nBuilt a reusable Vue.js component library integrated with Storybook, increasing user engagement by 30%\nConducted systematic code reviews and integration testing, improving software reliability by 20%\nStack: Node.js, PHP, YII, PostgreSQL, Vue.js, Docker, Storybook, REST API, Git, Agile/JIRA"
    },
    {
      role: "Analyst Software Developer",
      company: "ValueLabs",
      start: "2022-05",
      end: "2024-02",
      current: false,
      location: "Hyderabad, India (Remote)",
      highlights:
        "Implemented and optimised RESTful APIs in Node.js, reducing client integration time by 40% across diverse platforms\nDesigned MongoDB and PostgreSQL schemas with indexing strategies that improved query performance by 25%\nDeveloped intuitive Vue.js interfaces, boosting user engagement by 30% across enterprise applications\nAchieved an 85-90% on-time delivery rate across multiple concurrent feature streams\nTrained and mentored 8 new engineers on scalable API development with Node.js and Next.js; conducted regular code reviews\nStack: Node.js, Vue.js, Next.js, MongoDB, PostgreSQL, REST API, Git, Agile/JIRA"
    },
    {
      role: "Lead Developer",
      company: "Infoicon Technologies",
      start: "2021-06",
      end: "2022-03",
      current: false,
      location: "Noida, India",
      highlights:
        "Led end-to-end delivery of a MERN-based Job Manager from architecture through Kubernetes deployment, driving a 25% increase in client satisfaction\nArchitected Feathers.js microservices with PostgreSQL, exposing REST and WebSocket APIs consumed by Nuxt.js frontends\nBuilt a real-time chat application with text, audio, and video using Node.js and WebSockets, supporting 5,000+ concurrent users\nImplemented 3D geospatial mesh views using Vue.js, THREE.js, and Mapbox GL\nMentored junior engineers on JavaScript, PHP, Laravel, CodeIgniter, Vue.js, and Node.js best practices\nStack: Node.js, MongoDB, PostgreSQL, Feathers.js, Nuxt.js, Vuetify, Vue.js, THREE.js, WebSocket, Kubernetes, REST API"
    },
    {
      role: "Programmer",
      company: "Binary Semantics Limited",
      start: "2020-03",
      end: "2021-06",
      current: false,
      location: "Gurugram, India",
      highlights:
        "Delivered solutions for NerdsDesk CRM, NerdsShop E-Commerce, and SupportNerds Tech Support using PHP, Laravel, and CodeIgniter\nManaged seven parallel projects across CRM, E-Commerce, and blog platforms while maintaining code quality and client SLAs\nCollaborated with QA and design teams to identify defects and improve overall system performance\nStack: PHP, Laravel, CodeIgniter, Vue.js, Node.js, MySQL, WordPress, HTML/CSS, Git"
    },
    {
      role: "Software Engineer",
      company: "Webkul Software Pvt Ltd",
      start: "2017-07",
      end: "2020-03",
      current: false,
      location: "Noida, India",
      highlights:
        "Developed 15+ production extensions for Shopware 6 and OpenCart E-Commerce platforms including POS, Marketplace, QuickBooks Connector, and payment gateways\nBuilt Seller-Buyer Chat and Admin-Buyer Chat modules using Node.js, PHP, and MySQL for real-time in-platform messaging\nTrained 10+ developers on OpenCart and Shopware 6 extension development and established modular PHP best practices\nImplemented CI/CD pipelines with Docker for consistent deployments across development and staging\nStack: PHP, Symfony, Node.js, Vue.js, OpenCart, Shopware 6, MySQL, Docker, CI/CD, REST API, Git"
    }
  ],
  education: [
    {
      degree: "B.E. in Information Technology",
      school: "RGTU",
      year: "Jun 2016",
      location: "Bhopal, India",
      details: ""
    }
  ]
};

const cloneDraft = (draft: ResumeDraft): ResumeDraft => JSON.parse(JSON.stringify(draft)) as ResumeDraft;

const resume = reactive<ResumeDraft>(cloneDraft(sampleData));
const activeTab = ref("profile");
const saveState = ref("Saved");
const importInput = ref<HTMLInputElement | null>(null);
let saveTimer: ReturnType<typeof setTimeout> | undefined;

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "style", label: "Style" }
];

const templateOptions: Array<{ value: TemplateName; label: string; description: string }> = [
  { value: "classic", label: "Classic", description: "Original balanced resume layout" },
  { value: "modern", label: "Modern", description: "Bold header with clean sections" },
  { value: "compact", label: "Compact", description: "Dense layout for longer careers" },
  { value: "executive", label: "Executive", description: "Refined serif headings and spacing" },
  { value: "sidebar", label: "Sidebar", description: "Two-column profile-first resume" }
];

const colors = [
  { value: "#2563eb", label: "Blue" },
  { value: "#0f766e", label: "Teal" },
  { value: "#9333ea", label: "Violet" },
  { value: "#be123c", label: "Rose" },
  { value: "#334155", label: "Slate" }
];

const contacts = computed(() => [resume.email, resume.phone, resume.location, resume.website].filter(Boolean));
const skills = computed(() => splitList(resume.skills));
const certifications = computed(() => splitList(resume.certifications));
const profileLinks = computed(() => resume.links.filter((link) => link.label || link.url));
const previewTitle = computed(() => (resume.name ? `${resume.name}'s resume` : "Untitled resume"));
const previewClass = computed(() => `resume-paper template-${resume.template}`);
const accentStyle = computed(() => ({ "--accent": resume.color, "--zoom": String(resume.zoom / 100) }));

const resumeScore = computed(() => {
  const checks = [
    resume.name,
    resume.title,
    resume.email,
    resume.summary.length > 80,
    resume.experience.some((item) => item.role && item.company && item.highlights),
    resume.education.some((item) => item.degree && item.school),
    profileLinks.value.length >= 2,
    skills.value.length >= 5,
    splitLines(resume.experience.map((item) => item.highlights).join("\n")).length >= 4
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
});

const scoreText = computed(() => {
  if (resumeScore.value >= 90) return "Strong resume. It is ready to tailor for a specific job.";
  if (resumeScore.value >= 65) return "Good foundation. Add measurable highlights for more impact.";
  return "Complete the basics to improve your resume score.";
});

function splitList(value = "") {
  return value
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value = "") {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function linkHref(url: string) {
  if (!url) return "";
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
  return `https://${url}`;
}

function formatMonthYear(value: string) {
  if (!value) return "";
  if (!/^\d{4}-\d{2}$/.test(value)) return value;

  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(year, month - 1));
}

function formatDateRange(start: string, end: string, current = false) {
  const formattedStart = formatMonthYear(start);
  const formattedEnd = current ? "Present" : formatMonthYear(end);
  return [formattedStart, formattedEnd].filter(Boolean).join(" - ");
}

function assignDraft(nextDraft: ResumeDraft) {
  Object.assign(resume, cloneDraft(nextDraft));
}

function addExperience() {
  resume.experience.push({ role: "", company: "", start: "", end: "", current: false, location: "", highlights: "" });
}

function addEducation() {
  resume.education.push({ degree: "", school: "", year: "", location: "", details: "" });
}

function addLink() {
  resume.links.push({ label: "", url: "" });
}

function clearDraft() {
  assignDraft({
    ...cloneDraft(sampleData),
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    skills: "",
    certifications: "",
    links: [],
    experience: [],
    education: []
  });
}

function loadSample() {
  assignDraft(sampleData);
}

function exportJson() {
  const blob = new Blob([JSON.stringify(toRaw(resume), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${(resume.name || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-draft.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importJson(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text()) as Partial<ResumeDraft>;
    assignDraft({ ...cloneDraft(sampleData), ...imported });
  } catch {
    window.alert("That JSON file could not be imported.");
  } finally {
    target.value = "";
  }
}

function downloadPdf() {
  window.print();
}

watch(
  resume,
  () => {
    if (!import.meta.client) return;
    saveState.value = "Saving...";
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toRaw(resume)));
      saveState.value = "Saved";
    }, 250);
  },
  { deep: true }
);

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    assignDraft({ ...cloneDraft(sampleData), ...JSON.parse(saved) });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
});
</script>

<template>
  <div class="app-shell" :style="accentStyle">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Resume Studio home">
        <span class="brand-mark">R</span>
        <span>
          <strong>Resume Studio</strong>
          <small>Nuxt resume builder</small>
        </span>
      </a>
      <nav class="top-actions" aria-label="Primary actions">
        <button class="ghost-button" type="button" @click="loadSample">Load sample</button>
        <label class="ghost-button file-button" for="importFile">Import JSON</label>
        <input id="importFile" ref="importInput" type="file" accept="application/json" @change="importJson" />
        <button class="ghost-button" type="button" @click="exportJson">Export JSON</button>
        <button class="primary-button" type="button" @click="downloadPdf">Download PDF</button>
      </nav>
    </header>

    <main class="workspace">
      <aside class="builder-panel" aria-label="Resume editor">
        <div class="builder-heading">
          <div>
            <p class="eyebrow">Build step by step</p>
            <h1>Create a polished resume</h1>
          </div>
          <div class="save-state">{{ saveState }}</div>
        </div>

        <div class="tab-list" role="tablist" aria-label="Editor sections">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab"
            :class="{ active: activeTab === tab.id }"
            type="button"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <form autocomplete="on" @submit.prevent>
          <section v-show="activeTab === 'profile'" class="form-section active">
            <label>
              Full name
              <input v-model="resume.name" name="name" placeholder="Govinda Mandal" />
            </label>
            <label>
              Professional title
              <input v-model="resume.title" name="title" placeholder="Product Designer" />
            </label>
            <div class="field-grid">
              <label>
                Email
                <input v-model="resume.email" name="email" type="email" placeholder="avery@email.com" />
              </label>
              <label>
                Phone
                <input v-model="resume.phone" name="phone" placeholder="Optional" />
              </label>
            </div>
            <div class="field-grid">
              <label>
                Location
                <input v-model="resume.location" name="location" placeholder="Delhi" />
              </label>
              <label>
                Website
                <input v-model="resume.website" name="website" placeholder="portfolio.com" />
              </label>
            </div>
            <label>
              Summary
              <textarea v-model="resume.summary" name="summary" rows="6" placeholder="Write a concise professional summary..." />
            </label>
            <div class="section-row">
              <h2>Profile links</h2>
              <button class="small-button" type="button" @click="addLink">Add link</button>
            </div>
            <div class="dynamic-list">
              <article v-for="(link, index) in resume.links" :key="index" class="editor-card">
                <div class="card-actions">
                  <strong>Link</strong>
                  <button class="icon-button" type="button" aria-label="Remove link" @click="resume.links.splice(index, 1)">x</button>
                </div>
                <div class="field-grid">
                  <label>Label<input v-model="link.label" placeholder="LinkedIn" /></label>
                  <label>URL<input v-model="link.url" placeholder="https://linkedin.com/in/..." /></label>
                </div>
              </article>
            </div>
          </section>

          <section v-show="activeTab === 'experience'" class="form-section active">
            <div class="section-row">
              <h2>Work history</h2>
              <button class="small-button" type="button" @click="addExperience">Add role</button>
            </div>
            <div class="dynamic-list">
              <article v-for="(item, index) in resume.experience" :key="index" class="editor-card">
                <div class="card-actions">
                  <strong>Role</strong>
                  <button class="icon-button" type="button" aria-label="Remove role" @click="resume.experience.splice(index, 1)">x</button>
                </div>
                <div class="field-grid">
                  <label>Job title<input v-model="item.role" placeholder="Senior Product Designer" /></label>
                  <label>Company<input v-model="item.company" placeholder="Bright Labs" /></label>
                </div>
                <div class="field-grid">
                  <label>Start<input v-model="item.start" type="month" /></label>
                  <label>End<input v-model="item.end" type="month" :disabled="item.current" /></label>
                </div>
                <label class="checkbox-label">
                  <input v-model="item.current" type="checkbox" @change="item.current ? (item.end = '') : item.end" />
                  <span>Current job / presently working here</span>
                </label>
                <label>Location<input v-model="item.location" placeholder="Remote" /></label>
                <label>
                  Highlights
                  <textarea
                    v-model="item.highlights"
                    rows="5"
                    placeholder="Led redesign that increased activation by 18%&#10;Built component library used by 14 teams"
                  />
                </label>
              </article>
            </div>
          </section>

          <section v-show="activeTab === 'education'" class="form-section active">
            <div class="section-row">
              <h2>Education</h2>
              <button class="small-button" type="button" @click="addEducation">Add school</button>
            </div>
            <div class="dynamic-list">
              <article v-for="(item, index) in resume.education" :key="index" class="editor-card">
                <div class="card-actions">
                  <strong>School</strong>
                  <button class="icon-button" type="button" aria-label="Remove school" @click="resume.education.splice(index, 1)">x</button>
                </div>
                <div class="field-grid">
                  <label>Degree<input v-model="item.degree" placeholder="B.A. Communication Design" /></label>
                  <label>School<input v-model="item.school" placeholder="State University" /></label>
                </div>
                <div class="field-grid">
                  <label>Year<input v-model="item.year" placeholder="2018" /></label>
                  <label>Location<input v-model="item.location" placeholder="Chicago, IL" /></label>
                </div>
                <label>Details<textarea v-model="item.details" rows="3" placeholder="Honors, coursework, activities" /></label>
              </article>
            </div>
          </section>

          <section v-show="activeTab === 'skills'" class="form-section active">
            <label>
              Skills
              <textarea v-model="resume.skills" name="skills" rows="5" placeholder="User research, Figma, Prototyping, Design systems" />
              <span class="hint">Separate skills with commas.</span>
            </label>
            <label>
              Key competencies
              <textarea
                v-model="resume.certifications"
                name="certifications"
                rows="4"
                placeholder="Distributed systems, Kafka, MongoDB optimisation, Kubernetes"
              />
              <span class="hint">Separate competencies with commas.</span>
            </label>
            <div class="score-box">
              <strong>{{ resumeScore }}%</strong>
              <span>{{ scoreText }}</span>
            </div>
          </section>

          <section v-show="activeTab === 'style'" class="form-section active">
            <fieldset>
              <legend>Template</legend>
              <div class="template-grid">
                <label
                  v-for="template in templateOptions"
                  :key="template.value"
                  class="template-option"
                  :class="{ active: resume.template === template.value }"
                >
                  <input v-model="resume.template" type="radio" :value="template.value" />
                  <span class="template-thumb" :class="`thumb-${template.value}`">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span>
                    <strong>{{ template.label }}</strong>
                    <small>{{ template.description }}</small>
                  </span>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Accent color</legend>
              <div class="swatches">
                <button
                  v-for="color in colors"
                  :key="color.value"
                  type="button"
                  class="swatch"
                  :class="{ active: resume.color === color.value }"
                  :style="{ '--swatch': color.value }"
                  :aria-label="color.label"
                  @click="resume.color = color.value"
                />
              </div>
            </fieldset>
            <label class="range-label">
              Preview zoom
              <input v-model.number="resume.zoom" type="range" min="72" max="112" />
            </label>
            <button class="danger-button" type="button" @click="clearDraft">Clear draft</button>
          </section>
        </form>
      </aside>

      <section class="preview-panel" aria-label="Resume preview">
        <div class="preview-toolbar">
          <div>
            <p class="eyebrow">Live preview</p>
            <h2>{{ previewTitle }}</h2>
          </div>
          <span class="paper-badge">US Letter</span>
        </div>
        <div class="paper-stage">
          <article :class="previewClass">
            <header class="resume-header">
              <div>
                <h2>{{ resume.name || "Your Name" }}</h2>
                <p><strong>{{ resume.title || "Professional Title" }}</strong></p>
              </div>
              <div class="contact-line">
                <span v-for="contact in contacts" :key="contact">{{ contact }}</span>
              </div>
            </header>
            <div class="resume-body">
              <section v-if="resume.summary" class="resume-section">
                <h3>Summary</h3>
                <p>{{ resume.summary }}</p>
              </section>

              <section v-if="profileLinks.length" class="resume-section">
                <h3>Links</h3>
                <div class="profile-links">
                  <template v-for="link in profileLinks" :key="`${link.label}-${link.url}`">
                    <a v-if="link.url" :href="linkHref(link.url)" target="_blank" rel="noreferrer">{{ link.label || link.url }}</a>
                    <span v-else>{{ link.label }}</span>
                  </template>
                </div>
              </section>

              <section v-if="resume.experience.some((item) => item.role || item.company || item.highlights)" class="resume-section">
                <h3>Experience</h3>
                <div v-for="(item, index) in resume.experience" :key="`exp-${index}`" class="resume-item">
                  <template v-if="item.role || item.company || item.highlights">
                    <div class="item-head">
                      <h4>{{ item.role || "Role title" }}</h4>
                      <span>{{ formatDateRange(item.start, item.end, item.current) }}</span>
                    </div>
                    <p class="item-sub">{{ [item.company, item.location].filter(Boolean).join(" | ") }}</p>
                    <ul v-if="splitLines(item.highlights).length">
                      <li v-for="line in splitLines(item.highlights)" :key="line">{{ line }}</li>
                    </ul>
                  </template>
                </div>
              </section>

              <section v-if="resume.education.some((item) => item.degree || item.school || item.details)" class="resume-section">
                <h3>Education</h3>
                <div v-for="(item, index) in resume.education" :key="`edu-${index}`" class="resume-item">
                  <template v-if="item.degree || item.school || item.details">
                    <div class="item-head">
                      <h4>{{ item.degree || "Degree" }}</h4>
                      <span>{{ item.year }}</span>
                    </div>
                    <p class="item-sub">{{ [item.school, item.location].filter(Boolean).join(" | ") }}</p>
                    <p v-if="item.details">{{ item.details }}</p>
                  </template>
                </div>
              </section>

              <section v-if="skills.length" class="resume-section">
                <h3>Skills</h3>
                <div class="skill-pills">
                  <span v-for="skill in skills" :key="skill">{{ skill }}</span>
                </div>
              </section>

              <section v-if="certifications.length" class="resume-section">
                <h3>Key Competencies</h3>
                <ul>
                  <li v-for="certification in certifications" :key="certification">{{ certification }}</li>
                </ul>
              </section>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
