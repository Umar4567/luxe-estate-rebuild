import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newsletters = [
  {
    title: "October 2025: Luxe Market Trends & New Listings",
    date: "Oct 31, 2025",
    highlights: [
      "Top 5 luxury properties of the month",
      "Expert tips for festive home decor",
      "Exclusive interview: Interior designer Priya Mehra"
    ],
    link: "#"
  },
  {
    title: "September 2025: Eco-Friendly Luxury & Smart Homes",
    date: "Sep 30, 2025",
    highlights: [
      "Sustainable features in modern estates",
      "Smart home tech for 2025",
      "Upcoming open house events"
    ],
    link: "#"
  },
  {
    title: "August 2025: Investment Insights & Design Trends",
    date: "Aug 31, 2025",
    highlights: [
      "Luxury real estate as an investment",
      "2025's hottest design trends",
      "Client success story: The Shah Family"
    ],
    link: "#"
  }
];

const NewsletterArchive = () => (
  <div className="min-h-screen">
    <Header />
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-10 text-center">Newsletter Archive</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.map((nl, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl font-serif mb-2">{nl.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-2">{nl.date}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground mb-4">
                  {nl.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
                <a href={nl.link} className="text-primary hover:underline font-medium">Read Full Issue</a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default NewsletterArchive;
