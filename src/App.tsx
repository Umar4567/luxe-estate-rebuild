import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress";
import VisPlusePage from "./VisPlusePage.jsx"; // keep this as-is if file exists

// dynamic page loader: pick up pages with common extensions and provide safe fallback
const _pages = import.meta.glob("./pages/*.{tsx,ts,jsx,js}", { eager: true }) as Record<string, any>;

// Build a normalized map from discovered page files so lookups are robust to
// casing, dashes/underscores, and extension differences (e.g. "blog.tsx" -> "blog").
const pagesMap: Record<string, any> = {};
const normalize = (s: string) => s.replace(/[^a-z0-9]/gi, "").toLowerCase();

for (const k of Object.keys(_pages)) {
  // k looks like "./pages/Blog.tsx" — get "Blog"
  const filename = k.replace(/^\.\/pages\//, "").replace(/\.(tsx|ts|jsx|js)$/, "");
  const key = normalize(filename);
  pagesMap[key] = _pages[k]?.default;
}
// debug — open browser console to see what was found
console.info("Discovered pages (glob keys):", Object.keys(_pages));
console.info("Normalized pagesMap keys:", Object.keys(pagesMap));

function MissingPage({ name }: { name: string }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
      <p className="mb-4">The page "{name}" does not exist or failed to load.</p>
      <a href="/" className="inline-block underline text-primary">Return to Home</a>
    </div>
  );
}

const getElement = (name: string) => {
  const key = normalize(name);
  const C = pagesMap[key];
  return C ? <C /> : <MissingPage name={name} />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollProgress />
        <Routes>
          <Route path="/" element={getElement("Home")} />
          <Route path="/about" element={getElement("About")} />
          <Route path="/projects" element={getElement("Projects")} />
          <Route path="/interior-design" element={getElement("InteriorDesign")} />
          <Route path="/home-loans" element={getElement("HomeLoans")} />
          <Route path="/blog" element={getElement("Blog")} />
          <Route path="/blog-animated" element={getElement("BlogAnimated")} />
          <Route path="/blog-live" element={getElement("BlogLive")} />
          <Route path="/contact" element={getElement("Contact")} />
          <Route path="/newsletter-archive" element={getElement("NewsletterArchive")} />
          <Route path="/vispluse" element={<VisPlusePage />} />
          <Route path="/subscribe" element={getElement("Subscription")} />
          <Route path="/manage-subscription" element={getElement("ManageSubscription")} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={getElement("NotFound")} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
// NOTE: if Vite still cannot resolve these, run the diagnostics below.
// 1. Clear Vite cache: `rm -rf node_modules/.vite`
// 2. Restart dev server
