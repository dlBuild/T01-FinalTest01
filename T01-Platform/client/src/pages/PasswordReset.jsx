
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../utils/format';

function AuthLayout({ children, title, subtitle, icon }) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#faf8f3] px-4 py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#e9e5dc] bg-white shadow-[0_20px_70px_rgba(20,35,55,0.08)] md:grid-cols-2">

        {/* Information panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#14283f] p-10 text-white md:flex lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#294b68] opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#2e8b83] opacity-20 blur-3xl" />

          <div className="relative">
            <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <FiShield size={23} />
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#a9d8d0]">
              Storiisto Account Security
            </p>

            <h2 className="max-w-sm text-3xl font-extrabold leading-tight lg:text-4xl">
              Your learning journey deserves a secure space.
            </h2>

            <p className="mt-5 max-w-sm leading-7 text-white/65">
              Access your free and purchased solutions through your personal
              account. Keep your learning resources organized in one place.
            </p>
          </div>

          <div className="relative space-y-4">
            {[
              'Secure access to your account',
              'Your solutions in one place',
              'Learn at your own pace',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                <FiCheckCircle className="shrink-0 text-[#a9d8d0]" />
                {item}
              </div>
            ))}
            <p className="pt-5 text-xs text-white/40">
              Storiisto · Your Future Deserves More Than Guesswork.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf3f4] text-[#246d70]">
            {icon}
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#37817d]">
            Account Assistance
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 leading-7 text-sm text-navy-900"> 
            {/* text-[#6b7280] */}
            {subtitle}
          </p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#24364b]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#82909d]">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-[#e1e5e8] bg-[#fbfcfd] py-3.5 pl-11 pr-4 text-sm text-[#14283f] outline-none transition placeholder:text-[#a0aab3] focus:border-[#37817d] focus:bg-white focus:ring-4 focus:ring-[#37817d]/10';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);

    try {
      await authAPI.forgot(email);
      setSent(true);
    } catch (err) {
      toast.error(errMsg(err, 'Could not send reset request'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title={sent ? 'Check your inbox' : 'Forgot your password?'}
      subtitle={
        sent
          ? 'If an account exists with this email, you should receive instructions to reset your password.'
          : 'It happens. Enter the email address linked to your Storiisto account and we will help you get back in.'
      }
      icon={<FiMail size={22} />}
    >
      {sent ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#cfe8df] bg-[#f0faf5] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#d9f1e6] text-[#26815e]">
              <FiCheckCircle size={21} />
            </div>
            <h3 className="font-bold text-[#174c39]">
              Reset request submitted
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#527363]">
              Check your inbox and spam folder. If you do not receive an email,
              verify the address or try again later. <br />
              <span className="font-bold"> <Link to="/contact" className="text-[#37817d] hover:text-[#245e60]">Contact us</Link> if you need help.</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSent(false)}
            className="w-full rounded-xl border border-[#dfe5e8] py-3.5 text-sm font-bold text-[#24364b] transition hover:bg-[#f7f9fa]"
          >
            Try another email
          </button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm font-bold text-[#37817d] hover:text-[#245e60]"
          >
            <FiArrowLeft /> Back to login
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <Field label="Email address" icon={<FiMail size={17} />}>
            <input
              className={inputClass}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14283f] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14283f]/10 transition hover:bg-[#203c58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? 'Sending request...' : 'Send reset instructions'}
            {!busy && <FiArrowRight />}
          </button>

          <div className="rounded-xl bg-[#f5f7f8] p-4 text-xs leading-6 text-[#71808d]">
            <FiShield className="mb-1 inline" /> Your account security matters.
            We will not reveal whether an email address is registered.
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm font-bold text-[#37817d] hover:text-[#245e60]"
          >
            <FiArrowLeft /> Back to login
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}

export function ResetPassword() {
  const { token } = useParams();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setBusy(true);

    try {
      const { data } = await authAPI.reset(token, password);
      setUser(data.user);
      toast.success('Password updated successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(errMsg(err, 'Could not update password'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Choose a strong password that you do not use on other websites."
      icon={<FiLock size={22} />}
    >
      <form onSubmit={submit} className="space-y-5">
        <Field label="New password" icon={<FiLock size={17} />}>
          <input
            className={inputClass}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <Field label="Confirm new password" icon={<FiLock size={17} />}>
          <input
            className={inputClass}
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter new password"
            autoComplete="new-password"
            minLength={8}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field>

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center gap-2 text-xs font-bold text-[#37817d] hover:text-[#245e60]"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
          {showPassword ? 'Hide passwords' : 'Show passwords'}
        </button>

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14283f] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14283f]/10 transition hover:bg-[#203c58] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? 'Updating password...' : 'Update password'}
          {!busy && <FiArrowRight />}
        </button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm font-bold text-[#37817d] hover:text-[#245e60]"
        >
          <FiArrowLeft /> Back to login
        </Link>
      </form>
    </AuthLayout>
  );
}
