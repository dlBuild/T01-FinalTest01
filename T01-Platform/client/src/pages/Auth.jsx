
import { useState } from 'react';
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  FiBookOpen,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiPhone,
  FiArrowRight,
  FiShield,
  FiGift,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';
import { errMsg } from '../utils/format';
import { authUrl, defaultLanding, safeNext } from '../utils/nav';

/* ---------- Authentication Screen ---------- */

function AuthScreen({ mode }) {
  const { user, login, register } = useAuth();

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const next = safeNext(params.get('next'));
  const isRegister = mode === 'register';

  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect already authenticated users
  if (user) {
    return (
      <Navigate
        to={next || defaultLanding(user)}
        replace
      />
    );
  }

  const bind = (k) => ({
    value: f[k],
    onChange: (e) =>
      setF((prev) => ({
        ...prev,
        [k]: e.target.value,
      })),
  });

  const submit = async (e) => {
    e.preventDefault();

    setBusy(true);

    try {
      const u = isRegister
        ? await register(f)
        : await login(f.email, f.password);

      navigate(next || defaultLanding(u), {
        replace: true,
      });
    } catch (err) {
      toast.error(
        errMsg(
          err,
          isRegister
            ? 'Could not create account'
            : 'Login failed'
        )
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-[#FAF7F0] py-10 md:py-16 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT SIDE - INFORMATION */}

          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-bold text-navy-800 mb-6">
              {/* <FiBookOpen /> */}
              Your learning journey starts here
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 leading-tight">
              The right guidance can make your next step
              <span className="text-sky-brand"> easier.</span>
            </h1>

            <p className="text-navy-800/70 text-base md:text-lg leading-relaxed mt-5">
              Access practical solutions, learning resources
              and guidance designed to help you make better
              decisions about your education, career and future.
            </p>

            {/* Why login is required */}

            <div className="mt-9">

              <h2 className="text-lg font-extrabold text-navy-900 mb-4">
                Why do you need an account?
              </h2>

              <div className="space-y-5">

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-sky-soft text-sky-brand flex items-center justify-center">
                    <FiLock size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-navy-900">
                      Your personal access
                    </h3>
                    <p className="text-sm text-navy-800/65 mt-1 leading-relaxed">
                      Login helps us connect your purchased
                      and unlocked solutions to your account,
                      so you can access them whenever you return.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <FiGift size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-navy-900">
                      Access free solutions too
                    </h3>
                    <p className="text-sm text-navy-800/65 mt-1 leading-relaxed">
                      Not everything requires payment.
                      Some solutions are completely free.
                      Simply create an account or log in to
                      unlock the free resources available to you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-amber/20 text-amber-dark flex items-center justify-center">
                    <FiShield size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-navy-900">
                      Keep your progress together
                    </h3>
                    <p className="text-sm text-navy-800/65 mt-1 leading-relaxed">
                      Your account helps you find your
                      accessible resources, learning progress
                      and order history in one place.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Small reassurance */}

            <div className="mt-9 flex items-center gap-3 border-t border-navy-800/10 pt-6">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-sky-soft border-2 border-[#FAF7F0] flex items-center justify-center text-navy-800">
                  <FiBookOpen size={15} />
                </div>
                <div className="w-9 h-9 rounded-full bg-green-100 border-2 border-[#FAF7F0] flex items-center justify-center text-green-700">
                  <FiCheckCircle size={15} />
                </div>
                <div className="w-9 h-9 rounded-full bg-amber/30 border-2 border-[#FAF7F0] flex items-center justify-center text-amber-dark">
                  <FiGift size={15} />
                </div>
              </div>

              <p className="text-xs text-navy-800/60 leading-relaxed">
                Create your free account and explore
                the resources available on storiisto.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE - AUTH FORM */}

          <div className="w-full max-w-md mx-auto lg:ml-auto">

            <div className="bg-white rounded-3xl shadow-xl shadow-navy-900/5 border border-navy-800/5 p-6 sm:p-9">

              {/* Form heading */}

              <div className="mb-7">

                {/* <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center mb-5">
                  <FiBookOpen size={23} />
                </div> */}

                <h2 className="text-2xl md:text-3xl font-extrabold text-green-900">
                  {isRegister
                    ? 'Create your account'
                    : 'Welcome back'}
                </h2>

                <p className="text-sm text-navy-800/60 mt-2 leading-relaxed">
                  {isRegister
                    ? 'Join storiisto for free and start exploring practical resources.'
                    : next
                      ? 'Log in to continue to the solution you selected.'
                      : 'Log in to access your learning resources and solutions.'}
                </p>

              </div>

              {/* Login / Register tabs */}

              <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-xl bg-[#F4F1EA] mb-7">

                <Link
                  to={authUrl('login', next)}
                  replace
                  className={`text-center py-3 rounded-lg text-sm font-bold transition ${
                    !isRegister
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-navy-800/60 hover:text-navy-900'
                  }`}
                >
                  Login
                </Link>

                <Link
                  to={authUrl('register', next)}
                  replace
                  className={`text-center py-3 rounded-lg text-sm font-bold transition ${
                    isRegister
                      ? 'bg-white text-navy-900 shadow-sm'
                      : 'text-navy-800/60 hover:text-navy-900 shadow-lg'
                  }`}
                >
                  Create free account
                </Link>

              </div>

              {/* Form */}

              <form onSubmit={submit} className="space-y-5">

                {/* Name */}

                {isRegister && (
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">
                      Full name
                    </label>

                    <div className="relative">
                      <FiUser
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40"
                        size={18}
                      />

                      <input
                        className="w-full rounded-xl border border-navy-800/15 bg-white pl-11 pr-4 py-3.5 text-sm text-navy-900 outline-none transition focus:border-sky-brand focus:ring-4 focus:ring-sky-brand/10"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Enter your full name"
                        {...bind('name')}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}

                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-2">
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40"
                      size={18}
                    />

                    <input
                      className="w-full rounded-xl border border-navy-800/15 bg-white pl-11 pr-4 py-3.5 text-sm text-navy-900 outline-none transition focus:border-sky-brand focus:ring-4 focus:ring-sky-brand/10"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...bind('email')}
                    />
                  </div>
                </div>

                {/* Phone */}

                {isRegister && (
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">
                      Mobile number
                    </label>

                    <div className="relative">
                      <FiPhone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40"
                        size={18}
                      />

                      <input
                        className="w-full rounded-xl border border-navy-800/15 bg-white pl-11 pr-4 py-3.5 text-sm text-navy-900 outline-none transition focus:border-sky-brand focus:ring-4 focus:ring-sky-brand/10"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        title="10-digit Indian mobile number"
                        required
                        autoComplete="tel-national"
                        placeholder="10-digit mobile number"
                        {...bind('phone')}
                      />
                    </div>

                    <p className="text-xs text-navy-800/50 mt-2">
                      Required for payment-related services and account records.
                    </p>
                  </div>
                )}

                {/* Password */}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-navy-900">
                      Password
                    </label>

                    {!isRegister && (
                      <Link
                        to="/forgot-password"
                        className="text-xs font-bold text-sky-brand hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>

                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40"
                      size={18}
                    />

                    <input
                      className="w-full rounded-xl border border-navy-800/15 bg-white pl-11 pr-12 py-3.5 text-sm text-navy-900 outline-none transition focus:border-sky-brand focus:ring-4 focus:ring-sky-brand/10"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={isRegister ? 8 : undefined}
                      autoComplete={
                        isRegister
                          ? 'new-password'
                          : 'current-password'
                      }
                      placeholder={
                        isRegister
                          ? 'At least 8 characters'
                          : 'Enter your password'
                      }
                      {...bind('password')}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-800/45 hover:text-navy-900"
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showPassword
                        ? <FiEyeOff size={18} />
                        : <FiEye size={18} />}
                    </button>
                  </div>

                  {isRegister && (
                    <p className="text-xs text-navy-800/50 mt-2">
                      Use at least 8 characters.
                    </p>
                  )}
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy-900 text-white font-bold py-3.5 px-5 transition hover:bg-navy-800 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-navy-900/10"
                >
                  {busy ? (
                    'Please wait...'
                  ) : (
                    <>
                      {isRegister
                        ? 'Create free account'
                        : 'Login to your account'}

                      <FiArrowRight size={18} />
                    </>
                  )}
                </button>

              </form>

              {/* Bottom message */}

              <div className="mt-6 pt-5 border-t border-navy-800/10">

                {isRegister ? (
                  <p className="text-center text-sm text-navy-800/60">
                    Already have an account?{' '}
                    <Link
                      to={authUrl('login', next)}
                      replace
                      className="font-bold text-sky-brand hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                ) : (
                  <p className="text-center text-sm text-navy-800/60">
                    New to storiisto?{' '}
                    <Link
                      to={authUrl('register', next)}
                      replace
                      className="font-bold text-sky-brand hover:underline"
                    >
                      Create a free account
                    </Link>
                  </p>
                )}

              </div>

            </div>

            {/* Security note */}

            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-navy-800/50">
              <FiShield size={14} />
              Your account helps keep your resources and access organised.
            </div>

          </div>

        </div>

        {/* Footer note */}

        <p className="text-center text-xs text-navy-800/45 mt-12">
          storiisto · Learn better. Choose wisely. Build your future.
        </p>

      </div>
    </div>
  );
}

/* ---------- Export ---------- */

export const Login = () => <AuthScreen mode="login" />;
export const Register = () => <AuthScreen mode="register" />;
