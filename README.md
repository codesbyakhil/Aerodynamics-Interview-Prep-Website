# Aerodynamics-Interview-Prep-Website

AeroPrep is a React-based web app that helps you prepare for the **IIT Madras M.S. Aerospace Engineering (Panel 1: Aerodynamics, Flight Dynamics & Control)** interview.

It combines a curated question bank with **Google Gemini** to simulate a real oral interview: you answer, the “professor” evaluates, and you can even generate new questions on demand. The syllabus is aligned with the official IITM M.S. call letter (Jan–May 2026) for Panel 1.

---

## 🎯 Why this exists

Panel 1 expects you to handle questions from:

* **Basic Mathematics**
* **Fluid Mechanics**
* **Gas Dynamics**
* **Flight Dynamics & Control**
* **Experimental & Numerical Methods**

Most candidates revise theory but don’t get realistic **question–answer practice**. This project aims to close that gap by giving you:

* Interview-style questions
* Space to write your own answers
* Strict but helpful AI feedback
* Topic-wise control over what you practice

---

## ✨ Features

### 1. Start Screen & Quick Practice

* Clean landing page themed around **Aerodynamics Panel** prep.
* “Start Mock Interview” takes you directly into a mixed-topic session.
* “Quick Practice” in the header lets you jump into questions from anywhere in the app.

### 2. Syllabus Tracker

A dedicated **Syllabus view** shows the full breakdown for Panel 1, grouped into:

* **Basic Mathematics**

  * Linear algebra, eigenvalues/eigenvectors
  * Calculus, sequences/series, Taylor/Maclaurin
  * Complex variables, Cauchy–Riemann
  * Differential equations (1st order and higher order)

* **Fluid Mechanics**

  * Basic equations of motion
  * Classification of flows
  * Flow past bodies, vortex motion
  * Lift, drag, moments

* **Gas Dynamics**

  * Wave propagation, Mach waves
  * Compressible flows and nozzles
  * Shocks, expansions, Fanno and Rayleigh flows

* **Flight Dynamics & Control**

  * Laplace transform, LTI response, transfer functions
  * Feedback systems, open/closed loop, poles & zeros
  * State-space, stability, controllability, observability
  * Point-mass model, static margin, longitudinal & lateral modes

* **Experimental & Numerical**

  * Measurement of pressure, velocity, temperature, mass flow
  * Flow visualisation
  * Finite difference methods, convergence & stability

These topics are mapped from the official IITM M.S. call letter for Aerodynamics / Flight Dynamics & Control.

### 3. Interview Session

The core of the app is the **InterviewSession** component:

* Choose **focus area**:

  * Full **mixed** mock interview (`All`)
  * Or a single category (e.g. *Gas Dynamics*, *Flight Dynamics & Control*)
* Questions are drawn from a curated bank and **shuffled** per session.
* A progress bar shows **% completion** and current question index.

For each question, you can:

* Type your answer in a text area (simulating speaking in an oral exam).
* Ask the AI to **rate your answer**:

  * Returns “Correct”, “Partially Correct”, or “Incorrect” with 1–2 lines of feedback.
  * Feedback is intentionally strict, like an IITM professor.
* Reveal the **Expected Concept** answer at any time.
* Mark the question as:

  * ✅ **Got it**
  * ❌ **Needs review**

### 4. AI-Powered Features (Gemini)

All AI features use **Google Gemini 1.5 Flash** via the REST API:

* **Rate My Answer** – Compares your answer with the official answer and gives targeted feedback.
* **Explain This Concept (Deep Dive)** – Generates a short, analogy-based explanation suitable for undergrad level.
* **Generate New Question** –

  * Generates a JSON-formatted question + answer focused on your current category (or any topic in the syllabus for `All` mode).
  * Inserts the new question into your current session.

If the API doesn’t respond or JSON parsing fails, the UI degrades gracefully with readable error messages.

### 5. API Key Handling

The app uses a modal to manage the Google Gemini API key:

* You are prompted once for your key.
* Your key is **stored only in `localStorage`** under `gemini_api_key`.
* There is no backend server; everything runs in the browser.

Get a free key from: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 🧱 Technology Stack

* **Framework:** React (functional components + hooks)
* **Styling:** Tailwind CSS utility classes
* **Icons:** `lucide-react`
* **AI:** Google Gemini 1.5 Flash REST API
* **State Management:** `useState`, `useEffect`

---

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Aerodynamics-Interview-Prep-Website.git
   cd Aerodynamics-Interview-Prep-Website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**

   Vite (or your chosen bundler) will print a local URL, usually `http://localhost:5173`. Open it in your browser.

5. **Add your Gemini API key**

   * Click **Settings** in the top-right.
   * Paste your Gemini API key into the modal and hit **Save**.
   * You can update/remove it later from the same Settings button.

---

## 🧪 How to Use

1. Start on **Home**

   * Click **Start Mock Interview** or **Quick Practice**.

2. Use the **Syllabus Tracker**

   * Switch to *Syllabus Tracker* from the header.
   * Verify which topics you’ve already covered and which ones you still need to revise.

3. Run a **topic-focused session**

   * On first entry to Interview view, pick a category such as *Gas Dynamics* or *Flight Dynamics & Control*.
   * Answer the questions and use **Rate My Answer** to get feedback.

4. Try all **AI features**

   * Use **Rate My Answer** after writing your response.
   * Click **Explain this concept simply (Deep Dive)** after revealing an answer.
   * Click **New Question** to add an AI-generated question into your deck.

---

## 🗺️ Roadmap / Ideas

* Add Panels 2 & 3 (Structures & Aero-elasticity, Propulsion).
* Add bookmarking & spaced repetition (review hard questions more often).
* Add export/import of your progress (JSON file).
* Add dark mode toggle.
* Add timed mode (simulate real interview time pressure).

---

## 🤝 Contributing

Contributions are very welcome! Some ideas:

* Improve or expand the question bank.
* Add more edge-case handling for Gemini responses.
* UI/UX improvements and accessibility tweaks.
* Adding more detailed analytics (e.g. which topics you find hardest).

**Steps to contribute:**

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m "Add my feature"`.
4. Push to your fork: `git push origin feature/my-feature`.
5. Open a Pull Request.

---

## 📜 License

This project is released under the **MIT License**.

You are free to use, modify, and distribute it, with attribution.
