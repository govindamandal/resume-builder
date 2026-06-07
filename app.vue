<script setup lang="ts">
type TemplateName = "classic" | "modern" | "compact";

interface ExperienceItem {
  role: string;
  company: string;
  start: string;
  end: string;
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
  experience: ExperienceItem[];
  education: EducationItem[];
}

const STORAGE_KEY = "resume-studio-draft";

const sampleData: ResumeDraft = {
  name: "Avery Taylor",
  title: "Senior Product Designer",
  email: "avery.taylor@email.com",
  phone: "+1 555 0188",
  location: "Austin, TX",
  website: "averytaylor.design",
  summary:
    "Product designer with 7 years of experience creating user-centered SaaS products. Skilled at turning research into clear product strategy, polished interfaces, and measurable growth.",
  skills: "User research, Product strategy, Figma, Prototyping, Design systems, Usability testing, Accessibility",
  certifications: "Google UX Design Certificate, Certified Scrum Product Owner",
  template: "classic",
  color: "#2563eb",
  zoom: 88,
  experience: [
    {
      role: "Senior Product Designer",
      company: "Bright Labs",
      start: "2022",
      end: "Present",
      location: "Remote",
      highlights:
        "Led a checkout redesign that increased trial starts by 24%\nBuilt a component library now used by 14 product teams\nPartnered with research to run monthly usability studies"
    },
    {
      role: "UX Designer",
      company: "Northstar Health",
      start: "2019",
      end: "2022",
      location: "Chicago, IL",
      highlights:
        "Designed clinician workflows for scheduling and intake\nReduced support tickets by 31% with clearer patient onboarding\nFacilitated workshops with engineering, product, and compliance"
    }
  ],
  education: [
    {
      degree: "B.A. Communication Design",
      school: "State University",
      year: "2018",
      location: "Madison, WI",
      details: "Graduated magna cum laude. Coursework in interaction design and visual systems."
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
const previewTitle = computed(() => (resume.name ? `${resume.name}'s resume` : "Untitled resume"));
const previewClass = computed(() => `resume-paper template-${resume.template}`);
const accentStyle = computed(() => ({ "--accent": resume.color, "--zoom": String(resume.zoom / 100) }));

const resumeScore = computed(() => {
  const checks = [
    resume.name,
    resume.title,
    resume.email,
    resume.phone,
    resume.summary.length > 80,
    resume.experience.some((item) => item.role && item.company && item.highlights),
    resume.education.some((item) => item.degree && item.school),
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

function assignDraft(nextDraft: ResumeDraft) {
  Object.assign(resume, cloneDraft(nextDraft));
}

function addExperience() {
  resume.experience.push({ role: "", company: "", start: "", end: "", location: "", highlights: "" });
}

function addEducation() {
  resume.education.push({ degree: "", school: "", year: "", location: "", details: "" });
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
              <input v-model="resume.name" name="name" placeholder="Avery Taylor" />
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
                <input v-model="resume.phone" name="phone" placeholder="+1 555 0188" />
              </label>
            </div>
            <div class="field-grid">
              <label>
                Location
                <input v-model="resume.location" name="location" placeholder="Austin, TX" />
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
                  <label>Start<input v-model="item.start" placeholder="2022" /></label>
                  <label>End<input v-model="item.end" placeholder="Present" /></label>
                </div>
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
              Certifications
              <textarea
                v-model="resume.certifications"
                name="certifications"
                rows="4"
                placeholder="Certified Scrum Product Owner, Google UX Design Certificate"
              />
              <span class="hint">Separate certifications with commas.</span>
            </label>
            <div class="score-box">
              <strong>{{ resumeScore }}%</strong>
              <span>{{ scoreText }}</span>
            </div>
          </section>

          <section v-show="activeTab === 'style'" class="form-section active">
            <fieldset>
              <legend>Template</legend>
              <div class="choice-row">
                <label><input v-model="resume.template" type="radio" value="classic" /> Classic</label>
                <label><input v-model="resume.template" type="radio" value="modern" /> Modern</label>
                <label><input v-model="resume.template" type="radio" value="compact" /> Compact</label>
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

              <section v-if="resume.experience.some((item) => item.role || item.company || item.highlights)" class="resume-section">
                <h3>Experience</h3>
                <div v-for="(item, index) in resume.experience" :key="`exp-${index}`" class="resume-item">
                  <template v-if="item.role || item.company || item.highlights">
                    <div class="item-head">
                      <h4>{{ item.role || "Role title" }}</h4>
                      <span>{{ [item.start, item.end].filter(Boolean).join(" - ") }}</span>
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
                <h3>Certifications</h3>
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
