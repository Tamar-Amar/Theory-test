import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  createSession,
  fetchMe,
  getMeta,
  getStoredToken,
  setStoredToken,
  submitSession,
  type AuthUser,
  type Meta,
  type QuizQuestion,
  type SubmitResponse,
} from "./api";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { AuthPanel } from "./components/AuthPanel/AuthPanel";
import { ErrorAlert } from "./components/ErrorAlert/ErrorAlert";
import { LoadingState } from "./components/LoadingState/LoadingState";
import { PageContainer } from "./components/PageContainer/PageContainer";
import { PersonalStats } from "./components/PersonalStats/PersonalStats";
import { PracticeSectionTabs } from "./components/PracticeSectionTabs/PracticeSectionTabs";
import { QuizSetup } from "./components/QuizSetup/QuizSetup";
import { QuizView } from "./components/QuizView/QuizView";
import { ResultsView } from "./components/ResultsView/ResultsView";
import { SupportTicketForm } from "./components/SupportTicketForm/SupportTicketForm";
import { UserBar } from "./components/UserBar/UserBar";
import type { AuthMode } from "./types/auth";

type Phase = "setup" | "quiz" | "results";

function AppShell() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const [phase, setPhase] = useState<Phase>("setup");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [count, setCount] = useState(10);
  const [category, setCategory] = useState("");
  const [starting, setStarting] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<SubmitResponse | null>(null);

  const loadMeta = useCallback(async () => {
    setLoadingMeta(true);
    setError(null);
    try {
      const m = await getMeta();
      setMeta(m);
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאת טעינה");
      setMeta(null);
    } finally {
      setLoadingMeta(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const t = getStoredToken();
      if (!t) {
        if (!cancelled) setAuthChecked(true);
        return;
      }
      try {
        const me = await fetchMe();
        if (!cancelled) setUser(me);
      } catch {
        setStoredToken(null);
      } finally {
        if (!cancelled) setAuthChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!user || user.admin) return;
    loadMeta();
  }, [user, loadMeta]);

  useEffect(() => {
    if (phase !== "quiz" || !startedAt) return;
    const id = window.setInterval(() => {
      setElapsed(Date.now() - startedAt);
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, startedAt]);

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round((100 * (current + 1)) / questions.length);
  }, [current, questions.length]);

  const selectedForCurrent =
    answers[current] !== undefined && answers[current] >= 0
      ? answers[current]
      : null;

  const handleLoggedIn = useCallback(
    (u: AuthUser) => {
      setUser(u);
      navigate(u.admin ? "/admin" : "/practice", { replace: true });
    },
    [navigate]
  );

  const handleStart = async () => {
    setStarting(true);
    setError(null);
    try {
      const data = await createSession(count, category);
      setSessionId(data.sessionId);
      setQuestions(data.questions);
      setAnswers(Array(data.questions.length).fill(-1));
      setCurrent(0);
      setStartedAt(Date.now());
      setElapsed(0);
      setPhase("quiz");
      navigate("/practice", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "לא ניתן להתחיל מבחן");
    } finally {
      setStarting(false);
    }
  };

  const pickOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  };

  const goNext = () => {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleFinish = async () => {
    if (!sessionId || answers.some((a) => a < 0)) {
      setError("נא לענות על כל השאלות לפני סיום");
      return;
    }
    setError(null);
    try {
      const res = await submitSession(
        sessionId,
        answers,
        Date.now() - startedAt,
        category
      );
      setResult(res);
      setPhase("results");
      navigate("/practice", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה בשליחה");
    }
  };

  const resetToPath = useCallback(
    (path: "/practice" | "/profile") => {
      setPhase("setup");
      setSessionId(null);
      setQuestions([]);
      setAnswers([]);
      setResult(null);
      loadMeta();
      navigate(path, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [loadMeta, navigate]
  );

  const logout = () => {
    setStoredToken(null);
    setUser(null);
    setPhase("setup");
    setSessionId(null);
    setQuestions([]);
    setAnswers([]);
    setResult(null);
    navigate("/login", { replace: true });
  };

  const q = questions[current];

  if (!authChecked) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <PageContainer>
              <AppHeader
                title="תרגול תאוריה"
                subtitle="התחברות או הרשמה מאפשרות לשמור התקדמות ולקבל שאלות ממוקדות לפי טעויות"
              />
              <AuthPanel
                mode={authMode}
                onMode={setAuthMode}
                onLoggedIn={handleLoggedIn}
              />
            </PageContainer>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (user.admin) {
    return (
      <PageContainer>
        <AppHeader
          title="תרגול תאוריה"
          subtitle="לוח בקרה — מנהל"
        >
          <UserBar
            username={user.username}
            email={user.email}
            onLogout={logout}
          />
        </AppHeader>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppHeader
        title="תרגול תאוריה"
        subtitle="תרגול עם מיקוד על פי תוצאות בחינות קודמות"
      >
        <UserBar
          username={user.username}
          email={user.email}
          onLogout={logout}
        />
      </AppHeader>

      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Routes>
        <Route path="/login" element={<Navigate to="/practice" replace />} />
        <Route path="/" element={<Navigate to="/practice" replace />} />
        <Route
          path="/practice"
          element={
            <>
              {phase === "setup" && (
                <>
                  <PracticeSectionTabs />
                  <QuizSetup
                    meta={meta}
                    loadingMeta={loadingMeta}
                    count={count}
                    category={category}
                    starting={starting}
                    onCount={setCount}
                    onCategory={setCategory}
                    onStart={handleStart}
                  />
                </>
              )}
              {phase === "quiz" && q && (
                <QuizView
                  question={q}
                  questionIndex={current}
                  total={questions.length}
                  progressPercent={progress}
                  elapsedMs={elapsed}
                  selectedIndex={selectedForCurrent}
                  answers={answers}
                  onSelectOption={pickOption}
                  onPrev={goPrev}
                  onNext={goNext}
                  onFinish={handleFinish}
                />
              )}
              {phase === "results" && result && (
                <ResultsView
                  result={result}
                  questions={questions}
                  elapsedMs={elapsed}
                  onAgain={() => resetToPath("/practice")}
                  onGoHome={() => resetToPath("/profile")}
                />
              )}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            phase !== "setup" ? (
              <Navigate to="/practice" replace />
            ) : (
              <>
                <PracticeSectionTabs />
                <PersonalStats />
                <div style={{ marginTop: "1.25rem" }}>
                  <SupportTicketForm />
                </div>
              </>
            )
          }
        />
        <Route path="*" element={<Navigate to="/practice" replace />} />
      </Routes>
    </PageContainer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
