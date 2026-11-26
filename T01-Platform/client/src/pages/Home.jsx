
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiBookOpen,
  FiTarget,
  FiTrendingUp
} from 'react-icons/fi';
import { contentAPI, productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const Tag = ({ children, light = false }) => (
  <span
    className={`inline-flex items-center text-xs font-bold uppercase tracking-[0.16em] ${
      light ? 'text-amber' : 'text-sky-brand'
    }`}
  >
    <span className="w-6 h-[2px] bg-amber mr-3" />
    {children}
  </span>
);

const SectionHeading = ({ tag, title, light = false }) => (
  <div className="mb-10">
    <Tag light={light}>{tag}</Tag>
    <h2
      className={`mt-4 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-2xl ${
        light ? 'text-cream-soft' : 'text-navy-800'
      }`}
    >
      {title}
    </h2>
  </div>
);

export default function Home() {
  const { user } = useAuth();
  const [c, setC] = useState(null);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    contentAPI.get('home')
      .then((r) => setC(r.data.data))
      .catch(() => setC(false));

    productAPI.featured()
      .then((r) => setFeatured(r.data.products))
      .catch(() => {});
  }, []);

  if (c === null) return <Spinner full />;

  if (c === false) {
    return (
      <div className="container-t01 py-24 text-center">
        Could not load the page. Please refresh.
      </div>
    );
  }

  const problemNumbers = ['01', '02', '03'];
  const solutionIcons = [FiCompass, FiBookOpen, FiTarget];

  return (
    <main className="bg-cream">

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-800 text-cream-soft">
        <div className="container-t01 py-20 md:py-28 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">

          <div className="relative z-10">
            <Tag light>{c.hero.eyebrow}</Tag>

            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight">
              {c.hero.title}
            </h1>

            <p className="mt-7 text-base md:text-lg leading-8 text-cream-soft/70 max-w-xl">
              {c.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to={user ? '/options?free=1' : '/register'}
                className="btn-primary inline-flex items-center gap-2"
              >
                {user ? 'Go to options' : c.hero.primaryCta}
                <FiArrowRight />
              </Link>

              <Link
                to="/options"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-cream-soft/30 text-cream-soft font-bold hover:bg-cream-soft/10 transition"
              >
                {c.hero.secondaryCta}
              </Link>
            </div>
          </div>

          {/* STATISTIC CARD */}
          <div className="relative">
            <div className="absolute -top-5 -right-5 w-28 h-28 bg-amber/10 rounded-full blur-2xl" />

            <div className="relative bg-navy-700 border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs uppercase tracking-[0.18em] font-bold text-cream-soft/50">
                  The reality
                </span>
                <span className="w-2 h-2 rounded-full bg-amber" />
              </div>

              <div className="bg-cream rounded-xl p-7 md:p-6 text-navy-800">
                <p className="text-5xl md:text-6xl font-extrabold tracking-tight">
                  {c.stat.value}
                </p>

                <p className="mt-3 text-base md:text-lg font-bold leading-snug">
                  {c.stat.label}
                </p>

                <div className="mt-7 pt-4 border-t border-navy-800/10">
                  <p className="text-xs text-navy-800/50">
                    Source: {c.stat.source}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-lg bg-sky-brand/90 p-4 h-15 flex items-end">
                  <span className="text-sm font-bold text-white">Learn with direction.</span>
                </div>
                <div className="rounded-lg bg-amber p-4 h-15 flex items-end">
                  <span className="text-sm font-bold text-navy-800">Build with purpose.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CHOOSE JOURNEY */}
      <section className="py-20 md:py-24">
        <div className="container-t01">

          <SectionHeading
            tag="Start Here"
            title="Choose the right path for your next step."
          />

          <div className="grid md:grid-cols-2 gap-5">

            <Link
              to="/options"
              className="group bg-white border border-navy-800/10 rounded-2xl p-7 md:p-9 hover:border-sky-brand/50 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-sky-brand/10 text-sky-brand flex items-center justify-center">
                  <FiBookOpen size={23} />
                </div>
                <FiArrowRight className="text-navy-800/40 group-hover:text-sky-brand group-hover:translate-x-1 transition" size={22} />
              </div>

              <h3 className="mt-7 text-xl md:text-2xl font-extrabold text-navy-800">
                I want to options products
              </h3>

              <p className="mt-3 text-navy-800/65 leading-7">
                Go straight to roadmaps, guides and interview resources.
              </p>

              <span className="inline-flex mt-7 items-center gap-2 font-bold text-sky-brand text-sm">
                Browse products <FiArrowRight />
              </span>
            </Link>

            <a
              href="#problems"
              className="group bg-navy-800 rounded-2xl p-7 md:p-9 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-amber/15 text-amber flex items-center justify-center">
                  <FiCompass size={23} />
                </div>
                <FiArrowRight className="text-cream-soft/40 group-hover:text-amber group-hover:translate-x-1 transition" size={22} />
              </div>

              <h3 className="mt-7 text-xl md:text-2xl font-extrabold text-cream-soft">
                Help me understand the problem
              </h3>

              <p className="mt-3 text-cream-soft/65 leading-7">
                See why graduates struggle and how T01 solves it.
              </p>

              <span className="inline-flex mt-7 items-center gap-2 font-bold text-amber text-sm">
                Understand more <FiArrowRight />
              </span>
            </a>

          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section id="problems" className="py-20 bg-white">
        <div className="container-t01">

          <SectionHeading
            tag="The Challenge"
            title={c.problemsTitle}
          />

          <div className="grid md:grid-cols-3 gap-5">
            {c.problems.map((p, i) => (
              <div
                key={p.title}
                className="group p-7 md:p-8 rounded-2xl border border-navy-800/10 bg-cream hover:-translate-y-1 hover:shadow-lg transition duration-300"
              >
                <span className="text-sm font-extrabold tracking-widest text-amber">
                  {problemNumbers[i] || `0${i + 1}`}
                </span>

                <div className="w-10 h-[3px] bg-amber mt-5 mb-6 group-hover:w-16 transition-all" />

                <h3 className="text-xl font-extrabold text-navy-800">
                  {p.title}
                </h3>

                <p className="mt-3 text-navy-800/65 leading-7">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-20 md:py-24">
        <div className="container-t01">

          <SectionHeading
            tag="Our Solutions"
            title={c.solutionsTitle}
          />

          <div className="grid md:grid-cols-3 gap-5">
            {c.solutions.map((s, i) => {
              const Icon = solutionIcons[i % solutionIcons.length];

              return (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl p-7 border border-navy-800/10 hover:shadow-lg transition duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-mint text-navy-800 flex items-center justify-center">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-navy-800">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-navy-800/65 leading-7">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-t01">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <SectionHeading
                tag="Explore T01"
                title="Resources to help you move forward."
              />

              <Link
                to="/options"
                className="mb-10 inline-flex items-center gap-2 font-bold text-sky-brand hover:gap-3 transition-all text-sm"
              >
                View all products <FiArrowRight />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* WHY T01 */}
      <section className="bg-navy-800 py-20 md:py-24 text-cream-soft">
        <div className="container-t01">

          <SectionHeading
            tag="Why Choose T01?"
            title="A more thoughtful way to move towards your future."
            light
          />

          <div className="grid md:grid-cols-3 gap-5">
            {c.why.map((w, i) => (
              <div
                key={w.title}
                className="bg-navy-700 border border-white/10 rounded-2xl p-7 md:p-8"
              >
                <span className="text-amber text-sm font-extrabold tracking-widest">
                  0{i + 1}
                </span>

                <h3 className="mt-5 text-xl font-extrabold text-amber">
                  {w.title}
                </h3>

                <p className="mt-3 text-cream-soft/70 leading-7">
                  {w.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="container-t01">
          <div className="relative overflow-hidden bg-cream rounded-2xl border border-navy-800/10 p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            <div className="relative z-10 max-w-2xl">
              <Tag>Take the Next Step</Tag>

              <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-navy-800">
                {c.cta.title}
              </h2>
            </div>

            <Link
              to={user ? '/options' : '/register'}
              className="relative z-10 btn-primary inline-flex items-center gap-4 shrink-0"
            >
              {c.cta.button}
              <FiArrowRight />
            </Link>

            <div className="absolute -right-16 -bottom-24 w-64 h-64 rounded-full border-[35px] border-amber/10 pointer-events-none" />

          </div>
        </div>
      </section>

    </main>
  );
}
