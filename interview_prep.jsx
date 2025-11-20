import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Brain, ChevronRight, RotateCcw, CheckCircle, XCircle, BarChart, Plane, Wind, Activity, Menu, X, GraduationCap, Sparkles, MessageSquare, Loader2, RefreshCw, Key, Settings } from 'lucide-react';

// --- Data & Content based on MS_Call_Letter_Jan_2026.pdf ---

const SYLLABUS = [
  {
    category: "Basic Mathematics",
    topics: [
      "Linear Algebra: Vector algebra, Matrices (Determinant, Rank, Eigen values/vectors)",
      "Calculus: Limits, continuity, Mean value theorem, Maxima/Minima",
      "Sequences and Series, Taylor/Maclaurin series",
      "Integrals (Area/Volume applications)",
      "Complex variables: Analytic functions, Cauchy-Riemann equations",
      "Differential Equations: First order linear/nonlinear ODE, Higher order linear ODEs, Cauchy-Euler"
    ]
  },
  {
    category: "Fluid Mechanics",
    topics: [
      "Basic equations of motion",
      "Classification of Flows",
      "Flow past bodies",
      "Vortex motion",
      "Lift, Drag, Moments"
    ]
  },
  {
    category: "Gas Dynamics",
    topics: [
      "Wave Propagation, Mach Waves",
      "Compressible Flows",
      "Nozzle flows",
      "Shocks & Expansion",
      "Fanno flows, Rayleigh flows"
    ]
  },
  {
    category: "Flight Dynamics & Control",
    topics: [
      "Laplace transform, Transfer functions, Feedback systems",
      "Stability (Static vs Dynamic), Controllability, Observability",
      "Airplane performance, Point mass model",
      "Trim and stability, Static margin",
      "Longitudinal and Lateral-directional dynamics/modes"
    ]
  },
  {
    category: "Experimental & Numerical",
    topics: [
      "Measurement of Flow parameters (Pressure, Velocity, etc.)",
      "Flow visualization",
      "Finite difference Methods",
      "Convergence & Stability"
    ]
  }
];

