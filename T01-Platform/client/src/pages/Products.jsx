
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiBookOpen, FiFilter, FiX } from 'react-icons/fi';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { CATEGORIES } from '../utils/format';

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState(null);
  const [q, setQ] = useState(params.get('q') || '');

  const category = params.get('category') || '';
  const freeOnly = params.get('free') === '1';

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(null);

      productAPI.list({
        category: category || undefined,
        q: q || undefined,
        limit: 60
      })
        .then((r) => setItems(r.data.products))
        .catch(() => setItems([]));
    }, 250);

    return () => clearTimeout(t);
  }, [category, q]);

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  const clearFilters = () => {
    setParams(q ? { q } : {}, { replace: true });
  };

  const shown = items === null
    ? null
    : freeOnly
      ? items.filter((p) => p.price === 0)
      : items;

  const activeFilters = category || freeOnly;

  const chip = (active) =>
    `whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
      active
        ? 'bg-navy-800 text-white shadow-md'
        : 'bg-white border border-navy-800/10 text-navy-800 hover:border-navy-800 hover:bg-sky-soft'
    }`;

  return (
    <div className="min-h-screen bg-cream-soft">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="container-storiisto relative py-10 md:py-18">
          <div className="max-w-1xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sky-200 text-xs font-bold uppercase tracking-widest">
              <FiBookOpen />
              storiisto Solutions
            </div>

            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
              Find the Right Solution for Your
              <span className="text-sky-300"> Next Step.</span>
            </h1>

            <p className="mt-3 text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
              Explore practical guides, learning resources and carefully
              designed solutions to help you move forward with clarity
              and confidence.
            </p>

            {/* SEARCH */}
            <div className="mt-6 max-w-2xl">
              <div className="flex items-center bg-white rounded-2xl p-1 shadow-xl">
                <FiSearch className="ml-3 text-navy-800/50 text-xl shrink-0" />

                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full min-w-0 px-4 py-3 bg-transparent text-navy-900 outline-none placeholder:text-navy-800/40"
                />

                {q && (
                  <button
                    onClick={() => setQ('')}
                    className="p-2 text-navy-800/50 hover:text-navy-900"
                    aria-label="Clear search"
                  >
                    <FiX />
                  </button>
                )}
              </div>
              <p className="mt-3 text-sm text-white/45">
                Search guides, career resources and learning solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container-storiisto py-12 md:py-16">

        {/* SECTION HEADING */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-navy-800/45">
              Explore the library
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mt-2">
              Solutions for your growth
            </h2>
            <p className="mt-2 text-navy-800/60">
              Find resources that match your current goals.
            </p>
          </div>

          {shown !== null && (
            <div className="text-sm text-navy-800/60 font-medium">
              {shown.length} {shown.length === 1 ? 'resource' : 'resources'} found
            </div>
          )}
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl border border-navy-800/10 p-4 md:p-5 shadow-sm">

          <div className="flex items-center gap-2 mb-4 text-navy-900 font-bold text-sm">
            <FiFilter />
            Browse by category
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={chip(!category && !freeOnly)}
              onClick={() => setParams(q ? { q } : {}, { replace: true })}
            >
              All Solutions
            </button>

            <button
              className={chip(freeOnly)}
              onClick={() => {
                const next = new URLSearchParams(params);
                if (freeOnly) next.delete('free');
                else next.set('free', '1');
                setParams(next, { replace: true });
              }}
            >
              Free Resources
            </button>

            {CATEGORIES.map(([k, label]) => (
              <button
                key={k}
                className={chip(category === k)}
                onClick={() => set('category', category === k ? '' : k)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeFilters && (
            <div className="mt-4 pt-4 border-t border-navy-800/10 flex items-center justify-between">
              <span className="text-sm text-navy-800/60">
                Filters are active
              </span>
              <button
                onClick={clearFilters}
                className="text-sm font-bold text-navy-800 hover:underline flex items-center gap-2"
              >
                <FiX /> Clear filters
              </button>
            </div>
          )}
        </div>

        {/* PRODUCT GRID */}
        <div className="mt-10">

          {shown === null ? (
            <div className="py-24 flex justify-center">
              <Spinner />
            </div>
          ) : shown.length === 0 ? (
            <div className="bg-white rounded-3xl border border-navy-800/10 text-center py-20 px-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-soft flex items-center justify-center text-navy-800 text-2xl">
                <FiSearch />
              </div>

              <h3 className="mt-6 text-xl font-extrabold text-navy-900">
                No solutions found
              </h3>

              <p className="mt-2 text-navy-800/60 max-w-md mx-auto">
                We couldn't find anything matching your search.
                Try a different keyword or explore all available solutions.
              </p>

              <button
                onClick={() => {
                  setQ('');
                  setParams({}, { replace: true });
                }}
                className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 text-white font-bold hover:bg-navy-900 transition"
              >
                Explore all solutions <FiArrowRight />
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {shown.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 rounded-3xl bg-sky-soft/60 border border-navy-800/10 p-8 md:p-12 text-center">
          <p className="text-sm uppercase tracking-widest font-bold text-navy-800/50">
            Keep moving forward
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-navy-900">
            Your next step starts with the right direction.
          </h2>

          <p className="mt-2 max-w-xl mx-auto text-navy-800/65">
            Explore practical resources designed to help you
            learn, prepare and build your future.
          </p>

          <button
            onClick={() => {
              setQ('');
              setParams({}, { replace: true });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy-800 text-white font-bold hover:bg-navy-900 transition"
          >
            Explore solutions <FiArrowRight />
          </button>
        </div>

      </section>
    </div>
  );
}
