# תרגול תאוריה — מדריך למפתחים

פרויקט full-stack: שרת Node (Express + MongoDB) ולקוח React (Vite + TypeScript + styled-components).  
**השאלות נטענות ממסד MongoDB המקומי** (אין סנכרון אוטומטי לאתר חיצוני).

---

## הרצה מהירה

1. **MongoDB** פעיל, עם שאלות באוסף **`questions`** (מבנה לפי מודל Mongoose ב־`server/src/models/Question.ts`).
2. **שרת** (`server/`): העתק `.env.example` ל־`.env`, אז `npm install` ו־`npm run dev`.
3. **לקוח** (`client/`): `npm install` ו־`npm run dev` (פרוקסי ל־`/api` מצביע ל־`127.0.0.1:4000`).

---

## מבנה תיקיות (ברמה גבוהה)

| תיקייה | תוכן |
|--------|------|
| `server/src` | API, מודלים Mongoose, אימות JWT, בחירת שאלות “חכמה” |
| `client/src` | אפליקציית React, קומפוננטות, theme, `api.ts` |

---

## קומפוננטות React (`client/src/components/`)

לכל קומפוננטה יש בדרך כלל קובץ `*.styles.ts` עם styled-components; הלוגיקה ב־`*.tsx`.

### פריסה ומעטפת

| קומפוננטה | תפקיד |
|-----------|--------|
| **PageContainer** | עמוד ממורכז: רוחב מקסימלי (~640px) וריפוד. עוטף את כל המסכים. |
| **Card** | כרטיס ויזואלי (רקע, מסגרת, צל). וריאנט `narrow` לטפסי הרשמה (צר וממורכז). |
| **AppHeader** | כותרת ראשית + תת־כותרת; מקבל `children` (למשל **UserBar** אחרי התחברות). |

### אימות

| קומפוננטה | תפקיד |
|-----------|--------|
| **AuthTabs** | מעבר בין מצב “התחברות” / “הרשמה”. |
| **AuthPanel** | טופס מלא: שם משתמש, אימייל (בהרשמה), סיסמה, אימות סיסמה; קורא ל־`login` / `register` ב־API. |
| **UserBar** | הצגת שם + אימייל והכפתור “יציאה”. |

### טפסים ומשוב

| קומפוננטה | תפקיד |
|-----------|--------|
| **FormField** | שורת טופס: `Label` + תוכן (ילדים). מייצאת גם **FieldInput** / **FieldSelect** מסוגננים. |
| **Button** | וריאנטים: Primary, Ghost, Secondary, PrimaryInline (לשורת ניווט במבחן), ResultsPrimary (אחרי תוצאות). |
| **ErrorAlert** | הודעת שגיאה אדומה; `compact` לשימוש בתוך כרטיס צר. |
| **LoadingState** | טקסט “טוען…” ממורכז. |

### לפני המבחן

| קומפוננטה | תפקיד |
|-----------|--------|
| **QuizSetup** | בחירת מספר שאלות, קטגוריה, **SmartModeInfo**, כפתור “התחל מבחן”; שורת מטא (כמה שאלות במסד). |
| **SmartModeInfo** | הסבר שמצב חכם תמיד פעיל בשרת. |

### במהלך המבחן

| קומפוננטה | תפקיד |
|-----------|--------|
| **QuizView** | מרכיבה את מסך המבחן: אין לה קובץ styles משלה; משתמשת בילדים למטה. |
| **QuizProgress** | מונה שאלה / סה״כ, טיימר, פס התקדמות באחוזים. |
| **QuizQuestionTitle** | טקסט השאלה בלבד. |
| **QuestionImage** | תמונה אם יש `imageUrl` בשדה השאלה (למשל קישור ל־URL חיצוני). |
| **AnswerOption** | שורת בחירה (רדיו + טקסט אפשרות), מצב נבחר/לא נבחר. |
| **AnswerList** | עטיפת `div` לרשימת האפשרויות; מעבירה `role` / `aria-*` לנגישות. |
| **QuizNavRow** | שורת כפתורים (“הקודם”, “הבא” / “סיום וציון”). |

### אחרי המבחן

| קומפוננטה | תפקיד |
|-----------|--------|
| **ResultsView** | מסך תוצאות: ציון, רמז, רשימת פירוט, “מבחן נוסף”. |
| **ScoreDisplay** | אחוז גדול + שורת משנה (נכונות / זמן). |
| **ResultsHint** | פסקה קצרה על חזרה על טעויות במבחנים הבאים. |
| **BreakdownList** | רשימת “שאלה N — נכון/שגוי” לפי `breakdown` מהשרת. |

---

## קבצים נלווים בלקוח

| קובץ / תיקייה | תפקיד |
|----------------|--------|
| `App.tsx` | אורקסטרציה: סטייט גלובלי, אפקטים (אימות, מטא, טיימר), ניתוב לוגי בין מסכים. |
| `api.ts` | קריאות `fetch` ל־`/api` ו־`/api/auth`, ניהול JWT ב־`localStorage`. |
| `main.tsx` | `ThemeProvider` (styled-components), `GlobalStyle`, רינדור `App`. |
| `theme/theme.ts` | ערכי צבע, רדיוסים, פונט — נגישים ב־`props.theme` בכל styled component. |
| `theme/styled.d.ts` | הרחבת `DefaultTheme` של styled-components ל־TypeScript. |
| `styles/GlobalStyle.ts` | איפוס גלובלי (`body`, `#root`, `button`). |
| `types/auth.ts` | טיפוס `AuthMode`. |
| `utils/formatElapsed.ts` | פורמט זמן לתצוגה (טיימר / תוצאות). |

---

## שרת (`server/src`) — רפרנס קצר

| אזור | תפקיד |
|------|--------|
| `routes/auth.ts` | הרשמה, התחברות, `/me`. |
| `routes/api.ts` | מטא, יצירת סשן מבחן, שליחת תשובות. |
| `middleware/auth.ts` | JWT חובה לנתיבי מבחן. |
| `services/quizPick.ts` | בחירת שאלות (חלק “חלשות” + אקראי). |
| `services/userStats.ts` | עדכון סטטיסטיקה אחרי כל תשובה. |
| `models/` | User, Question, QuizSession, Attempt, UserQuestionStat. |

---

## משתני סביבה (`server/.env`)

ראו `.env.example`: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_DAYS`.