const INITIAL_QUESTION_BANK = [
  // Mathematics
  {
    id: 1,
    category: "Basic Mathematics",
    question: "What is the physical significance of Eigenvalues and Eigenvectors in the context of a dynamic system?",
    answer: "Eigenvectors represent the directions in which a linear transformation acts by stretching or compressing only (invariant directions). Eigenvalues represent the factor by which the stretching or compressing occurs. In dynamics, they determine the natural frequencies and mode shapes (stability) of the system."
  },
  {
    id: 2,
    category: "Basic Mathematics",
    question: "Explain the Cauchy-Riemann equations. Why are they important?",
    answer: "The Cauchy-Riemann equations are a system of two partial differential equations which provide a necessary and sufficient condition for a complex function to be complex differentiable (holomorphic) in an open set. They connect the partial derivatives of the real and imaginary parts of the function."
  },
  {
    id: 3,
    category: "Basic Mathematics",
    question: "What is the Rank of a matrix? How does it relate to the solution of linear equations?",
    answer: "The rank of a matrix is the dimension of the vector space generated (or spanned) by its columns (or rows). It corresponds to the maximal number of linearly independent columns. If Rank(A) = Rank(A|b) = n (number of unknowns), there is a unique solution."
  },
  {
    id: 4,
    category: "Basic Mathematics",
    question: "Define the Mean Value Theorem.",
    answer: "It states that for a continuous function on a closed interval [a,b] and differentiable on (a,b), there exists a point c in (a,b) where the tangent is parallel to the secant line connecting the endpoints. f'(c) = (f(b) - f(a)) / (b - a)."
  },
  
  // Fluid Mechanics
  {
    id: 5,
    category: "Fluid Mechanics",
    question: "Differentiate between a Streamline, Streakline, and Pathline.",
    answer: "Streamline: A line everywhere tangent to the velocity vector at a given instant. Pathline: The actual path traversed by a fluid particle over time. Streakline: The locus of all fluid particles that have passed continuously through a fixed point. In steady flow, all three coincide."
  },
  {
    id: 6,
    category: "Fluid Mechanics",
    question: "Explain the Kutta-Joukowski theorem.",
    answer: "It states that the lift per unit span on a body moving through a fluid is proportional to the product of the fluid density, the free stream velocity, and the circulation around the body. L' = rho * V * Gamma."
  },
  {
    id: 7,
    category: "Fluid Mechanics",
    question: "What is the condition for flow separation?",
    answer: "Flow separation occurs when the boundary layer travels far enough against an adverse pressure gradient (pressure increasing in flow direction) that the speed of the boundary layer relative to the object falls to zero. Mathematically, it's often where the wall shear stress becomes zero (du/dy at wall = 0)."
  },

  // Gas Dynamics
  {
    id: 8,
    category: "Gas Dynamics",
    question: "What is a Mach Wave? How does it differ from a Shock Wave?",
    answer: "A Mach wave is a weak pressure wave caused by a small disturbance moving at supersonic speed. It is essentially an isentropic sound wave. A Shock wave is a strong disturbance characterized by abrupt changes in fluid properties, is non-isentropic, and travels faster than the speed of sound."
  },
  {
    id: 9,
    category: "Gas Dynamics",
    question: "Explain the difference between Fanno flow and Rayleigh flow.",
    answer: "Fanno flow is adiabatic flow through a constant area duct where the effect of friction is considered. Rayleigh flow is frictionless flow through a constant area duct where the effect of heat addition or rejection is considered."
  },
  {
    id: 10,
    category: "Gas Dynamics",
    question: "Why can't a shock wave occur in a converging nozzle?",
    answer: "A normal shock wave changes flow from supersonic to subsonic. In a converging nozzle, the flow can at most reach Mach 1 at the throat (choked). It cannot become supersonic within the converging section, thus a shock (which requires upstream supersonic flow) cannot form inside."
  },

  // Flight Dynamics & Control
  {
    id: 11,
    category: "Flight Dynamics & Control",
    question: "Define 'Static Margin'. What is its significance for stability?",
    answer: "Static Margin is the distance between the Center of Gravity (CG) and the Neutral Point (NP), usually expressed as a percentage of the Mean Aerodynamic Chord (MAC). Positive static margin (CG ahead of NP) is required for longitudinal static stability."
  },
  {
    id: 12,
    category: "Flight Dynamics & Control",
    question: "What are the Phugoid and Short Period modes?",
    answer: "These are longitudinal dynamic stability modes. Short Period: Fast, heavily damped oscillation involving angle of attack and pitch rate (constant speed). Phugoid: Long period, lightly damped oscillation involving exchange of potential and kinetic energy (varying speed and altitude, constant angle of attack)."
  },
  {
    id: 13,
    category: "Flight Dynamics & Control",
    question: "What is the difference between Open Loop and Closed Loop systems?",
    answer: "Open Loop: The control action is independent of the output (no feedback). Closed Loop: The control action depends on the output (feedback exists), allowing the system to correct errors and handle disturbances."
  },
  {
    id: 14,
    category: "Flight Dynamics & Control",
    question: "Explain the concept of Controllability.",
    answer: "Controllability determines if we can steer the system state from any initial state to any other final state in a finite time using admissible controls. It relates to the rank of the Controllability Matrix."
  }
];

// --- Components ---

const ApiKeyModal = ({ isOpen, onClose, onSave }) => {
  const [key, setKey] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center gap-2 text-blue-700 mb-4">
          <Key size={24} />
          <h3 className="text-xl font-bold">Enter Gemini API Key</h3>
        </div>
        <p className="text-slate-600 mb-4 text-sm">
          To use the AI features (Mock Interview, Explanations), you need a free Google Gemini API key. Your key is stored locally in your browser.
        </p>
        <input 
          type="password" 
          placeholder="Paste your API key here..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(key)}
            disabled={!key.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Key
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
          Don't have a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-500 underline">Get one from Google AI Studio</a>.
        </div>
      </div>
    </div>
  );
};

