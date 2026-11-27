
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FiBookOpen,
  FiShoppingBag,
  FiArrowUpRight,
  FiArrowRight,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiPlay,
  FiPackage,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';

import { libraryAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { date, inr, errMsg, categoryLabel } from '../utils/format';

const STATUS = {
  PAID: 'bg-green-100 text-green-800',
  PENDING: 'bg-amber/30 text-navy-800',
  FAILED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-200 text-gray-700'
};

export default function Dashboard() {
  const { user } = useAuth();

  const [items, setItems] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tab, setTab] = useState('library');

  useEffect(() => {
    libraryAPI.list()
      .then((r) => setItems(r.data.items))
      .catch(() => setItems([]));

    orderAPI.mine()
      .then((r) => setOrders(r.data.orders))
      .catch(() => {})
      .finally(() => setOrdersLoading(false));
  }, []);

  const open = async (productId) => {
    try {
      const { data } = await libraryAPI.open(productId);

      if (data.type === 'link') {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error(errMsg(err, 'Could not open this product'));
    }
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'PAID').length;

  const totalProgress = items?.length
    ? Math.round(
        items.reduce((sum, item) => sum + (item.progress ?? 0), 0) /
        items.length
      )
    : 0;

  const tabBtn = (key, label, icon) => (
    <button
      onClick={() => setTab(key)}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
        tab === key
          ? 'bg-navy-800 text-white shadow-md'
          : 'bg-white text-navy-800/65 hover:bg-sky-soft'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-cream-soft">
      <div className="container-storiisto py-8 md:py-12">

        {/* WELCOME BANNER */}
        <section className="relative overflow-hidden rounded-2xl bg-navy-900 text-white p-7 md:p-11">
          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">
            <div>
              <span className="inline-flex items-center gap-2 text-red-300 text-sm font-bold uppercase tracking-widest">
                {/* <FiCheckCircle /> */}
                Storiisto - Your Solutions
              </span>

              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}
              </h1>

              <p className="mt-3 text-white/65 max-w-lg leading-relaxed">
                Your journey deserves consistent progress.
                Pick up where you left off and keep moving towards your goals.
              </p>
            </div>

            <Link
              to="/options"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-navy-900 font-bold hover:bg-sky-soft transition shrink-0"
            >
              Explore solutions <FiArrowUpRight />
            </Link>
          </div>
        </section>

        {/* STATISTICS */}

<section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">

  {/* UNLOCKED SOLUTIONS */}
  <div className="bg-white border border-navy-800/10 rounded-2xl p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-sky-soft flex items-center justify-center text-navy-800 text-xl shrink-0">
      <span className="text-lg font-extrabold">
        {items === null ? '—' : items.length}
      </span>
    </div>
    <p className="text-md text-navy-800/80 font-medium">
      Unlocked solutions
    </p>
  </div>

  {/* COMPLETED PAYMENTS */}
  <div className="bg-white border border-navy-800/10 rounded-2xl p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-green-800 text-xl shrink-0">
      <span className="text-lg font-extrabold">
        {ordersLoading ? '—' : completedOrders}
      </span>
    </div>
    <p className="text-md text-navy-800/80 font-medium">
      Completed payments
    </p>
  </div>

  {/* TOTAL ORDERS */}
  <div className="bg-white border border-navy-800/10 rounded-2xl p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-amber/20 flex items-center justify-center text-navy-800 shrink-0">
      <span className="text-lg font-extrabold">
        {ordersLoading ? '—' : totalOrders}
      </span>
    </div>
    <p className="text-md text-navy-800/80 font-medium">
      Total orders
    </p>
  </div>

</section>


        {/* MAIN CONTENT */}
        <section className="mt-12">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              {/* <p className="text-xs font-bold uppercase tracking-widest text-navy-800/45">
                Your personal space
              </p> */}
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mt-2">
                Your Personal Space
              </h2>
              <p className="text-sm text-navy-800/60 mt-2">
                Access your solutions and keep track of your purchases.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tabBtn('library', 'My Solutions', <FiBookOpen />)}
              {tabBtn('orders', 'Order History', <FiShoppingBag />)}
            </div>
          </div>

          {/* LIBRARY TAB */}
          {tab === 'library' && (
            <div className="mt-7">

              {items === null ? (
                <div className="py-20 flex justify-center">
                  <Spinner />
                </div>
              ) : items.length === 0 ? (

                <div className="bg-white rounded-3xl border border-navy-800/10 p-10 md:p-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-sky-soft flex items-center justify-center mx-auto text-2xl text-navy-800">
                    <FiBookOpen />
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-navy-900">
                    Your library is waiting for you.
                  </h3>

                  <p className="mt-2 text-sm text-navy-800/60 max-w-md mx-auto leading-relaxed">
                    Once you unlock a solution, it will appear here.
                    Explore practical resources designed to help you grow.
                  </p>

                  <Link
                    to="/options"
                    className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 text-white font-bold hover:bg-navy-900 transition"
                  >
                    Explore solutions <FiArrowRight />
                  </Link>
                </div>

              ) : (

                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-navy-800/60">
                      You have <strong>{items.length}</strong> unlocked solutions.
                    </p>
                    <span className="text-xs text-navy-800/40">
                      Your personal library
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {items.map(({ id, product, grantedAt, progress }) => (
                      <div
                        key={id}
                        className="bg-white border border-navy-800/10 rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-lift transition-all duration-300"
                      >

                        {/* PRODUCT IMAGE */}
                        <div className="h-44 bg-sky-soft relative overflow-hidden">
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-4xl font-extrabold text-navy-800/20">
                              Storiisto<span className="text-amber">.</span>
                            </div>
                          )}

                          <span className="absolute top-4 left-4 bg-white/95 rounded-full px-3 py-1.5 text-xs font-bold text-navy-900">
                            {categoryLabel(product.category)}
                          </span>
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="p-5 flex flex-col flex-1">

                          <h3 className="text-lg font-extrabold text-navy-900 line-clamp-2">
                            {product.title}
                          </h3>

                          <p className="flex items-center gap-2 mt-2 text-xs text-navy-800/50">
                            <FiClock />
                            Unlocked on {date(grantedAt)}
                          </p>

                          {/* PROGRESS */}
                          {progress !== null && (
                            <div className="mt-5">
                              <div className="flex justify-between items-center text-xs font-bold text-navy-800/60 mb-2">
                                <span>Reading progress</span>
                                <span>{progress}%</span>
                              </div>

                              <div
                                className="h-2 rounded-full bg-cream overflow-hidden"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className="h-full bg-green-600 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* ACTION */}
                          <div className="mt-auto pt-5">
                            {product.deliveryType === 'ebook' ? (
                              <Link
                                to={`/learn/${product.slug}`}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy-800 text-white py-3 px-4 font-bold hover:bg-navy-900 transition"
                              >
                                {/* {progress > 0 ? <FiPlay /> : <FiBookOpen />} */}
                                {progress > 0 ? 'Continue reading' : 'Start reading'}
                                <FiArrowUpRight className="ml-auto" />
                              </Link>
                            ) : (
                              <button
                                onClick={() => open(product._id)}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy-800 text-white py-3 px-4 font-bold hover:bg-navy-900 transition"
                              >
                                {/* {product.deliveryType === 'file' ? <FiDownload /> : <FiExternalLink />} */}
                                {product.deliveryType === 'file' ? 'Download resource' : 'Open solution'}
                                <FiArrowUpRight className="ml-auto" />
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    ))}

                  </div>
                </>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {tab === 'orders' && (
            <div className="mt-7">

              <div className="bg-white rounded-2xl border border-navy-800/10 overflow-hidden">

                <div className="p-5 md:p-6 border-b border-navy-800/10">
                  <h3 className="font-extrabold text-lg text-navy-900">
                    Your transactions
                  </h3>
                  <p className="text-sm text-navy-800/55 mt-1">
                    View your purchase and payment history.
                  </p>
                </div>

                {ordersLoading ? (
                  <div className="py-16 flex justify-center">
                    <Spinner />
                  </div>
                ) : orders.length === 0 ? (

                  <div className="py-16 text-center px-6">
                    <FiPackage className="mx-auto text-3xl text-navy-800/30" />
                    <p className="mt-4 font-bold text-navy-900">
                      No orders yet.
                    </p>
                    <p className="text-sm text-navy-800/55 mt-2">
                      Your purchases will appear here.
                    </p>
                    <Link
                      to="/options"
                      className="inline-flex mt-5 items-center gap-2 font-bold text-navy-800 hover:underline"
                    >
                      Browse solutions <FiArrowRight />
                    </Link>
                  </div>

                ) : (

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-cream-soft text-navy-800/55">
                        <tr>
                          <th className="px-5 py-4 font-bold">Product</th>
                          <th className="px-5 py-4 font-bold">Amount</th>
                          <th className="px-5 py-4 font-bold">Status</th>
                          <th className="px-5 py-4 font-bold">Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.map((o) => (
                          <tr
                            key={o.orderId}
                            className="border-t border-navy-800/5 hover:bg-sky-soft/30 transition"
                          >
                            <td className="px-5 py-4 font-semibold text-navy-900 min-w-[180px]">
                              {o.productTitle}
                            </td>

                            <td className="px-5 py-4 font-bold text-navy-900 whitespace-nowrap">
                              {inr(o.amount)}
                            </td>

                            <td className="px-5 py-4">
                              <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${STATUS[o.status] || 'bg-gray-100 text-gray-700'}`}>
                                {o.status}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-navy-800/60 whitespace-nowrap">
                              {date(o.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </section>

        {/* BOTTOM CTA */}
        <section className="mt-16 bg-sky-soft/60 border border-navy-800/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-navy-900">
              Ready for your next step?
            </h3>
            <p className="mt-2 text-sm text-navy-800/60 max-w-xl">
              Discover more practical resources and find solutions
              that support your learning and career goals.
            </p>
          </div>

          <Link
            to="/options"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-800 text-white font-bold hover:bg-navy-900 transition shrink-0"
          >
            Explore more <FiArrowUpRight />
          </Link>
        </section>

      </div>
    </div>
  );
}




//Old code is here. 
//OLDER

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { libraryAPI, orderAPI } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import Spinner from '../components/Spinner';
// import { date, inr, errMsg, categoryLabel } from '../utils/format';

// const STATUS = { PAID: 'bg-green-100 text-green-800', PENDING: 'bg-amber/30 text-navy-800', FAILED: 'bg-red-100 text-red-800', CANCELLED: 'bg-gray-200 text-gray-700' };

// /** User Dashboard -> Use Purchased Product */
// export default function Dashboard() {
//   const { user } = useAuth();
//   const [items, setItems] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [tab, setTab] = useState('library');

//   useEffect(() => {
//     libraryAPI.list().then((r) => setItems(r.data.items)).catch(() => setItems([]));
//     orderAPI.mine().then((r) => setOrders(r.data.orders)).catch(() => {});
//   }, []);

//   const open = async (productId) => {
//     try {
//       const { data } = await libraryAPI.open(productId);
//       if (data.type === 'link') window.open(data.url, '_blank', 'noopener,noreferrer');
//       else window.location.href = data.url; // authenticated file download
//     } catch (err) { toast.error(errMsg(err, 'Could not open this product')); }
//   };

//   const tabBtn = (k, label) => (
//     <button onClick={() => setTab(k)} className={`px-5 py-2 rounded-full text-sm font-bold ${tab === k ? 'bg-navy-800 text-white' : 'bg-white'}`}>{label}</button>
//   );

//   return (
//     <div className="container-storiisto py-12">
//       <h1 className="text-3xl font-extrabold">Hi, {user.name.split(' ')[0]} 👋</h1>
//       <p className="text-navy-800/70 mt-1">Your unlocked e-books, progress and orders.</p>
//       <div className="flex gap-2 mt-6">{tabBtn('library', 'My Solutions')}{tabBtn('orders', 'Orders')}</div>

//       {tab === 'library' && (items === null ? <Spinner /> : items.length === 0 ? (
//         <div className="card p-10 text-center mt-6">
//           <p className="mb-4">After Successful Payment you'll be unlocked Your Solutions.</p>
//           <Link to="/options" className="btn-primary">View Solution Options</Link>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {items.map(({ id, product, grantedAt, progress }) => (
//             <div key={id} className="card p-5 flex flex-col">
//               <span className="badge bg-mint self-start">{categoryLabel(product.category)}</span>
//               <h3 className="font-extrabold text-lg mt-3">{product.title}</h3>
//               <p className="text-sm text-navy-800/60 mt-1 flex-1">Unlocked on {date(grantedAt)}</p>
//               {progress !== null && (
//                 <div className="mt-3">
//                   <div className="flex justify-between text-xs font-bold text-navy-800/60 mb-1"><span>Progress</span><span>{progress}%</span></div>
//                   <div className="h-2 rounded-full bg-cream overflow-hidden"><div className="h-full bg-green-600" style={{ width: `${progress}%` }} /></div>
//                 </div>
//               )}
//               {product.deliveryType === 'ebook'
//                 ? <Link to={`/learn/${product.slug}`} className="btn-primary mt-4">{progress ? 'Continue reading' : 'Start reading'}</Link>
//                 : <button className="btn-primary mt-4" onClick={() => open(product._id)}>{product.deliveryType === 'file' ? 'Download' : 'Open'}</button>}
//             </div>
//           ))}
//         </div>
//       ))}

//       {tab === 'orders' && (
//         <div className="card mt-6 overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead><tr className="text-left text-navy-800/60 border-b border-navy-800/10"><th className="p-4">Product</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Date</th></tr></thead>
//             <tbody>
//               {orders.length === 0 && <tr><td colSpan="4" className="p-6 text-center text-navy-800/50">No orders yet.</td></tr>}
//               {orders.map((o) => (
//                 <tr key={o.orderId} className="border-b border-navy-800/5">
//                   <td className="p-4 font-semibold">{o.productTitle}</td><td className="p-4">{inr(o.amount)}</td>
//                   <td className="p-4"><span className={`badge ${STATUS[o.status]}`}>{o.status}</span></td><td className="p-4">{date(o.createdAt)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
