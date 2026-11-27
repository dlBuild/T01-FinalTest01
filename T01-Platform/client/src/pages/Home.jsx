
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBookOpen,
  FiCompass,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle
} from 'react-icons/fi';

import { contentAPI, productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

// Reusable section label
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

// Reusable section heading
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
    contentAPI
      .get('home')
      .then((r) => setC(r.data.data))
      .catch(() => setC(false));

    productAPI
      .featured()
      .then((r) => setFeatured(r.data.products))
      .catch(() => {});
  }, []);

  if (c === null) {
    return <Spinner full />;
  }

  if (c === false) {
    return (
      <div className="container-storiisto py-24 text-center">
        Could not load the page. Please refresh.
      </div>
    );
  }

  const problemNumbers = ['01', '02', '03'];

  const solutionIcons = [
    FiCompass,
    FiBookOpen,
    FiTarget
  ];

  return (
    <main className="bg-cream">

      {/* =================================
          HERO SECTION
      ================================= */}

      <section className="relative overflow-hidden bg-navy-800 text-cream-soft">
        <div className="container-storiisto py-12 md:py-16 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">

          {/* Hero Content */}
          <div className="relative z-10">

            <Tag light>
              {c.hero.eyebrow}
            </Tag>

            <h1 className="mt-7 text-base md:text-10xl lg:text-[58px] font-extrabold leading-[1.1] tracking-tight">
              Stop Guessing.
              <br />
              Start Building Your Future.
            </h1>

            <p className="mt-7 text-base md:text-lg leading-8 text-cream-soft/70 max-w-xl">
              Get practical guidance, structured roadmaps and carefully designed resources to make better career decisions, develop valuable skills and take confident steps towards your goals.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to={user ? '/options?free=1' : '/register'}
                className="btn-primary inline-flex items-center gap-2"
              >
                {user ? 'Explore For Free' : 'Get Started'}
                <FiArrowRight />
              </Link>

              <Link
                to="/options"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-cream-soft/30 text-cream-soft font-bold hover:bg-cream-soft/10 transition"
              >
                Explore Solutions
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-cream-soft/60">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-amber" />
                Practical Guidance
              </span>

              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-amber" />
                Structured Learning
              </span>
            </div>

          </div>

          {/* Statistic Card */}
          <div className="relative">

            <div className="relative bg-navy-700 border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl">

              <div className="flex justify-between items-center mb-6">
                <span className="text-xs uppercase tracking-[0.18em] font-bold text-cream-soft/50">
                  The reality behind the numbers
                </span>

                <span className="w-2 h-2 rounded-full bg-amber" />
              </div>

              <div className="bg-cream rounded-xl p-7 md:p-5 text-navy-800">

                <p className="text-5xl md:text-5xl font-extrabold tracking-tight">
                  {c.stat.value}
                </p>

                <p className="mt-3 text-base md:text-lg font-bold leading-snug">
                  {c.stat.label}
                </p>

                <div className="mt-7 pt-4 border-t border-navy-800/10">
                  <p className="text-xs text-navy-800/50">
                    Source: {c.stat.source}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4">

                <div className="rounded-lg bg-sky-brand/90 p-4 h-12 flex items-center">
                  <Link
                to="/options" className="text-sm font-bold text-white">
                    Learn with direction.
                  </Link>
              {/* <Link
                to="/options"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-cream-soft/30 text-cream-soft font-bold hover:bg-cream-soft/10 transition"
              >
                Explore Solutions
              </Link> */}
                </div>

                <div className="rounded-lg bg-amber p-4 h-12 flex items-center">
                  <Link
                to="/options" className="text-sm flex font-bold text-navy-800">
                    Build with purpose.
                  </Link>
                </div>

              </div>
                </div>

              </div>

              
            </div>

          </div>

        </div>
      </section>


      {/* =================================
          CHOOSE YOUR JOURNEY
      ================================= */}

      <section className="py-20 md:py-24">
        <div className="container-storiisto">

          <SectionHeading
            tag="Find Your Starting Point"
            title="What do you need help with today?"
          />

          <div className="grid md:grid-cols-2 gap-5">

            {/* Card 1 */}
            <Link
              to="/options"
              className="group bg-white border border-navy-800/10 rounded-2xl p-7 md:p-9 hover:border-sky-brand/50 hover:shadow-lg transition duration-300"
            >

              <div className="flex justify-between items-start">

                <div className="w-12 h-12 rounded-xl bg-sky-brand/10 text-sky-brand flex items-center justify-center">
                  <FiBookOpen size={23} />
                </div>

                <FiArrowRight
                  className="text-navy-800/40 group-hover:text-sky-brand group-hover:translate-x-1 transition"
                  size={22}
                />

              </div>

              <h3 className="mt-7 text-xl md:text-2xl font-extrabold text-navy-800">
                I know what I need
              </h3>

              <p className="mt-3 text-navy-800/65 leading-7">
                Looking for career roadmaps, skill-building guides, interview preparation or practical resources? Find the right material to help you move forward.
              </p>

              <span className="inline-flex mt-7 items-center gap-2 font-bold text-sky-brand text-sm">
                Free Solutions
                <FiArrowRight />
              </span>

            </Link>


            {/* Card 2 */}
            <a
              href="#problems"
              className="group bg-navy-800 rounded-2xl p-7 md:p-9 hover:shadow-lg transition duration-300"
            >

              <div className="flex justify-between items-start">

                <div className="w-12 h-12 rounded-xl bg-amber/15 text-amber flex items-center justify-center">
                  <FiCompass size={23} />
                </div>

                <FiArrowRight
                  className="text-cream-soft/40 group-hover:text-amber group-hover:translate-x-1 transition"
                  size={22}
                />

              </div>

              <h3 className="mt-7 text-xl md:text-2xl font-extrabold text-cream-soft">
                I'm still figuring things out
              </h3>

              <p className="mt-3 text-cream-soft/65 leading-7">
                Unsure about your career, skills or next move? Start by understanding your options and discovering a direction that makes sense for you.
              </p>

              <span className="inline-flex mt-7 items-center gap-2 font-bold text-amber text-sm">
                Find Your Direction
                <FiArrowRight />
              </span>

            </a>

          </div>

        </div>
      </section>


      {/* =================================
          PROBLEMS SECTION
      ================================= */}

      <section id="problems" className="py-20 bg-white">
        <div className="container-storiisto">

          <SectionHeading
            tag="The Challenge"
            title="Why Finding the Right Direction Is Difficult"
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
                  {[
                    'Too Many Choices, No Clear Direction',
                    'Learning Without a Clear Plan',
                    'Uncertainty About What Comes Next'
                  ][i] || p.title}
                </h3>

                <p className="mt-3 text-navy-800/65 leading-7">
                  {[
                    'With countless career options, courses and opinions available, deciding what to pursue can become overwhelming.',
                    'Many people spend time collecting information and learning different skills without knowing what actually matters for their goals.',
                    'Completing a degree or learning a skill is only one step. Knowing how to turn that effort into real opportunities is another challenge.'
                  ][i] || p.text}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =================================
          SOLUTIONS SECTION
      ================================= */}

      <section className="py-20 md:py-24">
        <div className="container-storiisto">

          <SectionHeading
            tag="Our Approach"
            title="Turn Uncertainty Into Action"
          />

          <div className="grid md:grid-cols-3 gap-5">

            {c.solutions.map((s, i) => {
              const Icon = solutionIcons[i % solutionIcons.length];

              const titles = [
                'Career Clarity',
                'Structured Learning Roadmaps',
                'Career Preparation Resources'
              ];

              const descriptions = [
                'Understand your interests, strengths, career options and priorities to make more informed decisions about your future.',
                'Follow organized, practical learning paths that help you understand what to learn, in what order and why it matters.',
                'Prepare for real opportunities with role-specific guides, interview questions, practical exercises and actionable resources.'
              ];

              return (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl p-7 border border-navy-800/10 hover:shadow-lg transition duration-300"
                >

                  <div className="w-14 h-14 rounded-xl bg-mint text-navy-800 flex items-center justify-center">
                    {/* <Icon size={25} /> */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj0VMZLqHm9fsHguR5hkwu2MRRh3WjpGrjPJWJ_vO4CtMcjYLq5yCkfVOG&s=10" alt="" />
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-navy-800">
                    {titles[i] || s.title}
                  </h3>

                  <p className="mt-3 text-navy-800/65 leading-7">
                    {descriptions[i] || s.text}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* =================================
          FEATURED PRODUCTS
      ================================= */}

      {featured.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-storiisto">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">

              <SectionHeading
                tag="Explore storiisto"
                title="Resources Built for Your Next Step."
              />

              <Link
                to="/options"
                className="mb-10 inline-flex items-center gap-2 font-bold text-sky-brand hover:gap-3 transition-all text-sm"
              >
                View all resources
                <FiArrowRight />
              </Link>

            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                />
              ))}
            </div>

          </div>
        </section>
      )}


      {/* =================================
          WHY CHOOSE storiisto
      ================================= */}

      <section className="bg-navy-800 py-20 md:py-24 text-cream-soft">
        <div className="container-storiisto">

          <SectionHeading
            tag="Why Choose storiisto?"
            title="Practical Guidance for Decisions That Shape Your Future."
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
                  {[
                    'Built Around Real Needs',
                    'Practical Over Theoretical',
                    'Clarity Without The Confusion'
                  ][i] || w.title}
                </h3>

                <p className="mt-3 text-cream-soft/70 leading-7">
                  {[
                    'Resources designed around the questions, challenges and decisions young people actually face.',
                    'Focus on actionable guidance, structured information and steps you can put into practice.',
                    'Make complicated career and learning decisions easier to understand and approach.'
                  ][i] || w.text}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="py-20 md:py-24">
        <div className="container-storiisto">

          <div className="relative overflow-hidden bg-cream rounded-2xl border border-navy-800/10 p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            <div className="relative z-10 max-w-2xl">

              <Tag>
                Start Your Journey with Storiisto
              </Tag>

              <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-navy-800">
                You Don't Need to Have Everything Figured Out.
              </h2>

              <p className="mt-4 text-navy-800/65 leading-7 max-w-xl">
                You just need to take the right next step. Explore practical resources that help you understand your options, build your skills and move closer to your goals.
              </p>

            </div>

            <Link
              to={user ? '/options' : '/register'}
              className="relative z-10 btn-primary inline-flex items-center gap-3 shrink-0"
            >
              {user ? 'Explore Your Options' : 'Get Started'}
              <FiArrowRight />
            </Link>

            <div className="absolute -right-16 -bottom-24 w-64 h-64 rounded-full border-[35px] border-amber/10 pointer-events-none" />

          </div>

        </div>
      </section>

    </main>
  );
}
