import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Home, Building2, TrendingUp, Hammer, UserCheck, Percent, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import financingHero from "@/assets/financing-hero.jpg";

const HomeLoans = () => {
  const [loanAmount, setLoanAmount] = useState([1000000]);
  const [downPayment, setDownPayment] = useState([200000]);
  const [interestRate, setInterestRate] = useState([6.5]);
  const [loanTerm, setLoanTerm] = useState([30]);

  const [showPreApprovalModal, setShowPreApprovalModal] = useState(false);
  const [preName, setPreName] = useState("");
  const [preEmail, setPreEmail] = useState("");
  const [prePhone, setPrePhone] = useState("");
  const [prePropertyPrice, setPrePropertyPrice] = useState("");
  const [preLoanAmount, setPreLoanAmount] = useState("");
  const [preMessage, setPreMessage] = useState("");
  const [preApprovalSuccess, setPreApprovalSuccess] = useState(false);
  // Speak with Expert modal state
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertName, setExpertName] = useState("");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertPhone, setExpertPhone] = useState("");
  const [expertMessage, setExpertMessage] = useState("");
  const [expertSuccess, setExpertSuccess] = useState(false);

  const principalAmount = loanAmount[0] - downPayment[0];
  const monthlyRate = interestRate[0] / 100 / 12;
  const numberOfPayments = loanTerm[0] * 12;
  const monthlyPayment = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const preApprovalData = {
      name: preName,
      email: preEmail,
      phone: prePhone,
      propertyPrice: prePropertyPrice,
      loanAmount: preLoanAmount,
      message: preMessage,
      submittedAt: new Date().toLocaleString()
    };
    
    const existingRequests = JSON.parse(localStorage.getItem("preApprovalRequests") || "[]");
    existingRequests.push(preApprovalData);
    localStorage.setItem("preApprovalRequests", JSON.stringify(existingRequests));
    
    setPreApprovalSuccess(true);
    setTimeout(() => {
      setShowPreApprovalModal(false);
      setPreApprovalSuccess(false);
      setPreName("");
      setPreEmail("");
      setPrePhone("");
      setPrePropertyPrice("");
      setPreLoanAmount("");
      setPreMessage("");
    }, 2000);
  };

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: calcRef, inView: calcInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: programsRef, inView: programsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[500px] flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${financingHero})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className={`container mx-auto px-4 lg:px-8 text-center relative z-10 transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white">
            <span className="typewriter" style={{ ["--w"]: "14ch", ["--chars"]: "14" } as unknown as import("react").CSSProperties}>Home Financing</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
            Secure competitive rates and flexible terms for your luxury property investment
          </p>
        </div>
      </section>


      {/* Calculator */}
      <section ref={calcRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${calcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Loan Calculator</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Estimate your monthly payments and explore financing options for your dream home
            </p>
          </div>
          
          <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${calcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Calculate Your Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium">Loan Amount:</span>
                    <span className="text-sm font-semibold">${loanAmount[0].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    min={100000}
                    max={10000000}
                    step={50000}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium">Down Payment:</span>
                    <span className="text-sm font-semibold">${downPayment[0].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={downPayment}
                    onValueChange={setDownPayment}
                    min={0}
                    max={loanAmount[0]}
                    step={10000}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium">Interest Rate:</span>
                    <span className="text-sm font-semibold">{interestRate[0].toFixed(1)}%</span>
                  </div>
                  <Slider
                    value={interestRate}
                    onValueChange={setInterestRate}
                    min={2}
                    max={15}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium">Loan Term:</span>
                    <span className="text-sm font-semibold">{loanTerm[0]} years</span>
                  </div>
                  <Slider
                    value={loanTerm}
                    onValueChange={setLoanTerm}
                    min={5}
                    max={30}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold">${loanAmount[0].toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-semibold">${downPayment[0].toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="font-semibold">${principalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold">{interestRate[0].toFixed(1)}%</span>
                  </div>
                </div>

                <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
                  <p className="text-sm opacity-90 mb-2">Monthly Payment</p>
                  <p className="text-4xl md:text-5xl font-serif font-bold">
                    ${Math.round(monthlyPayment).toLocaleString()}
                  </p>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setShowPreApprovalModal(true)}>
                  Get Pre-Approved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Programs */}
      <section ref={programsRef} className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${programsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Loan Programs</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from our comprehensive range of financing solutions designed for luxury properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className={`hover:shadow-xl transition-all duration-500 ${programsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-serif mb-2">Conventional Loans</CardTitle>
                    <p className="text-muted-foreground">Traditional financing with competitive rates for qualified buyers.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Down payments as low as 3%
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Fixed or adjustable rates
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> No mortgage insurance with 20% down
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-xl transition-all duration-500 delay-100 ${programsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-serif mb-2">Jumbo Loans</CardTitle>
                    <p className="text-muted-foreground">Specialized financing for luxury properties exceeding conventional limits.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Higher loan amounts
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Competitive rates
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Flexible terms
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-xl transition-all duration-500 delay-200 ${programsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-serif mb-2">Investment Property</CardTitle>
                    <p className="text-muted-foreground">Financing solutions for Real Estate investment opportunities.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Portfolio lending
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Quick approval process
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Competitive investor rates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-xl transition-all duration-500 delay-300 ${programsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-serif mb-2">Construction Loans</CardTitle>
                    <p className="text-muted-foreground">Short-term financing for building your dream home.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Interest-only payments
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Flexible draw schedule
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary"></span> Convert to permanent loan
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Our Financing */}
      <section ref={whyRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Why Choose Our Financing</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the difference of working with luxury Real Estate financing specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
            {[
              { icon: UserCheck, title: "Expert Guidance", desc: "Our loan specialists guide you through every step of the financing process.", delay: 0 },
              { icon: Percent, title: "Competitive Rates", desc: "Access to exclusive rates and terms from our network of premium lenders.", delay: 100 },
              { icon: Clock, title: "Fast Approval", desc: "Streamlined approval process to help you secure your dream property quickly.", delay: 200 },
              { icon: Shield, title: "Flexible Terms", desc: "Customized loan structures to fit your unique financial situation.", delay: 300 }
            ].map((item, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-1000 delay-${item.delay} ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="bg-primary text-primary-foreground rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Secure Your Financing?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Get pre-approved today and take the first step toward owning your dream luxury property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary" onClick={() => setShowPreApprovalModal(true)}>
              Get Pre-Approved
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => setShowExpertModal(true)}>
              Speak with Expert
            </Button>
          </div>
        </div>
      </section>

      <FloatingActions />
      <Footer />

      {/* Pre-Approval Modal */}
      <Dialog open={showPreApprovalModal} onOpenChange={setShowPreApprovalModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Get Pre-Approved</DialogTitle>
          </DialogHeader>
          {preApprovalSuccess ? (
            <div className="text-center py-8">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg mb-4">
                <p className="font-semibold text-lg">Pre-Approval Submitted!</p>
                <p className="text-sm mt-2">Our financing specialist will contact you shortly to discuss your options.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePreApprovalSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preName">Full Name</Label>
                <Input
                  id="preName"
                  placeholder="Enter your full name"
                  value={preName}
                  onChange={(e) => setPreName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preEmail">Email Address</Label>
                <Input
                  id="preEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={preEmail}
                  onChange={(e) => setPreEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prePhone">Phone Number</Label>
                <Input
                  id="prePhone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={prePhone}
                  onChange={(e) => setPrePhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prePropertyPrice">Estimated Property Price</Label>
                <Input
                  id="prePropertyPrice"
                  type="number"
                  placeholder="500000"
                  value={prePropertyPrice}
                  onChange={(e) => setPrePropertyPrice(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preLoanAmount">Desired Loan Amount</Label>
                <Input
                  id="preLoanAmount"
                  type="number"
                  placeholder="400000"
                  value={preLoanAmount}
                  onChange={(e) => setPreLoanAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preMessage">Additional Details (Optional)</Label>
                <Textarea
                  id="preMessage"
                  placeholder="Tell us about your Real Estate goals, preferred loan terms, or any special requirements..."
                  value={preMessage}
                  onChange={(e) => setPreMessage(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowPreApprovalModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Submit Application
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Speak with Expert Modal */}
      <Dialog open={showExpertModal} onOpenChange={setShowExpertModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Speak with an Expert</DialogTitle>
          </DialogHeader>
          {expertSuccess ? (
            <div className="text-center py-8">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg mb-4">
                <p className="font-semibold text-lg">Request Sent!</p>
                <p className="text-sm mt-2">An expert will contact you soon to discuss your financing options.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              const expertData = { name: expertName, email: expertEmail, phone: expertPhone, message: expertMessage, submittedAt: new Date().toLocaleString() };
              const existing = JSON.parse(localStorage.getItem('expertRequests') || '[]');
              existing.push(expertData);
              localStorage.setItem('expertRequests', JSON.stringify(existing));
              setExpertSuccess(true);
              setTimeout(() => {
                setShowExpertModal(false);
                setExpertSuccess(false);
                setExpertName(''); setExpertEmail(''); setExpertPhone(''); setExpertMessage('');
              }, 2000);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expertName">Full Name</Label>
                <Input id="expertName" placeholder="Your full name" value={expertName} onChange={(e) => setExpertName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertEmail">Email</Label>
                <Input id="expertEmail" type="email" placeholder="you@example.com" value={expertEmail} onChange={(e) => setExpertEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertPhone">Phone</Label>
                <Input id="expertPhone" type="tel" placeholder="(555) 555-5555" value={expertPhone} onChange={(e) => setExpertPhone(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertMessage">Message</Label>
                <Textarea id="expertMessage" placeholder="Quick note about your goals" value={expertMessage} onChange={(e) => setExpertMessage(e.target.value)} rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowExpertModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">Request Call</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeLoans;
