# MyDorm — "CampusFlow" prototype

A design-sprint prototype for running a student dorm: damage reports, a cleaning
schedule, private consultation booking, leave permissions, and discipline —
each as its own page. **Front-end only — mock auth, mock data, no backend.**
State resets on refresh.

Built with **Vite + React + TypeScript + Tailwind CSS** so it stays lightweight
now and ports cleanly to a real backend (e.g. Supabase) later.

## Two platforms, by role

The experience is styled differently for each role:

- **Student → mobile app.** A phone-width frame (centered on desktop), a
  friendly top bar, card-based screens, and a **bottom tab bar** for
  navigation. Touch-friendly, one-tap actions.
- **Admin → web dashboard.** A laptop-first layout with a fixed **sidebar**,
  tables, filters, and stat cards.

After signing in, each role lands on a **Home dashboard** that greets them and
shows a card per service. Each service is its **own page** — not one long
scroll.

The look is warm and cheerful: a blue / light-blue / light-green palette,
rounded approachable cards, and a little dorm illustration on the student home.

## Services

| Service | Who | What |
| --- | --- | --- |
| **Reports** | Student / Admin | Students file & track damage reports; admin oversees all reports with filters. |
| **Cleaning Schedule** | Admin / Dorm Head | Add students and places in two simple lists; the schedule **generates automatically** on every change — each student assigned to exactly one place, spread evenly, no duplicates. |
| **Consultation** | Student | A quick form: pick a counselor, confirm your name, choose a predefined slot → it appears under **My Bookings**. **Private** — never shown in any admin view. |
| **Dorm Permission** | Student / Admin | Students request leave (reason, destination, leave/return times) and track status; admin approves/rejects and the student's status updates. |
| **Discipline** | Admin / Student | Admin records a violation (deducts points) and assigns a punishment + schedule; the student sees their own points, violations, and schedule. |

## Run it

```bash
npm install
npm run dev      # start the dev server (prints a local URL)
```

Other scripts:

```bash
npm run build    # typecheck (tsc) + production build
npm run preview  # preview the production build
```

## Flow

**Splash → Landing → Sign In / Sign Up → Home dashboard → service pages → Sign Out.**

- **Splash** — brief CampusFlow logo, auto-advances to the landing screen.
- **Landing** — app name, subtitle, and "Sign In" / "Create Account".
- **Sign Up** — students only (name, email, password, dorm). Admin accounts are
  created by the school; there's no public admin sign-up.
- **Sign In** — email + password (mock). Routes into the app shell.
- **Home dashboard** — greets the user and shows a card per service.

### Demo logins (shown on the Sign In screen)

All use password **`password`**:

| Role | Email | Sees |
| --- | --- | --- |
| Student | `student@campusflow.dev` | Report form + My Reports |
| Dorm Head | `dormhead@campusflow.dev` | Student view **+ cleaning schedule** |
| Admin | `admin@campusflow.dev` | All reports, filters, status control |

> The spec asked for a Student and an Admin demo login; a **Dorm Head** demo is
> included too so the extra cleaning-schedule section is easy to preview.

## Roles

Exactly two roles: **Student** and **Admin**. A dorm head is a Student with
`isDormHead: true` (one extra permission: managing the cleaning schedule), not a
separate role.

## Project structure

```
src/
├── main.tsx             App entry (React root)
├── App.tsx              Mock auth + auth flow + per-service page routing
├── nav.ts               Navigation model — which pages each role can reach
├── index.css            Tailwind directives + base font
├── types/               All shared types (Role, User, Report, PlaceSchedule, …)
├── constants.ts         Statuses, badge colors, dorms, shared styles
├── data/                Mock data only
│   ├── users.ts         Accounts + demo logins
│   ├── reports.ts       Seed damage reports
│   ├── roster.ts        Students + starting discipline points
│   ├── schedule.ts      Starting cleaning places
│   ├── consultations.ts Counselors + predefined slots
│   ├── permissions.ts   Seed leave requests
│   └── discipline.ts    Violations + seed discipline records
├── lib/                 Pure logic — no React
│   ├── auth.ts  reports.ts  format.ts
│   ├── schedule.ts      generateSchedule (even, no-duplicate assignment)
│   ├── permissions.ts   createPermission, getMyPermissions, badge styles
│   └── discipline.ts    createDiscipline, pointsFor, recordsFor
├── hooks/               Stateful logic
│   ├── useAuth  useReports  useSchedule (editable lists + live assignment)
│   └── usePermissions  useConsultations  useDiscipline
├── components/          One reusable component per file
│   ├── StudentShell     Mobile-app frame + bottom tab bar (student)
│   ├── AdminShell       Sidebar web dashboard (admin)
│   ├── DormArt          Friendly inline-SVG dorm illustration
│   ├── PageHeader  Logo  Button  Icon  StatusBadge  PermissionBadge
│   └── Section  Field  EmptyState  ReportForm  ReportCard  ReportList  FilterBar  ReportDetail
├── screens/             Pre-login screens
│   └── SplashScreen  HomeScreen  SignInScreen  SignUpScreen
└── pages/               One service page per file (rendered inside a shell)
    ├── HomePage         Admin landing (dashboard cards)
    ├── StudentHomePage  Student landing (dorm hero + app cards)
    ├── ReportsStudentPage  ReportsAdminPage
    ├── CleaningPage     ConsultationPage
    ├── PermissionStudentPage  PermissionAdminPage
    └── DisciplineAdminPage  DisciplineStudentPage
```

### Design principles

- **Logic out of the UI** — auth, filtering, adding, and status changes live in
  `hooks/` and `lib/`, not inside JSX.
- **One source of truth** — status values and badge colors are all in
  `constants.ts`; change them once, they update everywhere.
- **Mock data isolated** — everything in `data/` is the only place to edit
  sample content.

# Poem-Project