const StartScreen = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
    <div className="bg-blue-100 p-6 rounded-full shadow-lg">
      <Plane size={64} className="text-blue-700" />
    </div>
    <div>
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Aerodynamics Panel Prep</h1>
      <p className="text-slate-600 max-w-lg mx-auto text-lg">
        Mock interview simulator designed for the IIT Madras M.S. Admission (Panel 1).
        Covers Math, Fluid Mechanics, Gas Dynamics, and Flight Control.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <Brain className="w-8 h-8 text-purple-500 mb-2 mx-auto" />
        <h3 className="font-semibold">Math Focus</h3>
        <p className="text-xs text-slate-500">Linear Algebra, Calculus, ODEs</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <Wind className="w-8 h-8 text-blue-500 mb-2 mx-auto" />
        <h3 className="font-semibold">Core Aero</h3>
        <p className="text-xs text-slate-500">Fluids, Gas Dynamics, Shocks</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <Activity className="w-8 h-8 text-green-500 mb-2 mx-auto" />
        <h3 className="font-semibold">Controls</h3>
        <p className="text-xs text-slate-500">Stability, Modes, Transfer Fns</p>
      </div>
    </div>

    <button 
      onClick={onStart}
      className="group bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all flex items-center gap-2 transform hover:-translate-y-1"
    >
      Start Mock Interview <ChevronRight className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const SyllabusView = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">Syllabus Breakdown (Panel 1)</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {SYLLABUS.map((section, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            {idx === 0 ? <Brain size={18} /> : <BookOpen size={18} />}
            {section.category}
          </h3>
          <ul className="space-y-2">
            {section.topics.map((topic, tIdx) => (
              <li key={tIdx} className="text-slate-600 text-sm flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const InterviewSession = ({ onEnd, apiKey, onRequireKey }) => {
  const [questions, setQuestions] = useState([...INITIAL_QUESTION_BANK]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  
  // New AI State
  const [userAnswer, setUserAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [aiDeepDive, setAiDeepDive] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // 'good', 'bad', 'neutral'

  useEffect(() => {
    // Shuffle questions only on mount
    setShuffledQuestions([...questions].sort(() => 0.5 - Math.random()));
  }, [questions]);

  const currentQ = shuffledQuestions[currentQIndex];
  // Guard against empty state during initial render or re-shuffle
  if (!currentQ) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600" /></div>;

  const progress = ((currentQIndex) / shuffledQuestions.length) * 100;

  // --- API Call Helper ---
  const callGemini = async (prompt) => {
    if (!apiKey) {
      onRequireKey();
      return null;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) throw new Error('API call failed');
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, I'm having trouble connecting to the AI professor right now. Please check your API key.";
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setUserAnswer("");
    setAiFeedback("");
    setAiDeepDive("");
    setFeedbackStatus(null);
    
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      onEnd(completed.length);
    }
  };

  const markReview = (status) => {
    setCompleted([...completed, { id: currentQ.id, status }]);
    handleNext();
  };

  // --- AI Features ---

  const handleGenerateNewQuestion = async () => {
    setIsAiLoading(true);
    const prompt = `Generate a single, challenging interview question (with a concise answer) for an Aerospace Engineering M.S. admission interview (Panel 1: Aerodynamics, Flight Dynamics & Controls). 
    Topics: ${JSON.stringify(SYLLABUS.map(s => s.topics).flat())}.
    Format the response strictly as JSON: {"category": "Topic Category", "question": "The question text", "answer": "The concise answer text"}.`;

    const responseText = await callGemini(prompt);
    setIsAiLoading(false);
    
    if (!responseText) return; // API key modal triggered

    try {
      // Clean up markdown code blocks if present
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const newQ = JSON.parse(jsonStr);
      
      const newQuestionObj = {
        id: Date.now(),
        category: newQ.category || "AI Generated",
        question: newQ.question,
        answer: newQ.answer
      };

      // Add to current deck and switch to it immediately
      const updatedQuestions = [...shuffledQuestions];
      updatedQuestions.splice(currentQIndex + 1, 0, newQuestionObj);
      setShuffledQuestions(updatedQuestions);
      handleNext(); // Move to the new question
    } catch (e) {
      console.error("Failed to parse AI question", e);
      setAiFeedback("Failed to generate a valid question. Please try again.");
    }
  };

  const handleRateAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsAiLoading(true);
    const prompt = `You are a strict IIT Madras Aerospace Engineering professor. 
    Question: "${currentQ.question}"
    Official Answer: "${currentQ.answer}"
    Student's Answer: "${userAnswer}"
    
    Task: Rate the student's answer. If it captures the core concept, give positive feedback. If it is wrong, explain why briefly. 
    Start with "Correct", "Partially Correct", or "Incorrect". Then providing 1-2 sentences of feedback.`;

    const response = await callGemini(prompt);
    setIsAiLoading(false);
    
    if (!response) return;

    setAiFeedback(response);
    
    // Simple heuristic for status color
    if (response.toLowerCase().includes("incorrect")) setFeedbackStatus('bad');
    else if (response.toLowerCase().includes("partially")) setFeedbackStatus('neutral');
    else setFeedbackStatus('good');
  };

  const handleExplainConcept = async () => {
    setIsAiLoading(true);
    const prompt = `Explain the concept of "${currentQ.question}" (Answer: ${currentQ.answer}) in simple terms using a physical analogy (like water, cars, or everyday objects) suitable for an undergraduate engineering student. Keep it brief.`;
    const response = await callGemini(prompt);
    setIsAiLoading(false);

    if (!response) return;
    setAiDeepDive(response);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between text-sm text-slate-500">
        <span>Question {currentQIndex + 1} of {shuffledQuestions.length}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {currentQ.category}
          </span>
          <button 
            onClick={handleGenerateNewQuestion}
            disabled={isAiLoading}
            className="flex items-center gap-1 text-purple-600 text-xs font-semibold hover:bg-purple-50 px-2 py-1 rounded transition-colors"
          >
            {isAiLoading ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12} />}
            Generate Fresh Question
          </button>
        </div>

        <div className="p-8 flex-grow flex flex-col">
          <h3 className="text-2xl font-medium text-slate-800 leading-relaxed mb-6">
            {currentQ.question}
          </h3>

          {/* Pre-reveal: Answer Input Section */}
          {!showAnswer && (
            <div className="mb-6 space-y-3 animate-fade-in">
              <textarea 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here to simulate the oral interview..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 resize-none h-24"
              />
              <div className="flex justify-between items-center">
                 <button 
                  onClick={handleRateAnswer}
                  disabled={!userAnswer.trim() || isAiLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${!userAnswer.trim() ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200'}
                  `}
                >
                  {isAiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  Rate My Answer
                </button>
                <button 
                  onClick={() => setShowAnswer(true)}
                  className="text-blue-600 font-medium hover:text-blue-800 underline decoration-dashed underline-offset-4"
                >
                  Just reveal answer
                </button>
              </div>

              {/* AI Feedback Display */}
              {aiFeedback && (
                <div className={`mt-4 p-4 rounded-xl border-l-4 animate-fade-in
                  ${feedbackStatus === 'good' ? 'bg-green-50 border-green-500 text-green-800' : 
                    feedbackStatus === 'bad' ? 'bg-red-50 border-red-500 text-red-800' : 
                    'bg-yellow-50 border-yellow-500 text-yellow-800'}`}
                >
                  <p className="font-semibold mb-1 flex items-center gap-2">
                    <Brain size={16} /> Professor's Feedback:
                  </p>
                  <p className="text-sm leading-relaxed">{aiFeedback}</p>
                </div>
              )}
            </div>
          )}

          {/* Post-reveal: Answer & Explanations */}
          {showAnswer && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h4 className="text-green-800 font-bold mb-2 flex items-center gap-2">
                  <GraduationCap size={20} /> Expected Concept
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {currentQ.answer}
                </p>
              </div>

              {/* Deep Dive Feature */}
              {!aiDeepDive ? (
                <button 
                  onClick={handleExplainConcept}
                  disabled={isAiLoading}
                  className="w-full py-3 border border-purple-200 rounded-xl text-purple-700 font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isAiLoading ? <Loader2 size={18} className="animate-spin"/> : <Sparkles size={18} />}
                  Explain this concept simply (Deep Dive)
                </button>
              ) : (
                <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 text-purple-900 animate-fade-in">
                  <h5 className="font-bold mb-2 flex items-center gap-2"><Sparkles size={16}/> Deep Dive Explanation</h5>
                  <p className="text-sm leading-relaxed">{aiDeepDive}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {showAnswer && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-4">
            <button 
              onClick={() => markReview('hard')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium transition-colors"
            >
              <XCircle size={20} /> Needs Review
            </button>
            <button 
              onClick={() => markReview('easy')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition-all"
            >
              <CheckCircle size={20} /> Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Results = ({ count, total, onReset }) => (
  <div className="text-center space-y-6 py-12 animate-fade-in">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
      <CheckCircle className="w-10 h-10 text-green-600" />
    </div>
    <h2 className="text-3xl font-bold text-slate-800">Session Complete!</h2>
    <p className="text-slate-600">You've reviewed all cards in this deck.</p>
    
    <div className="flex justify-center gap-4 mt-8">
      <button 
        onClick={onReset}
        className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-900 transition-colors"
      >
        <RotateCcw size={18} /> Restart Session
      </button>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState('home'); 
  const [sessionCount, setSessionCount] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSaveKey = (key) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowKeyModal(false);
  };

  const handleStart = () => setView('interview');
  const handleEnd = (count) => {
    setSessionCount(count);
    setView('results');
  };
  const handleReset = () => setView('home');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <ApiKeyModal 
        isOpen={showKeyModal} 
        onClose={() => setShowKeyModal(false)} 
        onSave={handleSaveKey} 
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white">
              <Plane size={20} />
            </div>
            <span>AeroPrep <span className="text-slate-400 text-sm font-normal">for IITM</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button 
              onClick={() => setView('home')}
              className={`hover:text-blue-700 transition-colors ${view === 'home' ? 'text-blue-700' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('syllabus')}
              className={`hover:text-blue-700 transition-colors ${view === 'syllabus' ? 'text-blue-700' : ''}`}
            >
              Syllabus Tracker
            </button>
            <button 
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              <Settings size={16} /> Settings
            </button>
          </nav>
          
          <button 
            onClick={() => setView('interview')}
            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
          >
            Quick Practice
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {view === 'home' && <StartScreen onStart={handleStart} />}
        {view === 'syllabus' && <SyllabusView />}
        {view === 'interview' && (
          <InterviewSession 
            onEnd={handleEnd} 
            apiKey={apiKey} 
            onRequireKey={() => setShowKeyModal(true)} 
          />
        )}
        {view === 'results' && <Results count={sessionCount} total={INITIAL_QUESTION_BANK.length} onReset={handleReset} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
          <p>Designed for Panel 1: Aerodynamics, Flight Dynamics & Controls.</p>
          <p className="mt-2">Based on MS Admission Call Letter Jan 2026.</p>
        </div>
      </footer>
    </div>
  );
}
