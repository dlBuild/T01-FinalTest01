
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiList,
  FiX,
  FiEdit3,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { readerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import VideoEmbed from '../components/VideoEmbed';
import RichText from '../utils/richText';
import { errMsg } from '../utils/format';

/* ---------- interactive blocks ---------- */

function TaskBlock({ block, done, onToggle }) {
  return (
    <label
      className={`reader-task flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
        done
          ? 'border-green-600/40 bg-green-50'
          : 'border-navy-800/15 bg-white hover:border-amber'
      }`}
    >
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 accent-green-700"
        checked={done}
        onChange={(e) => onToggle(block.id, e.target.checked)}
      />
      <span className={done ? 'line-through text-navy-800/60' : 'font-semibold'}>
        {block.label}
      </span>
    </label>
  );
}

function ActivityBlock({ block, done, onToggle }) {
  return (
    <div className="reader-activity rounded-2xl border-2 border-dashed border-amber bg-amber/10 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-dark">
        Activity
      </p>

      <h4 className="text-lg font-extrabold mt-1">
        {block.title}
      </h4>

      {block.body && (
        <div className="mt-2">
          <RichText text={block.body} />
        </div>
      )}

      <label className="mt-4 inline-flex items-center gap-2 text-sm font-bold cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 accent-green-700"
          checked={done}
          onChange={(e) => onToggle(block.id, e.target.checked)}
        />
        I have done this
      </label>
    </div>
  );
}

function QuizBlock({ block, slug, result, onResult }) {
  const [choice, setChoice] = useState(result?.chosen ?? null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(
    result
      ? { correct: result.correct, explanation: result.explanation }
      : null
  );

  const check = async () => {
    if (choice === null) return;

    setBusy(true);

    try {
      const { data } = await readerAPI.answer(slug, block.id, choice);

      setFeedback({
        correct: data.correct,
        explanation: data.explanation,
      });

      onResult(block.id, {
        chosen: choice,
        correct: data.correct,
      });
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="reader-quiz card p-5 border-t-4 border-sky-brand">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-brand">
        Quick test
      </p>

      <h4 className="text-lg font-extrabold mt-1">
        {block.question}
      </h4>

      <div className="mt-4 space-y-2">
        {block.options.map((o, i) => (
          <label
            key={i}
            className={`reader-quiz-option flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer text-sm ${
              choice === i
                ? 'border-sky-brand bg-sky-soft'
                : 'border-navy-800/15 hover:bg-cream'
            }`}
          >
            <input
              type="radio"
              name={`q-${block.id}`}
              checked={choice === i}
              onChange={() => {
                setChoice(i);
                setFeedback(null);
              }}
              className="accent-sky-brand"
            />
            {o}
          </label>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <button
          className="btn-dark"
          disabled={choice === null || busy}
          onClick={check}
        >
          {busy ? 'Checking...' : 'Check answer'}
        </button>

        {feedback && (
          <p
            className={`text-sm font-bold ${
              feedback.correct ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {feedback.correct
              ? '✓ Correct!'
              : 'Not quite - re-read the topic and try again.'}
          </p>
        )}
      </div>

      {feedback?.correct && feedback.explanation && (
        <p className="reader-muted text-sm mt-3">
          {feedback.explanation}
        </p>
      )}
    </div>
  );
}

function LinkBlock({ block }) {
  const internal = block.href.startsWith('/');
  const cls = 'inline-flex items-center gap-2 font-bold text-sky-brand underline';

  return internal ? (
    <Link to={block.href} className={cls}>
      {block.label} <FiChevronRight />
    </Link>
  ) : (
    <a
      href={block.href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={cls}
    >
      {block.label} <FiExternalLink />
    </a>
  );
}

/* ---------- the reader ---------- */

export default function Learn() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [book, setBook] = useState(null);
  const [err, setErr] = useState('');
  const [done, setDone] = useState(new Set());
  const [quiz, setQuiz] = useState({});
  const [tocOpen, setTocOpen] = useState(false);
  const topRef = useRef(null);

  // Reader theme: saved separately from the rest of the website
  const [readerTheme, setReaderTheme] = useState(() => {
    try {
      return localStorage.getItem('storiisto-reader-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('storiisto-reader-theme', readerTheme);
    } catch {
      // Continue using the selected theme for this session.
    }
  }, [readerTheme]);

  const isDark = readerTheme === 'dark';

  const toggleTheme = () => {
    setReaderTheme((current) => current === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setBook(null);
    setErr('');

    readerAPI.get(slug)
      .then((r) => {
        setBook(r.data);
        setDone(new Set(r.data.progress.done));
        setQuiz(r.data.progress.quiz);
      })
      .catch((e) => {
        setErr(errMsg(e, 'Could not open this e-book'));
        setBook(false);
      });
  }, [slug]);

  // Flat list of topics for previous/next navigation
  const flat = useMemo(
    () =>
      book
        ? book.chapters.flatMap((c, ci) =>
            c.topics.map((t, ti) => ({ c, t, ci, ti }))
          )
        : [],
    [book]
  );

  const requested = params.get('t') || book?.progress?.lastTopic;

  const idx = Math.max(
    0,
    flat.findIndex((x) => x.t.id === requested)
  );

  const cur = flat[idx];

  // Remember reader position
  useEffect(() => {
    if (!cur) return;

    readerAPI.position(slug, cur.t.id).catch(() => {});

    topRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [cur?.t.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (i) => {
    setParams({ t: flat[i].t.id }, { replace: true });
    setTocOpen(false);
  };

  const toggle = async (blockId, value) => {
    // Update instantly
    setDone((s) => {
      const n = new Set(s);
      value ? n.add(blockId) : n.delete(blockId);
      return n;
    });

    try {
      await readerAPI.setTask(slug, blockId, value);
    } catch (e) {
      toast.error(errMsg(e, 'Could not save'));

      // Revert if saving fails
      setDone((s) => {
        const n = new Set(s);
        value ? n.delete(blockId) : n.add(blockId);
        return n;
      });
    }
  };

  const onResult = (id, r) => {
    setQuiz((q) => ({ ...q, [id]: r }));
  };

  if (book === null) return <Spinner full />;

  if (book === false) {
    return (
      <div className="container-storiisto py-24 text-center max-w-lg">
        <p className="mb-5">{err}</p>
        <Link className="btn-primary" to="/options">
          Back to options
        </Link>
      </div>
    );
  }

  if (!cur) {
    return (
      <div className="container-storiisto py-24 text-center max-w-lg">
        <h1 className="text-2xl font-extrabold">
          {book.product.title}
        </h1>

        <p className="mt-3 text-navy-800/70">
          The author is still preparing the content. Please check back soon.
        </p>

        <Link className="btn-dark mt-6" to="/dashboard">
          Back to My Learning
        </Link>
      </div>
    );
  }

  // Progress = completed tasks + activities + correctly answered quizzes
  const total = book.stats.trackable;
  let completed = 0;

  book.chapters.forEach((c) =>
    c.topics.forEach((t) =>
      t.blocks.forEach((b) => {
        if (
          (b.type === 'task' || b.type === 'activity') &&
          done.has(b.id)
        ) {
          completed++;
        }

        if (b.type === 'quiz' && quiz[b.id]?.correct) {
          completed++;
        }
      })
    )
  );

  const pct = total
    ? Math.round((completed / total) * 100)
    : 0;

  const topicDone = (t) => {
    const items = t.blocks.filter((b) =>
      ['task', 'activity', 'quiz'].includes(b.type)
    );

    return (
      items.length > 0 &&
      items.every((b) =>
        b.type === 'quiz'
          ? quiz[b.id]?.correct
          : done.has(b.id)
      )
    );
  };

  // Table of contents
  const Toc = (
    <nav aria-label="Contents" className="space-y-5">
      {book.chapters.map((c, ci) => (
        <div key={c.id}>
          <p className="reader-muted text-xs font-bold uppercase tracking-wide">
            Chapter {ci}
          </p>

          <p className="font-extrabold text-sm mb-1.5">
            {c.title}
          </p>

          <ul className="space-y-0.5">
            {c.topics.map((t) => {
              const i = flat.findIndex((x) => x.t.id === t.id);
              const active = i === idx;

              return (
                <li key={t.id}>
                  <button
                    onClick={() => go(i)}
                    className={`w-full text-left text-sm rounded-lg px-3 py-2 flex items-start gap-2 transition ${
                      active
                        ? 'bg-navy-800 text-white font-bold'
                        : 'reader-toc-button hover:bg-sky-soft'
                    }`}
                  >
                    <span
                      className={`mt-0.5 h-4 w-4 shrink-0 rounded-full flex items-center justify-center text-[10px] ${
                        topicDone(t)
                          ? 'bg-green-600 text-white'
                          : 'border border-current opacity-40'
                      }`}
                    >
                      {topicDone(t) && <FiCheck />}
                    </span>

                    <span>{t.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const renderBlock = (b) => {
    switch (b.type) {
      case 'text':
        return <RichText text={b.body} />;

      case 'video':
        return <VideoEmbed video={b.video} title={b.title} />;

      case 'task':
        return (
          <TaskBlock
            block={b}
            done={done.has(b.id)}
            onToggle={toggle}
          />
        );

      case 'activity':
        return (
          <ActivityBlock
            block={b}
            done={done.has(b.id)}
            onToggle={toggle}
          />
        );

      case 'quiz':
        return (
          <QuizBlock
            key={b.id}
            block={b}
            slug={slug}
            result={quiz[b.id]}
            onResult={onResult}
          />
        );

      case 'link':
        return <LinkBlock block={b} />;

      default:
        return null;
    }
  };

  return (
    <div
      ref={topRef}
      className={`reader-page min-h-screen transition-colors duration-300 ${
        isDark ? 'reader-dark' : 'reader-light'
      }`}
    >
      <style>{`
        .reader-page {
          min-height: 100vh;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .reader-light {
          background-color: #faf7f0;
          color: #293548;
        }

        .reader-dark {
          background-color: #171b24;
          color: #e8e6df;
        }

        /* Muted text */
        .reader-page .reader-muted {
          color: #647084;
        }

        .reader-dark .reader-muted {
          color: #a6afbd;
        }

        /* Sidebar and cards */
        .reader-dark .card,
        .reader-dark .reader-quiz {
          background-color: #222936;
          color: #e8e6df;
          border-color: rgba(255,255,255,0.12);
        }

        .reader-dark .reader-task {
          background-color: #222936;
          color: #e8e6df;
          border-color: rgba(255,255,255,0.15);
        }

        .reader-dark .reader-task:hover {
          border-color: #d6a84f;
        }

        .reader-dark .reader-task span {
          color: #e8e6df;
        }

        .reader-dark .reader-task span.line-through {
          color: #9ca6b5;
        }

        .reader-dark .reader-activity {
          background-color: rgba(214,168,79,0.08);
          border-color: rgba(214,168,79,0.65);
          color: #e8e6df;
        }

        /* Quiz options */
        .reader-dark .reader-quiz-option {
          background-color: #293241;
          color: #e8e6df;
          border-color: rgba(255,255,255,0.15);
        }

        .reader-dark .reader-quiz-option:hover {
          background-color: #343f50;
        }

        .reader-dark .reader-quiz-option:has(input:checked) {
          background-color: rgba(86,160,210,0.16);
          border-color: #64b5e5;
        }

        /* Table of contents */
        .reader-dark .reader-toc-button {
          color: #d7dce5;
        }

        .reader-dark .reader-toc-button:hover {
          background-color: #303b4b;
        }

        /* Mobile contents panel */
        .reader-dark .reader-mobile-toc {
          background-color: #222936;
          color: #e8e6df;
        }

        /* Progress bar */
        .reader-dark .reader-progress-track {
          background-color: #343e4d;
        }

        /* Article content generated by RichText */
        .reader-dark .reader-content {
          color: #e8e6df;
        }

        .reader-dark .reader-content p,
        .reader-dark .reader-content li,
        .reader-dark .reader-content blockquote {
          color: #d5d9e0;
        }

        .reader-dark .reader-content h1,
        .reader-dark .reader-content h2,
        .reader-dark .reader-content h3,
        .reader-dark .reader-content h4,
        .reader-dark .reader-content strong {
          color: #f1eee7;
        }

        .reader-dark .reader-content a {
          color: #82c9f3;
        }

        .reader-dark .reader-content code {
          background-color: #303b4b;
          color: #f1eee7;
        }

        .reader-dark .reader-content pre {
          background-color: #10151d;
          color: #e8e6df;
        }

        .reader-dark .reader-content hr {
          border-color: rgba(255,255,255,0.15);
        }

        /* Chapter and topic headings */
        .reader-dark .reader-heading {
          color: #f1eee7;
        }

        /* Navigation separator */
        .reader-dark .reader-navigation {
          border-color: rgba(255,255,255,0.15);
        }

        /* Theme toggle */
        .reader-theme-toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(41,53,72,0.2);
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .reader-dark .reader-theme-toggle {
          border-color: rgba(255,255,255,0.2);
          color: #e8e6df;
          background-color: #252d3a;
        }

        .reader-light .reader-theme-toggle {
          color: #293548;
          background-color: rgba(255,255,255,0.65);
        }

        .reader-theme-toggle:hover {
          transform: translateY(-1px);
        }

        /* Keep videos and embedded media within the reader */
        .reader-page iframe {
          max-width: 100%;
        }
      `}</style>

      <div className="container-storiisto py-8 scroll-mt-24">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <Link
              to="/dashboard"
              className="text-sm font-bold text-yellow-700 hover:text-red-400 flex items-center gap-1"
            >
              ← My Learning
            </Link>

            <h1 className="reader-heading text-2xl md:text-3xl font-extrabold mt-1">
              {book.product.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="reader-theme-toggle"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
            </button>

            {user?.role === 'admin' && (
              <Link
                to={`/admin/products/${book.product.id}/content`}
                className="btn-outline-dark !py-2 !px-4"
              >
                <FiEdit3 /> Edit
              </Link>
            )}

            <button
              className="lg:hidden btn-dark !py-2 !px-4"
              onClick={() => setTocOpen(true)}
            >
              <FiList /> Contents
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold reader-muted mb-1.5">
            <span>Your progress</span>
            <span>{pct}%</span>
          </div>

          <div className="reader-progress-track h-2.5 rounded-full bg-white overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto card p-5">
            {Toc}
          </aside>

          {/* Mobile contents drawer */}
          {tocOpen && (
            <div
              className="lg:hidden fixed border border-navy-800/10 inset-0 z-50 bg-navy-900/60 backdrop-blur-sm"
              onClick={() => setTocOpen(false)}
            >
              <div
                className="reader-mobile-toc absolute right-0 top-0 h-full bg-cream w-[55%] max-w-sm p-5 border border-navy-800/10 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="mb-4"
                  aria-label="Close contents"
                  onClick={() => setTocOpen(false)}
                >
                  <FiX size={24} />
                </button>

                {Toc}
              </div>
            </div>
          )}

          {/* Article */}
          <article className="reader-content min-w-0 max-w-3xl">

            <span className="section-tag">
              Chapter {cur.ci} · {cur.c.title}
            </span>

            {/* Chapter summary */}
            {cur.ti === 0 && cur.c.summary && (
              <div className="reader-muted text-lg -mt-2 mb-6">
                <RichText text={cur.c.summary} />
              </div>
            )}

            {/* Chapter video */}
            {cur.ti === 0 && cur.c.video && (
              <div className="mb-8">
                <VideoEmbed
                  video={cur.c.video}
                  title={`${cur.c.title} - chapter video`}
                />
              </div>
            )}

            {/* Topic title */}
            <h2 className="reader-heading text-3xl font-extrabold mb-6">
              {cur.t.title}
            </h2>

            {/* Topic video */}
            {cur.t.video && (
              <div className="mb-8">
                <VideoEmbed
                  video={cur.t.video}
                  title={`${cur.t.title} - explanation video`}
                />
              </div>
            )}

            {/* Topic blocks */}
            <div className="space-y-6">
              {cur.t.blocks.map((b) => (
                <div key={b.id}>
                  {renderBlock(b)}
                </div>
              ))}
            </div>

            {/* Previous / Next navigation */}
            <div className="reader-navigation flex justify-between gap-4 mt-12 pt-6 border-t border-navy-800/10">
              {idx > 0 ? (
                <button
                  className="btn-outline-dark"
                  onClick={() => go(idx - 1)}
                >
                  <FiChevronLeft />
                  {flat[idx - 1].t.title}
                </button>
              ) : (
                <span />
              )}

              {idx < flat.length - 1 ? (
                <button
                  className="btn-primary"
                  onClick={() => go(idx + 1)}
                >
                  Next: {flat[idx + 1].t.title}
                  <FiChevronRight />
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Finish <FiCheck />
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
