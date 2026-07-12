import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useLanguage } from '../../context/LanguageContext';

export default function ManageFeedbackPage() {
  const { language, t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterStore, setFilterStore] = useState('');
  const [filterVerified, setFilterVerified] = useState('');
  const [filterDateRange, setFilterDateRange] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (e) {
      console.error('Error fetching reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm(language === 'am' ? 'እርግጠኛ ነዎት ይህንን አስተያየት መሰረዝ ይፈልጋሉ?' : 'Are you sure you want to delete this review?')) return;
    try {
      // Opt-in to in-memory filter first for instant UI response
      setReviews(reviews.filter(r => r._id !== id));
      
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert(language === 'am' ? 'አስተያየቱ በተሳካ ሁኔታ ተሰርዟል!' : 'Review deleted successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Derive unique store names for the filter dropdown
  const uniqueStores = [...new Set(reviews.map(r => r.storeName).filter(Boolean))];

  // Filter logic
  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.productName.toLowerCase().includes(search.toLowerCase()) ||
                          (r.storeName && r.storeName.toLowerCase().includes(search.toLowerCase())) ||
                          (r.review && r.review.toLowerCase().includes(search.toLowerCase()));
    const matchesRating = filterRating === '' || r.rating.toString() === filterRating;
    const matchesCountry = filterCountry === '' || r.country === filterCountry;
    const matchesStore = filterStore === '' || r.storeName === filterStore;
    const matchesVerified = filterVerified === '' || r.verified.toString() === filterVerified;

    // Date range filter
    let matchesDate = true;
    if (filterDateRange !== '') {
      const now = new Date();
      const reviewDate = new Date(r.createdAt);
      if (filterDateRange === '7') matchesDate = (now - reviewDate) <= 7 * 24 * 60 * 60 * 1000;
      else if (filterDateRange === '30') matchesDate = (now - reviewDate) <= 30 * 24 * 60 * 60 * 1000;
      else if (filterDateRange === '90') matchesDate = (now - reviewDate) <= 90 * 24 * 60 * 60 * 1000;
      else if (filterDateRange === '365') matchesDate = (now - reviewDate) <= 365 * 24 * 60 * 60 * 1000;
    }

    return matchesSearch && matchesRating && matchesCountry && matchesStore && matchesVerified && matchesDate;
  });

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : '0.0';

  const ethioReviewsCount = reviews.filter(r => r.country === 'Ethiopia').length;

  return (
    <>
      <div className="light" lang={language}>
        <div className="bg-background text-on-background min-h-screen">
          <AdminSidebar />
          
          <header className="docked full-width top-0 sticky z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-margin-desktop py-sm ml-64 max-w-[calc(100%-16rem)] h-16">
            <div className="flex items-center gap-lg w-1/2">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-md focus:ring-2 focus:ring-primary/20" 
                  placeholder={language === 'am' ? 'አስተያየቶችን ፈልግ...' : 'Search reviews or products...'} 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-md">
              <button className="hover:bg-surface-container-low dark:hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-90 relative">
                <span className="material-symbols-outlined text-primary">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
              <img alt="Admin Avatar" className="w-8 h-8 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQzDbU4ctXORbrbmHa03GoeGpv4OZ22JTrGKeWujucM6FygRX5dCwzsQKVyh4EgA3vga9yAZwKFR8OOUNP0F2aYijuyl466nauwe3r6zf-KAv_pPqiZVXtuHUN5c3__Ko94EF9Fo0uYBkzUWMXBzixdi8lTqpYUm1DHjurpRxTPTcSsCkWF7VIPEpBfuC7EimvHIDQee5Bi8qvETw3qpzEN_vVVY_TcVDksAxy-gua4AYQoxM_9sKmDlb3sz_Wni6laIFXtSjmJ9U2" />
            </div>
          </header>

          <main className="ml-64 p-margin-desktop min-h-[calc(100vh-64px)]">
            <div className="max-w-[1440px] mx-auto space-y-xl">
              
              {/* Page Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="font-h1 text-h1 text-on-background mb-xs">
                    {language === 'am' ? 'የደንበኞች አስተያየት' : 'Customer Feedback'}
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {language === 'am' 
                      ? 'የደንበኞችን ደረጃ አሰጣጥ እና አስተያየት ይቆጣጠሩ፣ ያረጋግጡ እና ያስተዳድሩ።' 
                      : 'Monitor, verify, and manage all customer ratings and reviews across the ecosystem.'}
                  </p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[28px]">rate_review</span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">{language === 'am' ? 'ጠቅላላ አስተያየት' : 'Total Reviews'}</p>
                    <h3 className="text-h3 font-h3 text-on-surface">{reviews.length}</h3>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[28px]">star</span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">{language === 'am' ? 'አማካይ ደረጃ' : 'Average Rating'}</p>
                    <h3 className="text-h3 font-h3 text-on-surface">{avgRating} / 5.0</h3>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[28px]">verified</span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">{language === 'am' ? 'የተረጋገጡ' : 'Verified Reviews'}</p>
                    <h3 className="text-h3 font-h3 text-on-surface">{reviews.filter(r => r.verified).length}</h3>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center gap-lg">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[28px]">flag</span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">{language === 'am' ? 'ኢትዮጵያ ውስጥ' : 'From Ethiopia'}</p>
                    <h3 className="text-h3 font-h3 text-on-surface">{ethioReviewsCount}</h3>
                  </div>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col md:flex-row gap-md items-center shadow-sm flex-wrap">
                <div className="flex gap-md w-full md:w-auto flex-wrap">
                  <select 
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[140px] focus:ring-2 focus:ring-primary/20"
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                  >
                    <option value="">{language === 'am' ? 'ደረጃ: ሁሉም' : 'Rating: All'}</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <select 
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[160px] focus:ring-2 focus:ring-primary/20"
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                  >
                    <option value="">{language === 'am' ? 'ሀገር: ሁሉም' : 'Country: All'}</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Germany">Germany</option>
                  </select>
                  <select 
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[160px] focus:ring-2 focus:ring-primary/20"
                    value={filterStore}
                    onChange={(e) => setFilterStore(e.target.value)}
                  >
                    <option value="">{language === 'am' ? 'ሱቅ: ሁሉም' : 'Store: All'}</option>
                    {uniqueStores.map(store => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                  <select 
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[160px] focus:ring-2 focus:ring-primary/20"
                    value={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.value)}
                  >
                    <option value="">{language === 'am' ? 'ሁኔታ: ሁሉም' : 'Status: All'}</option>
                    <option value="true">{language === 'am' ? 'የተረጋገጠ' : 'Verified'}</option>
                    <option value="false">{language === 'am' ? 'ያልተረጋገጠ' : 'Unverified'}</option>
                  </select>
                  <select 
                    className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-body-md min-w-[160px] focus:ring-2 focus:ring-primary/20"
                    value={filterDateRange}
                    onChange={(e) => setFilterDateRange(e.target.value)}
                  >
                    <option value="">{language === 'am' ? 'ቀን: ሁሉም' : 'Date: All Time'}</option>
                    <option value="7">{language === 'am' ? 'ባለፈው 7 ቀናት' : 'Last 7 Days'}</option>
                    <option value="30">{language === 'am' ? 'ባለፈው 30 ቀናት' : 'Last 30 Days'}</option>
                    <option value="90">{language === 'am' ? 'ባለፈው 90 ቀናት' : 'Last 90 Days'}</option>
                    <option value="365">{language === 'am' ? 'ባለፈው ዓመት' : 'Last Year'}</option>
                  </select>
                </div>
                {(filterRating || filterCountry || filterStore || filterVerified || filterDateRange) && (
                  <button
                    onClick={() => { setFilterRating(''); setFilterCountry(''); setFilterStore(''); setFilterVerified(''); setFilterDateRange(''); }}
                    className="text-label-md font-label-md text-primary hover:text-primary/80 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                    {language === 'am' ? 'ሁሉንም አጽዳ' : 'Clear All'}
                  </button>
                )}
              </div>

              {/* Table Data */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                  <div className="p-xl text-center text-body-md text-on-surface-variant">
                    {language === 'am' ? 'በመጫን ላይ...' : 'Loading reviews...'}
                  </div>
                ) : filteredReviews.length === 0 ? (
                  <div className="p-xl text-center text-body-md text-on-surface-variant">
                    {language === 'am' ? 'ምንም አስተያየት አልተገኘም' : 'No customer reviews found matching criteria.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant">
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">{language === 'am' ? 'ደራሲ' : 'Author'}</th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">{language === 'am' ? 'ሱቅ' : 'Store'}</th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">{language === 'am' ? 'ምርት' : 'Product'}</th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">{language === 'am' ? 'የደረጃ አሰጣጥ' : 'Rating'}</th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">{language === 'am' ? 'አስተያየት' : 'Review'}</th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant">{language === 'am' ? 'ቀን' : 'Date'}</th>
                          <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant text-right">{language === 'am' ? 'እርምጃዎች' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {filteredReviews.map((r) => (
                          <tr key={r._id} className="hover:bg-surface-container-lowest transition-colors group">
                            <td className="px-lg py-lg">
                              <div>
                                <p className="text-label-md font-label-md text-on-surface">{r.name}</p>
                                <p className="text-label-sm font-label-sm text-primary flex items-center gap-1 mt-0.5">
                                  <span className="material-symbols-outlined text-[12px]">public</span>
                                  {r.country}
                                </p>
                              </div>
                            </td>
                            <td className="px-lg py-lg">
                              <p className="text-body-md text-on-surface font-label-md">{r.storeName || <span className="italic text-on-surface-variant">—</span>}</p>
                            </td>
                            <td className="px-lg py-lg">
                              <p className="text-body-md text-on-surface">{r.productName}</p>
                              <p className="text-label-sm text-on-surface-variant">{r.phone}</p>
                            </td>
                            <td className="px-lg py-lg">
                              <div className="flex text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span 
                                    key={i} 
                                    className="material-symbols-outlined text-[18px]"
                                    style={{fontVariationSettings: `'FILL' ${i < r.rating ? 1 : 0}`}}
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-lg py-lg max-w-xs">
                              <p className="text-body-md text-on-surface line-clamp-2" title={r.review}>
                                {r.review || <span className="italic text-on-surface-variant">No comments</span>}
                              </p>
                              <p className="text-label-sm text-on-surface-variant mt-0.5">{r.email}</p>
                            </td>
                            <td className="px-lg py-lg">
                              <p className="text-body-md text-on-surface">{new Date(r.createdAt).toLocaleDateString()}</p>
                              <span className={`inline-flex items-center gap-1 mt-1 text-label-sm font-label-sm px-2 py-0.5 rounded-full ${r.verified ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                                <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>{r.verified ? 'verified' : 'cancel'}</span>
                                {r.verified ? (language === 'am' ? 'የተረጋገጠ' : 'Verified') : (language === 'am' ? 'ያልተረጋገጠ' : 'Unverified')}
                              </span>
                            </td>
                            <td className="px-lg py-lg text-right">
                              <button 
                                onClick={() => handleDeleteReview(r._id)}
                                className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors inline-flex items-center" 
                                title="Delete review"
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
