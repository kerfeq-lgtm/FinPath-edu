import { useState } from "react";
import { Activity, ArrowRight, Award, BarChart3, BookOpen, Bookmark, CheckCircle2, Clock3, Compass, GraduationCap, LayoutDashboard, Search, Settings2, Sparkles, Target, WalletCards } from "lucide-react";

const courses = [
  { id: 1, title: "Money Fundamentals", category: "PERSONAL FINANCE", description: "Understand income, expenses, cash flow, and how to build a budget that works in real life.", lessons: 12, time: "3.5 hours", icon: WalletCards, tone: "blue", status: "In progress", progress: 25 },
  { id: 2, title: "Banking & Saving", category: "PERSONAL FINANCE", description: "Explore bank accounts, emergency savings, interest, and how to compare financial services.", lessons: 10, time: "3 hours", icon: Bookmark, tone: "mint", status: "Ready to start", progress: 0 },
  { id: 3, title: "Employment & Taxes", category: "PERSONAL FINANCE", description: "Learn about paychecks, pay stubs, employee benefits, tax basics, and workplace paperwork.", lessons: 11, time: "4 hours", icon: GraduationCap, tone: "gold", status: "Coming soon", progress: 0 },
  { id: 4, title: "Credit & Debt", category: "PERSONAL FINANCE", description: "Learn how credit works, compare borrowing costs, and understand repayment strategies.", lessons: 12, time: "4 hours", icon: Target, tone: "lavender", status: "Coming soon", progress: 0 },
  { id: 5, title: "Investing & Retirement", category: "PERSONAL FINANCE", description: "Build foundational knowledge of risk, diversification, compound growth, and retirement accounts.", lessons: 13, time: "5 hours", icon: Activity, tone: "mint", status: "Coming soon", progress: 0 },
  { id: 6, title: "Household & International Finance", category: "ADULT LIFE", description: "Plan housing and household costs, compare currencies, and build realistic relocation budgets.", lessons: 14, time: "5 hours", icon: Compass, tone: "gold", status: "Coming soon", progress: 0 },
  { id: 7, title: "Financial Data Analysis", category: "DATA & ANALYSIS", description: "Use spreadsheets, check data quality, analyze spending, and communicate findings clearly.", lessons: 15, time: "6 hours", icon: BarChart3, tone: "lavender", status: "Coming soon", progress: 0 },
];
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard }, { label: "My courses", icon: BookOpen },
  { label: "Assignments", icon: CheckCircle2 }, { label: "Assessments", icon: Target },
  { label: "My progress", icon: BarChart3 }, { label: "Study resources", icon: Bookmark },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All courses");
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("finpath-completed") || "[]") as string[]; } catch { return []; }
  });
  const visibleCourses = courses.filter((c) => {
    const matchesQuery = (c.title + " " + c.category + " " + c.description).toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All courses" || (filter === "Personal finance" && c.category === "PERSONAL FINANCE") || (filter === "Adult life" && c.category === "ADULT LIFE") || (filter === "Data analysis" && c.category === "DATA & ANALYSIS");
    return matchesQuery && matchesFilter;
  });
  const current = courses.find((c) => c.id === selected);
  const markIntroComplete = () => {
    const next = completed.includes("welcome") ? completed : [...completed, "welcome"];
    setCompleted(next);
    localStorage.setItem("finpath-completed", JSON.stringify(next));
  };
  const title = activeNav === "Dashboard" ? "Your learning dashboard" : activeNav;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><GraduationCap size={23}/></div><div><span className="brand-name">finpath<span>.</span></span><span className="brand-caption">ACADEMY</span></div></div>
      <div className="nav-caption">LEARNING SPACE</div>
      <nav>{navItems.map(({label, icon: Icon}) => <button key={label} className={"nav-item " + (activeNav === label ? "active" : "")} onClick={() => setActiveNav(label)}><Icon size={18}/><span>{label}</span>{label === "Assignments" && <small>0</small>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><strong>Small steps count.</strong><p>Build useful money skills one lesson at a time.</p><button onClick={() => setActiveNav("Study resources")}>Explore resources <ArrowRight size={14}/></button></div><button className="nav-item" onClick={() => setActiveNav("Settings")}><Settings2 size={18}/>Settings</button><div className="profile"><div className="avatar">FP</div><div><strong>Independent learner</strong><small>Personal learning space</small></div></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="crumb">Academy <span>/</span> <strong>{activeNav}</strong></div><div className="learning-status"><i/> Learning at your pace</div></header>
      <div className="page-content">
        <section className="welcome"><div><div className="eyebrow"><i/> YOUR NEXT CHAPTER STARTS HERE</div><h1>{title}<span>.</span></h1><p>A little progress today builds confidence for tomorrow.</p></div><div className="path-chip"><Compass size={18}/><div><small>YOUR PATH</small><strong>Learn by doing</strong></div></div></section>
        {activeNav !== "Dashboard" && <div className="notice"><Sparkles size={20}/><div><strong>This part of the academy is being built.</strong><p>The dashboard and course catalog are the first foundation. More interactive learning tools will be added in stages.</p></div></div>}
        <section className="hero">
          <div className="hero-copy"><div className="hero-label"><Sparkles size={13}/> YOUR PERSONAL FINANCE JOURNEY</div><h2>Make money make<br/> more sense.</h2><p>Learn practical skills for real-life decisions—from your first budget to understanding financial data.</p><button className="primary-button" onClick={() => setSelected(1)}>Continue learning <ArrowRight size={16}/></button><div className="hero-foot"><CheckCircle2 size={14}/> Self-paced learning <span>·</span> No account required</div></div>
          <div className="hero-art" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="chart-card"><small>MONTHLY PLAN</small><div className="bars"><i/><i/><i/><i/><i/><i/></div><div className="fake-line"/></div><div className="coin">$</div><div className="money-card"><small>YOUR MONEY <span>•••</span></small><strong>$1,240.00</strong><em>↗ Your plan, your pace</em><div className="mini-progress"><i/></div></div><b className="spark spark-one">✳</b><b className="spark spark-two">✦</b></div>
        </section>
        <section className="stats">
          <div className="stat"><div className="stat-icon blue"><BookOpen size={19}/></div><div><small>COURSES AVAILABLE</small><strong>7 <em>learning paths</em></strong></div></div>
          <div className="stat"><div className="stat-icon mint"><CheckCircle2 size={19}/></div><div><small>LESSONS COMPLETED</small><strong>{completed.length} <em>starter activities</em></strong></div></div>
          <div className="stat"><div className="stat-icon lavender"><Award size={19}/></div><div><small>LEARNING MOMENTUM</small><strong>{completed.length ? "Started" : "Ready"} <em>at your pace</em></strong></div></div>
        </section>
        <section className="curriculum">
          <div className="section-heading"><div><div className="kicker">YOUR CURRICULUM</div><h2>Explore your courses</h2><p>Seven courses. Practical skills. Progress that belongs to you.</p></div><div className="course-count">7 COURSES</div></div>
          <div className="toolbar"><div className="filters">{["All courses","Personal finance","Adult life","Data analysis"].map((f) => <button key={f} className={filter === f ? "filter active" : "filter"} onClick={() => setFilter(f)}>{f}</button>)}</div><label className="search"><Search size={16}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a course..." aria-label="Find a course"/></label></div>
          <div className="course-grid">{visibleCourses.map((course) => {const Icon = course.icon;return <article className="course-card" key={course.id}><div className="course-top"><div className={"course-icon " + course.tone}><Icon size={20}/></div><span className={"badge " + (course.status === "In progress" ? "in-progress" : "")}>{course.status === "In progress" && <i/>}{course.status}</span></div><div className="category">{course.category}</div><h3>{course.title}</h3><p className="description">{course.description}</p><div className="meta"><span><BookOpen size={14}/> {course.lessons} lessons</span><span><Clock3 size={14}/> {course.time}</span></div>{course.progress > 0 && <div className="course-progress"><div><span>Course progress</span><strong>{course.progress}%</strong></div><div className="track"><i style={{width: course.progress + "%"}}/></div></div>}<button className="course-button" onClick={() => setSelected(course.id)}>{course.status === "In progress" ? "Continue course" : course.status === "Ready to start" ? "Explore course" : "Preview course"} <ArrowRight size={15}/></button></article>;})}</div>
          {visibleCourses.length === 0 && <div className="empty"><Search size={22}/><strong>No courses found</strong><p>Try a different search or pathway.</p><button onClick={() => {setQuery("");setFilter("All courses");}}>Clear filters</button></div>}
        </section>
        <section className="bottom-grid"><div className="next-card"><div className="next-icon"><Target size={19}/></div><div><div className="kicker">RECOMMENDED NEXT STEP</div><h3>Start with your money story</h3><p>Learn the difference between income, expenses, and cash flow before building your first budget.</p><button onClick={() => setSelected(1)}>Open first lesson <ArrowRight size={15}/></button></div><b>01</b></div><div className="promise-card"><div className="promise-label"><Award size={18}/> OUR LEARNING PROMISE</div><h3>Understand it.<br/>Then use it.</h3><p>FinPath focuses on practical understanding—not rushing through lessons. Learn, practice, review, and grow at your own pace.</p><div className="promise-foot"><i/> Built for real life</div></div></section>
        <footer><strong>finpath<span>.</span></strong><p>Learn money. Understand data. Build your future.</p><small>General education only · Not financial or tax advice</small></footer>
      </div>
    </main>
    {current && <div className="modal-backdrop" onMouseDown={(e) => {if(e.target === e.currentTarget) setSelected(null);}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-x" aria-label="Close" onClick={() => setSelected(null)}>×</button><div className={"course-icon modal-icon " + current.tone}><current.icon size={22}/></div><div className="category">{current.category}</div><h2 id="modal-title">{current.title}</h2><p>{current.description}</p><div className="modal-meta"><span><BookOpen size={15}/> {current.lessons} lessons planned</span><span><Clock3 size={15}/> {current.time}</span></div>{current.id === 1 ? <div className="lesson-preview"><div className="kicker">FIRST LESSON · INTRODUCTION</div><h3>Welcome to your money story</h3><p>Money skills start with understanding what comes in, what goes out, and what you want your money to help you do.</p><div className="objective"><CheckCircle2 size={17}/><div><strong>Learning objective</strong><span>Identify income, expenses, and the role of cash flow in a personal budget.</span></div></div><button className="primary-button full" onClick={() => {markIntroComplete();setSelected(null);setActiveNav("My progress");}}>Mark intro complete <CheckCircle2 size={16}/></button><small className="local-note">This starter activity saves on this device. Full lesson content is still in development.</small></div> : <div className="coming"><Clock3 size={18}/><div><strong>Course content is in development</strong><p>This course is part of the academy curriculum. Full lessons, activities, and assessments will be added in later builds.</p></div></div>}<button className="back-button" onClick={() => setSelected(null)}>Back to dashboard</button></section></div>}
  </div>;
}
