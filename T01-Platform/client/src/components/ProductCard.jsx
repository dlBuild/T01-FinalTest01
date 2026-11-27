
import { Link } from 'react-router-dom';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle
} from 'react-icons/fi';
import { inr, categoryLabel } from '../utils/format';

export default function ProductCard({ product: p }) {
  const isFree = p.price === 0;
  const hasDiscount = p.compareAtPrice > p.price;

  return (
    <Link
      to={`/options/${p.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-navy-800/10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-navy-800/20"
    >
      {/* THUMBNAIL */}
      <div className="relative h-52 sm:h-56 bg-sky-soft overflow-hidden">

        {p.thumbnail ? (
          <img
            src={p.thumbnail}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-soft to-cream-soft">
            <span className="text-4xl font-extrabold tracking-tight text-navy-800/20">
              storiisto<span className="text-amber">.</span>
            </span>
          </div>
        )}

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent opacity-60" />

        {/* CATEGORY */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-navy-900 text-xs font-bold shadow-sm">
            {categoryLabel(p.category)}
          </span>
        </div>

        {/* FREE / PAID BADGE */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold shadow-sm ${
            isFree
              ? 'bg-mint text-green-800'
              : 'bg-navy-900/90 text-white'
          }`}>
            {isFree ? 'FREE' : 'PREMIUM'}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 md:p-6 flex flex-col flex-1">

        {/* PRODUCT TITLE */}
        <h3 className="text-lg md:text-xl font-extrabold leading-snug text-navy-900 group-hover:text-navy-800 transition-colors line-clamp-2 min-h-[3.5rem]">
          {p.title}
        </h3>

        {/* TAGLINE */}
        <p className="mt-2 text-sm text-navy-800/65 leading-relaxed line-clamp-2 min-h-[2.75rem]">
          {p.tagline || 'Explore this practical resource and take your next step forward.'}
        </p>

        {/* PRICE SECTION */}
        <div className="mt-5 pt-4 border-t border-navy-800/10 flex items-end justify-between gap-3">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-800/45 mb-1">
              {isFree ? 'Access' : 'Price'}
            </p>

            <div className="flex items-center flex-wrap gap-2">
              <span className={`text-xl font-extrabold ${
                isFree ? 'text-green-700' : 'text-navy-900'
              }`}>
                {inr(p.price)}
              </span>

              {hasDiscount && (
                <span className="text-sm line-through text-navy-800/40">
                  {inr(p.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="w-10 h-10 shrink-0 rounded-full bg-sky-soft flex items-center justify-center text-navy-900 group-hover:bg-navy-800 group-hover:text-white transition-all duration-300">
            <FiArrowUpRight className="text-lg" />
          </div>
        </div>

        {/* EXPLORE LINK */}
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-navy-800">
          <FiBookOpen />
          <span>Explore solution</span>
          <span className="ml-auto text-xs text-navy-800/40 group-hover:text-navy-800 transition">
            View details
          </span>
        </div>

      </div>
    </Link>
  );
}
