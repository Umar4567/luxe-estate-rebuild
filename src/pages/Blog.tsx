import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tag, User, Calendar } from "lucide-react";
import blogHero from "../assets/blog-hero.jpg";
import blogPost1 from "../assets/blog-post-1.jpg";
import blogPost2 from "../assets/blog-post-2.jpg";
import blogPost3 from "../assets/blog-post-3.jpg";
import blogPost4 from "../assets/blog-post-4.jpg";
import blogPost5 from "../assets/blog-post-5.jpg";
import blogPost6 from "../assets/blog-post-6.jpg";

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filtersRef, filtersInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filters = ["All", "Property Guide", "Design", "Finance", "Property Tips", "Sustainability", "Investment"];

  const posts = [
    { title: "10 Tips for Choosing the Perfect Luxury Home", excerpt: "Discover essential factors ...", category: "Property Guide", author: "Sarah Mitchell", date: "December 15, 2024", readTime: "5 min", image: blogPost1 },
    { title: "Interior Design Trends for Modern Luxury Homes", excerpt: "Explore the latest design trends ...", category: "Design", author: "Michael Chen", date: "December 10, 2024", readTime: "7 min", image: blogPost2 },
    { title: "Understanding Home Loan Options for Luxury Properties", excerpt: "A guide to financing options ...", category: "Finance", author: "John Anderson", date: "December 5, 2024", readTime: "6 min", image: blogPost3 },
    { title: "The Art of Home Staging: Maximizing Property Value", excerpt: "Learn staging techniques ...", category: "Property Tips", author: "Sarah Mitchell", date: "November 28, 2024", readTime: "4 min", image: blogPost4 },
    { title: "Sustainable Luxury: Eco-Friendly Home Features", excerpt: "Discover sustainable features ...", category: "Sustainability", author: "Michael Chen", date: "November 20, 2024", readTime: "8 min", image: blogPost5 },
    { title: "Investment Potential of Premium Real Estate", excerpt: "Analyze long-term benefits ...", category: "Investment", author: "John Anderson", date: "November 15, 2024", readTime: "6 min", image: blogPost6 },
  ];

  const filtered = activeFilter === "All" ? posts : posts.filter(p => p.category === activeFilter);

  // --- New: search / pagination ---
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const matchesSearch = (p: any) => !searchQuery || (p.title + " " + p.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
  const searchFiltered = filtered.filter(matchesSearch);
  const totalPages = Math.max(1, Math.ceil(searchFiltered.length / perPage));
  const pagedPosts = searchFiltered.slice((page - 1) * perPage, page * perPage);

  // --- New: sharing & analytics ---
  const logEvent = (name: string, data: any = {}) => {
    const events = JSON.parse(localStorage.getItem("analyticsEvents") || "[]");
    events.push({ name, data, at: new Date().toISOString() });
    localStorage.setItem("analyticsEvents", JSON.stringify(events));
    console.info("Analytics:", name, data);
  };
  const sharePost = async (post: any) => {
    logEvent("share_attempt", { title: post.title });
    const url = `${location.origin}/blog?post=${encodeURIComponent(post.title)}`;
    if (navigator.share) {
      try { await navigator.share({ title: post.title, text: post.excerpt, url }); logEvent("share_success", { method: "webshare", title: post.title }); }
      catch { logEvent("share_cancel", { title: post.title }); }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Post link copied to clipboard");
      logEvent("share_copied", { title: post.title });
    }
  };

  // --- New: newsletter signup & admin export/view subscriptions ---
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const getAllSubscriptions = () => {
    const single = localStorage.getItem("subscription");
    const list = JSON.parse(localStorage.getItem("subscriptions") || "[]");
    if (single) list.unshift(JSON.parse(single));
    return list;
  };
  const exportSubscriptionsCSV = () => {
    const subs = getAllSubscriptions();
    if (!subs.length) { alert("No subscriptions to export"); return; }
    const keys = ["plan","price","method","activatedAt","account"];
    const rows = [keys.join(",")].concat(subs.map((s:any)=> keys.map(k=> JSON.stringify(s[k] ?? "")).join(",")));
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "subscriptions.csv"; a.click(); URL.revokeObjectURL(url);
    logEvent("export_subscriptions", { count: subs.length });
  };
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) { setNewsletterMsg("Enter email"); return; }
    const list = JSON.parse(localStorage.getItem("newsletter")||"[]"); list.push({ email: newsletterEmail, at: new Date().toISOString() }); localStorage.setItem("newsletter", JSON.stringify(list));
    setNewsletterMsg("Subscribed — check your inbox (demo)."); setNewsletterEmail("");
    logEvent("newsletter_subscribed", { email: newsletterEmail });
  };

  // Subscription wizard state (Step 1..4)
  const [showSubscription, setShowSubscription] = useState(false);
  const [subStep, setSubStep] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<"Basic" | "Premium" | "Elite" | null>(null);
  const [account, setAccount] = useState({ name: "", email: "", phone: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "NetBanking" | "Wallets" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState<boolean>(() => !!localStorage.getItem("subscription"));
  // Billing cycle (monthly / annual)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Plans catalog: prices are base monthly; annual gets a discount (e.g. 10% off for annual)
  const plans: Record<string, { display: string; price: number; features: string[]; trialDays?: number }> = {
    Basic: { display: "Starter", price: 149, features: ["Property Alerts", "Weekly Newsletter"] },
    Premium: { display: "Pro", price: 499, features: ["All Starter features", "Virtual Tours", "Priority Booking"], trialDays: 7 },
    Elite: { display: "Elite", price: 999, features: ["All Pro features", "Personal Advisor", "Investment Briefs"], trialDays: 14 },
  };
  const annualPrice = (monthly:number) => Math.round(monthly * 12 * 0.9); // 10% annual discount

  // load persisted subscription (simple object stored)
  const loadSubscription = () => {
    const raw = localStorage.getItem("subscription");
    return raw ? JSON.parse(raw) : null;
  };

  // Add helper to compute next billing date and update saveSubscription
const computeNextBilling = (activatedAtIso: string, billingCycle: "monthly" | "annual") => {
	// returns ISO date string of next billing
	const d = new Date(activatedAtIso);
	if (billingCycle === "monthly") {
		d.setMonth(d.getMonth() + 1);
	} else {
		d.setFullYear(d.getFullYear() + 1);
	}
	return d.toISOString();
};

  const saveSubscription = (obj: any) => {
	// assign a nextBilling field for display & management
	const activatedAt = obj.activatedAt || new Date().toISOString();
	obj.nextBilling = computeNextBilling(activatedAt, obj.billingCycle || "monthly");
	localStorage.setItem("subscription", JSON.stringify(obj));
	setSubscriptionActive(true);
  };

  const clearSubscription = () => {
    localStorage.removeItem("subscription");
    setSubscriptionActive(false);
  };

  const handleStart = () => {
    setShowSubscription(true);
    setSubStep(1);
  };

  const handleChoosePlan = (plan: "Basic" | "Premium" | "Elite") => {
    setSelectedPlan(plan);
    setSubStep(2);
  };

  const handleCreateAccount = (e?: React.FormEvent) => {
    e?.preventDefault();
    // basic validation
    if (!account.name || !account.email || !account.phone) return;
    setSubStep(3);
  };

  const handlePayment = async () => {
    if (!paymentMethod || !selectedPlan) return;
    setProcessing(true);
    // simulate payment processing
    await new Promise(r => setTimeout(r, 1200));
    const base = plans[selectedPlan].price;
    const price = billingCycle === "monthly" ? base : annualPrice(base);
    const subscription = {
      plan: selectedPlan,
      displayName: plans[selectedPlan].display,
      billingCycle,
      price,
      account,
      method: paymentMethod,
      activatedAt: new Date().toISOString()
    };
    saveSubscription(subscription);
    setProcessing(false);
    setSubStep(4);
  };

  const handleManageAction = (action: "upgrade" | "downgrade" | "cancel") => {
    const s = loadSubscription();
    if (!s) return;
    if (action === "cancel") {
      clearSubscription();
      return;
    }
    // upgrade/downgrade toggles between tiers for demo purposes
    const newPlan = action === "upgrade" ? (s.plan === "Basic" ? "Premium" : "Elite") : (s.plan === "Elite" ? "Premium" : "Basic");
    const price = newPlan === "Basic" ? 199 : newPlan === "Premium" ? 499 : 999;
    const updated = { ...s, plan: newPlan, price, changedAt: new Date().toISOString() };
    saveSubscription(updated);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section
        ref={heroRef}
        className={`relative h-[60vh] flex items-center justify-center text-center ${heroInView ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${blogHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="text-white z-10">
          <h1 className="text-5xl font-serif font-bold mb-3">Our Blog</h1>
          <p className="text-lg max-w-2xl mx-auto">Expert insights, tips, and trends in luxury Real Estate and interior design</p>
          <div className="mt-6 flex gap-3 justify-center">
            <a href="/blog-animated"><Button variant="ghost">View animated storytelling</Button></a>
            <a href="/blog-live"><Button variant="ghost">Open live project page</Button></a>
          </div>
        </div>
      </section>

      <section ref={filtersRef} className="py-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search + pagination controls */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <input value={searchQuery} onChange={(e)=>{ setSearchQuery(e.target.value); setPage(1); logEvent("search", { q: e.target.value }); }} placeholder="Search posts..." className="border rounded px-3 py-2 w-full md:w-1/3" />
            <div className="text-sm text-muted-foreground">Showing {searchFiltered.length} posts</div>
          </div>
           <div className="flex flex-wrap gap-3 justify-center mb-6">
             {filters.map(f => (
               <Button key={f} size="sm" variant={activeFilter === f ? "default" : "ghost"} onClick={() => setActiveFilter(f)}>
                 {f} <span className="ml-2 text-xs text-muted-foreground">({posts.filter(p => f === "All" ? true : p.category === f).length})</span>
               </Button>
             ))}
           </div>

          <h2 className="text-3xl font-serif font-bold mb-6">Featured Stories — Scroll to Explore</h2>

          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-6">
              {pagedPosts.map((p, i) => (
                <article key={i} className="min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative h-44 w-full">
                    <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">{p.category}</span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-4">
                      <span className="flex items-center gap-2"><User className="w-3 h-3" /> {p.author}</span>
                      <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {p.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{p.readTime}</div>
                      <a href="/blog-animated" className="text-sm text-primary">Read More →</a>
                      <button onClick={() => sharePost(p)} className="text-sm text-muted-foreground ml-3">Share</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* pagination */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button size="sm" variant="ghost" onClick={()=> setPage(p => Math.max(1,p-1))} disabled={page<=1}>Prev</Button>
            <div className="text-sm">Page {page} / {totalPages}</div>
            <Button size="sm" variant="ghost" onClick={()=> setPage(p => Math.min(totalPages,p+1))} disabled={page>=totalPages}>Next</Button>
          </div>
         </div>
       </section>
      
      {/* Newsletter signup & admin exports */}
      <section className="py-6 bg-background border-t border-border/30">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleNewsletter} className="flex items-center gap-2">
            <input value={newsletterEmail} onChange={e=>setNewsletterEmail(e.target.value)} placeholder="Enter your email for newsletter" className="border rounded px-3 py-2" />
            <Button type="submit">Subscribe</Button>
            <div className="text-sm text-muted-foreground ml-4">{newsletterMsg}</div>
          </form>
          <div className="flex gap-2">
            <Button variant="outline" onClick={()=>{ setShowAdminModal(true); logEvent("view_subscriptions"); }}>View Subscriptions</Button>
            <Button onClick={exportSubscriptionsCSV}>Export Subscriptions (CSV)</Button>
          </div>
        </div>
      </section>

      {/* Admin modal (simple) */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowAdminModal(false)}>
          <div className="w-full max-w-2xl bg-white rounded-lg p-4" onClick={(e)=>e.stopPropagation()}>
            <h3 className="font-semibold mb-3">Subscriptions</h3>
            <div className="max-h-64 overflow-auto text-sm">
              <pre className="text-xs bg-gray-50 p-3 rounded">{JSON.stringify(getAllSubscriptions(), null, 2)}</pre>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="outline" onClick={()=>{ setShowAdminModal(false); }}>Close</Button>
              <Button onClick={exportSubscriptionsCSV}>Download CSV</Button>
            </div>
          </div>
        </div>
      )}

      {/* analytics quick link (dev) */}
      <div style={{ position: "fixed", right: 12, bottom: 12, zIndex: 60 }}>
        <button onClick={()=>{ const ev = JSON.parse(localStorage.getItem("analyticsEvents")||"[]"); alert(`Events: ${ev.length}`); }} className="p-2 bg-primary text-white rounded-full">A</button>
      </div>

      <FloatingActions />
      <Footer />
    </div>
  );
};

export default Blog;
