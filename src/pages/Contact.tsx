import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";

const Contact = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Contact form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Schedule viewing overlay state
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [schedName, setSchedName] = useState("");
  const [schedPhone, setSchedPhone] = useState("");
  const [schedEmail, setSchedEmail] = useState("");
  const [schedStartDate, setSchedStartDate] = useState("");
  const [schedStartTime, setSchedStartTime] = useState("");
  const [schedEndDate, setSchedEndDate] = useState("");
  const [schedEndTime, setSchedEndTime] = useState("");
  const [schedGuests, setSchedGuests] = useState<number>(1);
  const [schedNotes, setSchedNotes] = useState("");
  const [schedDuration, setSchedDuration] = useState<number | null>(null);
  const [schedError, setSchedError] = useState("");
  const [schedSuccess, setSchedSuccess] = useState("");

  // Government ID (Aadhaar) and uploaded proof
  const [schedAadhaar, setSchedAadhaar] = useState("");
  const [schedGovIdName, setSchedGovIdName] = useState("");
  const [schedGovIdData, setSchedGovIdData] = useState(""); // data URL (base64)
  const [schedGovIdError, setSchedGovIdError] = useState("");
  // Aadhaar verification & address
  const [schedFullName, setSchedFullName] = useState("");
  const [schedAddress, setSchedAddress] = useState("");
  const [schedAadhaarVerified, setSchedAadhaarVerified] = useState(false);
  const [schedVerifyingAadhaar, setSchedVerifyingAadhaar] = useState(false);
  const [schedVerifyError, setSchedVerifyError] = useState("");
  // Payment options
  const [schedPaymentMethod, setSchedPaymentMethod] = useState("razorpay");
  const [schedReadyForPayment, setSchedReadyForPayment] = useState(false);

  // Step 1: Customer Address Form
  const [custCity, setCustCity] = useState("");
  const [custState, setCustState] = useState("");
  const [custPostal, setCustPostal] = useState("");
  const [custCountry, setCustCountry] = useState("India");

  // Step 2: Multiple Government Documents
  const [govDocs, setGovDocs] = useState<Array<{ docType: string; docNumber: string; fileName: string; fileData: string }>>([]);
  const [currentDocType, setCurrentDocType] = useState("Passport");
  const [currentDocNumber, setCurrentDocNumber] = useState("");
  const [currentDocFile, setCurrentDocFile] = useState("");
  const [currentDocFileName, setCurrentDocFileName] = useState("");
  const [docUploadError, setDocUploadError] = useState("");

  // Step 3: Property Selection & Booking Details
  const [selectedProperty, setSelectedProperty] = useState("");
  const [bookingDeposit, setBookingDeposit] = useState("10000"); // Default deposit
  const [cancellationPolicy, setCancellationPolicy] = useState("standard"); // standard, flexible, non-refundable

  // Step 4: Receipt & Booking
  const [bookingReference, setBookingReference] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative h-screen flex items-center justify-center text-center transition-all duration-1000 ${
          heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${contactHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 text-center z-10">
          <div className="stagger">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-white">
              <span className="typewriter" style={{ ['--w']: '12ch', ['--chars']: '12' } as unknown as import('react').CSSProperties}>Get In Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We'd love to hear from you. Our team is ready to assist you with all your Real Estate needs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="p-4 rounded-lg border">
              <summary className="font-semibold cursor-pointer">How long does it take to schedule a viewing?</summary>
              <p className="mt-2 text-sm text-muted-foreground">Once you request a viewing, our team typically responds within 24-48 hours to confirm a time that suits you.</p>
            </details>
            <details className="p-4 rounded-lg border">
              <summary className="font-semibold cursor-pointer">Can I download property brochures?</summary>
              <p className="mt-2 text-sm text-muted-foreground">Yes — individual property pages include brochure downloads. You can also download a general brochure from the top of this page.</p>
            </details>
            <details className="p-4 rounded-lg border">
              <summary className="font-semibold cursor-pointer">Do you offer financing assistance?</summary>
              <p className="mt-2 text-sm text-muted-foreground">We provide financing guidance and can connect you with trusted lenders — ask our sales team during your consultation.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Schedule Viewing Modal - Multi-Step Booking Form */}
      {scheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Complete Your Booking</h3>
              <button onClick={() => setScheduleOpen(false)} aria-label="Close" className="text-muted-foreground">✕</button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setSchedError('');

              const startISO = schedStartDate && schedStartTime ? new Date(schedStartDate + 'T' + schedStartTime).toISOString() : null;
              const endISO = schedEndDate && schedEndTime ? new Date(schedEndDate + 'T' + schedEndTime).toISOString() : null;

              if (!schedName || !schedPhone || !schedEmail || !startISO || !endISO) {
                setSchedError('Please complete name, email, phone, start and end date/time.');
                return;
              }

              const startMs = new Date(startISO).getTime();
              const endMs = new Date(endISO).getTime();
              if (endMs <= startMs) {
                setSchedError('End date/time must be after start date/time.');
                return;
              }

              const MS_PER_DAY = 1000 * 60 * 60 * 24;
              const diffDays = Math.max(1, Math.ceil((endMs - startMs) / MS_PER_DAY));
              setSchedDuration(diffDays);

              if (govDocs.length === 0) {
                setSchedError('Please upload at least one government document.');
                return;
              }

              if (!custCity || !custState || !custPostal) {
                setSchedError('Please fill in all address fields.');
                return;
              }

              const bookingRef = `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
              setBookingReference(bookingRef);

              const req = {
                id: bookingRef,
                name: schedName,
                phone: schedPhone,
                email: schedEmail,
                fullName: schedFullName,
                address: schedAddress,
                city: custCity,
                state: custState,
                postal: custPostal,
                country: custCountry,
                aadhaar: schedAadhaar,
                aadhaarVerified: schedAadhaarVerified,
                govDocuments: govDocs,
                govIdData: schedGovIdData,
                start: startISO,
                end: endISO,
                durationDays: diffDays,
                guests: schedGuests,
                notes: schedNotes,
                selectedProperty: selectedProperty,
                bookingDeposit: Number(bookingDeposit),
                cancellationPolicy: cancellationPolicy,
                paymentMethod: schedPaymentMethod,
                paymentStatus: 'completed',
                createdAt: new Date().toISOString()
              };

              const existing = JSON.parse(localStorage.getItem('scheduleRequests') || '[]');
              existing.unshift(req);
              localStorage.setItem('scheduleRequests', JSON.stringify(existing));

              setSchedSuccess('Booking confirmed! Receipt generated.');
              setShowReceipt(true);
              
              // Clear form after 5 seconds
              setTimeout(() => { 
                setScheduleOpen(false); 
                setSchedSuccess('');  
                setShowReceipt(false);
                // Reset form fields
                setSchedName(''); setSchedPhone(''); setSchedEmail(''); setSchedStartDate(''); setSchedStartTime(''); 
                setSchedEndDate(''); setSchedEndTime(''); setSchedGuests(1); setSchedNotes(''); setSchedAadhaar(''); 
                setSchedFullName(''); setSchedAddress(''); setSchedAadhaarVerified(false); 
                setCustCity(''); setCustState(''); setCustPostal(''); setCustCountry('India');
                setGovDocs([]);
                setSelectedProperty('');
              }, 3000);
            }} className="space-y-4 max-h-[70vh] overflow-y-auto">
              
              {/* Step 1: Basic Info & Aadhaar */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Step 1: Your Details</h4>
                <Input placeholder="Full name" value={schedName} onChange={(e) => setSchedName(e.target.value)} />
                <Input placeholder="Phone" value={schedPhone} onChange={(e) => setSchedPhone(e.target.value)} className="mt-2" />
                <Input placeholder="Email" value={schedEmail} onChange={(e) => setSchedEmail(e.target.value)} className="mt-2" />
              </div>

              {/* Step 2: Address Details */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Step 2: Residential Address</h4>
                <Input placeholder="City" value={custCity} onChange={(e) => setCustCity(e.target.value)} />
                <Input placeholder="State/Province" value={custState} onChange={(e) => setCustState(e.target.value)} className="mt-2" />
                <Input placeholder="Postal Code" value={custPostal} onChange={(e) => setCustPostal(e.target.value)} className="mt-2" />
                <select value={custCountry} onChange={(e) => setCustCountry(e.target.value)} className="w-full border p-2 rounded mt-2">
                  <option>India</option>
                  <option>USA</option>
                  <option>UAE</option>
                  <option>UK</option>
                </select>
              </div>

              {/* Step 3: Government Documents Upload */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Step 3: Government Documents</h4>
                  <div className="space-y-2">
                    <select value={currentDocType} onChange={(e) => setCurrentDocType(e.target.value)} className="w-full border p-2 rounded">
                      <option>Passport</option>
                      <option>Driver License</option>
                      <option>Voter ID</option>
                      <option>Pan Card</option>
                      <option>Other</option>
                    </select>
                    <Input placeholder="Document Number" value={currentDocNumber} onChange={(e) => setCurrentDocNumber(e.target.value)} />
                    <input type="file" accept="*/*" className="w-full border p-2 rounded" onChange={(e) => {
                      setDocUploadError('');
                      const f = e.target.files && e.target.files[0];
                      if (!f) return;
                      if (f.size > 5 * 1024 * 1024) { setDocUploadError('File too large (max 5MB).'); return; }
                      setCurrentDocFileName(f.name);
                      const reader = new FileReader();
                      reader.onload = () => { setCurrentDocFile(reader.result as string); };
                      reader.readAsDataURL(f);
                    }} />
                    {docUploadError && <p className="text-sm text-destructive">{docUploadError}</p>}
                    <Button type="button" onClick={() => {
                      if (!currentDocNumber || !currentDocFile) { setDocUploadError('Fill all fields.'); return; }
                      setGovDocs([...govDocs, { docType: currentDocType, docNumber: currentDocNumber, fileName: currentDocFileName, fileData: currentDocFile }]);
                      setCurrentDocType('Passport');
                      setCurrentDocNumber('');
                      setCurrentDocFile('');
                      setCurrentDocFileName('');
                    }} className="w-full bg-blue-600">Add Document</Button>
                  </div>
                  <div className="mt-3">
                    {govDocs.map((doc, idx) => (
                      <div key={idx} className="bg-blue-50 p-2 rounded mb-2 text-sm flex justify-between">
                        <span>{doc.docType}: {doc.docNumber}</span>
                        <button type="button" onClick={() => setGovDocs(govDocs.filter((_, i) => i !== idx))} className="text-red-600">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

              {/* Step 4: Booking Details */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Step 4: Booking Details</h4>
                  
                  {/* Featured Properties Choice */}
                  <Label>Select Property (Optional)</Label>
                  <select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)} className="w-full border p-2 rounded mb-2">
                    <option value="">-- Choose a property --</option>
                    <option value="Modern Luxury Villa - Delhi - $8.5M">Modern Luxury Villa - Delhi - $8.5M</option>
                    <option value="Penthouse Suite - Mumbai - $15.2M">Penthouse Suite - Mumbai - $15.2M</option>
                    <option value="Oceanfront Estate - Goa - $22.8M">Oceanfront Estate - Goa - $22.8M</option>
                    <option value="Mountain View Villa - Himachal - $12.5M">Mountain View Villa - Himachal - $12.5M</option>
                    <option value="Historic Penthouse - Bangalore - $18.7M">Historic Penthouse - Bangalore - $18.7M</option>
                    <option value="Downtown Luxury Condo - Pune - $10.3M">Downtown Luxury Condo - Pune - $10.3M</option>
                    <option value="Beachfront Villa - Kerala - $19.5M">Beachfront Villa - Kerala - $19.5M</option>
                    <option value="Royal Estate - Jaipur - $14.2M">Royal Estate - Jaipur - $14.2M</option>
                    <option value="Modern Townhouse - Hyderabad - $9.8M">Modern Townhouse - Hyderabad - $9.8M</option>
                    <option value="Luxury Apartments - Chandigarh - $11.5M">Luxury Apartments - Chandigarh - $11.5M</option>
                  </select>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <Label>Start Date</Label>
                      <Input type="date" value={schedStartDate} onChange={(e) => setSchedStartDate(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>Start Time</Label>
                      <Input type="time" value={schedStartTime} onChange={(e) => setSchedStartTime(e.target.value)} className="mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <Label>End Date</Label>
                      <Input type="date" value={schedEndDate} onChange={(e) => setSchedEndDate(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Input type="time" value={schedEndTime} onChange={(e) => setSchedEndTime(e.target.value)} className="mt-1" />
                    </div>
                  </div>

                  {/* Guests & Notes */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <Label>Number of Guests</Label>
                      <Input type="number" min={1} value={schedGuests} onChange={(e) => setSchedGuests(Number(e.target.value) || 1)} className="mt-1" />
                    </div>
                    <div>
                      <Label>Special Notes</Label>
                      <Input placeholder="Any special requests?" value={schedNotes} onChange={(e) => setSchedNotes(e.target.value)} className="mt-1" />
                    </div>
                  </div>
                </div>

              {/* Step 5: Payment Details */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Step 5: Payment</h4>
                  
                  {/* Cancellation Policy */}
                  <Label>Cancellation Policy</Label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <label className="border p-2 rounded cursor-pointer hover:bg-gray-100">
                      <input type="radio" value="standard" checked={cancellationPolicy === 'standard'} onChange={(e) => setCancellationPolicy(e.target.value)} />
                      <div className="text-xs">Standard<br/>(50% refund)</div>
                    </label>
                    <label className="border p-2 rounded cursor-pointer hover:bg-gray-100">
                      <input type="radio" value="flexible" checked={cancellationPolicy === 'flexible'} onChange={(e) => setCancellationPolicy(e.target.value)} />
                      <div className="text-xs">Flexible<br/>(90% refund)</div>
                    </label>
                    <label className="border p-2 rounded cursor-pointer hover:bg-gray-100">
                      <input type="radio" value="non-refundable" checked={cancellationPolicy === 'non-refundable'} onChange={(e) => setCancellationPolicy(e.target.value)} />
                      <div className="text-xs">Non-Refundable<br/>(Better rate)</div>
                    </label>
                  </div>

                  {/* Booking Deposit */}
                  <Label>Booking Deposit</Label>
                  <Input type="number" value={bookingDeposit} onChange={(e) => setBookingDeposit(e.target.value)} className="mb-2" />
                  <p className="text-xs text-muted-foreground mb-3">Deposit: ₹{bookingDeposit} | Payment Method: {schedPaymentMethod.toUpperCase()}</p>

                  {/* Payment Method */}
                  <Label>Payment Method</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <label className="flex-1 border p-2 rounded cursor-pointer hover:bg-gray-100 min-w-[120px]">
                      <input type="radio" value="razorpay" checked={schedPaymentMethod === 'razorpay'} onChange={(e) => setSchedPaymentMethod(e.target.value)} />
                      <span className="text-sm">💳 Razorpay</span>
                    </label>
                    <label className="flex-1 border p-2 rounded cursor-pointer hover:bg-gray-100 min-w-[120px]">
                      <input type="radio" value="stripe" checked={schedPaymentMethod === 'stripe'} onChange={(e) => setSchedPaymentMethod(e.target.value)} />
                      <span className="text-sm">💰 Stripe</span>
                    </label>
                    <label className="flex-1 border p-2 rounded cursor-pointer hover:bg-gray-100 min-w-[120px]">
                      <input type="radio" value="gpay" checked={schedPaymentMethod === 'gpay'} onChange={(e) => setSchedPaymentMethod(e.target.value)} />
                      <span className="text-sm">📱 GPay</span>
                    </label>
                    <label className="flex-1 border p-2 rounded cursor-pointer hover:bg-gray-100 min-w-[120px]">
                      <input type="radio" value="phonepe" checked={schedPaymentMethod === 'phonepe'} onChange={(e) => setSchedPaymentMethod(e.target.value)} />
                      <span className="text-sm">📲 PhonePe</span>
                    </label>
                    <label className="flex-1 border p-2 rounded cursor-pointer hover:bg-gray-100 min-w-[120px]">
                      <input type="radio" value="netbanking" checked={schedPaymentMethod === 'netbanking'} onChange={(e) => setSchedPaymentMethod(e.target.value)} />
                      <span className="text-sm">🏦 Net Banking</span>
                    </label>
                  </div>
                </div>

              {schedDuration !== null && (
                <p className="text-sm text-muted-foreground">📅 Duration: <strong>{schedDuration}</strong> day(s) | 👥 Guests: <strong>{schedGuests}</strong></p>
              )}

              {schedError && <p className="text-sm text-destructive">{schedError}</p>}
              {schedSuccess && <p className="text-sm text-green-600">{schedSuccess}</p>}

              <div className="flex justify-end gap-2 border-t pt-4">
                <Button variant="outline" onClick={() => setScheduleOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">Complete Booking</Button>
              </div>
            </form>

            {/* Receipt Modal */}
            {showReceipt && bookingReference && (
              <div className="mt-6 border-t pt-4 bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 shadow-lg">
                <div className="text-center mb-4">
                  <h4 className="font-bold text-2xl text-green-700 mb-1">✓ Booking Confirmed!</h4>
                  <p className="text-sm text-gray-600">Your reservation has been successfully processed</p>
                </div>
                
                <div className="bg-white p-4 rounded mb-4 border border-gray-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">BOOKING REFERENCE</p>
                      <p className="font-bold text-lg text-blue-600">{bookingReference}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">BOOKING DATE</p>
                      <p className="font-semibold">{new Date().toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">GUEST NAME</p>
                      <p className="font-semibold">{schedName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">DURATION</p>
                      <p className="font-semibold">{schedDuration} day(s)</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">DEPOSIT PAID</p>
                      <p className="font-bold text-green-600">₹{bookingDeposit}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">PAYMENT METHOD</p>
                      <p className="font-semibold">{schedPaymentMethod === 'razorpay' ? '💳 Razorpay' : '💰 Stripe'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600 text-xs">SELECTED PROPERTY</p>
                      <p className="font-semibold text-blue-700">{selectedProperty || 'General Inquiry'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600 text-xs">CANCELLATION POLICY</p>
                      <p className="font-semibold capitalize">{cancellationPolicy.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 border border-blue-300 p-3 rounded mb-4 text-xs text-blue-700">
                  <p>✉️ A confirmation email has been sent to <strong>{schedEmail}</strong></p>
                  <p>📞 Our team will contact you at <strong>{schedPhone}</strong> within 24 hours</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => {
                    const doc = `LUXE ESTATE BOOKING RECEIPT
=====================================

Booking Reference: ${bookingReference}
Booking Date: ${new Date().toLocaleDateString('en-IN')}

GUEST INFORMATION
-----------------
Name: ${schedName}
Email: ${schedEmail}
Phone: ${schedPhone}
City: ${custCity}, ${custState} ${custPostal}
Country: ${custCountry}

BOOKING DETAILS
---------------
Property: ${selectedProperty || 'General Inquiry'}
Check-in: ${schedStartDate} at ${schedStartTime}
Check-out: ${schedEndDate} at ${schedEndTime}
Duration: ${schedDuration} day(s)
Number of Guests: ${schedGuests}

PAYMENT INFORMATION
-------------------
Deposit Amount: ₹${bookingDeposit}
Payment Method: ${schedPaymentMethod.toUpperCase()}
Cancellation Policy: ${cancellationPolicy.replace('-', ' ')}
Payment Status: COMPLETED

ADDITIONAL NOTES
----------------
${schedNotes || 'No special requests'}

=====================================
Thank you for choosing Luxe Estate!
We look forward to serving you.

Booking ID: ${bookingReference}
Issued: ${new Date().toLocaleString('en-IN')}
                    `;
                    const element = document.createElement('a');
                    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(doc);
                    element.download = `LuxeEstate_Booking_${bookingReference}.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }} className="bg-green-600 hover:bg-green-700">📄 Download Receipt</Button>
                  
                  <Button onClick={() => {
                    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Booking Receipt - ${bookingReference}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
    .container { max-width: 800px; margin: 0 auto; border: 2px solid #2563eb; padding: 30px; border-radius: 8px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
    .header h1 { color: #059669; margin: 0; font-size: 28px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #2563eb; font-size: 14px; text-transform: uppercase; margin-bottom: 10px; border-left: 4px solid #2563eb; padding-left: 10px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #ddd; }
    .label { font-weight: bold; color: #666; }
    .value { color: #333; }
    .highlight { color: #059669; font-weight: bold; font-size: 16px; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #2563eb; font-size: 12px; color: #666; }
    .ref-box { background: #e0f2fe; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 20px; }
    .ref-box .label { color: #0369a1; font-size: 12px; }
    .ref-box .value { color: #0284c7; font-size: 24px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ BOOKING CONFIRMED</h1>
      <p>Luxe Estate Booking System</p>
    </div>
    
    <div class="ref-box">
      <div class="label">BOOKING REFERENCE</div>
      <div class="value">${bookingReference}</div>
    </div>

    <div class="section">
      <div class="section-title">Guest Information</div>
      <div class="row"><span class="label">Name:</span><span class="value">${schedName}</span></div>
      <div class="row"><span class="label">Email:</span><span class="value">${schedEmail}</span></div>
      <div class="row"><span class="label">Phone:</span><span class="value">${schedPhone}</span></div>
      <div class="row"><span class="label">Location:</span><span class="value">${custCity}, ${custState} ${custPostal}, ${custCountry}</span></div>
    </div>

    <div class="section">
      <div class="section-title">Booking Details</div>
      <div class="row"><span class="label">Property:</span><span class="value">${selectedProperty || 'General Inquiry'}</span></div>
      <div class="row"><span class="label">Check-in:</span><span class="value">${schedStartDate} at ${schedStartTime}</span></div>
      <div class="row"><span class="label">Check-out:</span><span class="value">${schedEndDate} at ${schedEndTime}</span></div>
      <div class="row"><span class="label">Duration:</span><span class="value">${schedDuration} day(s)</span></div>
      <div class="row"><span class="label">Guests:</span><span class="value">${schedGuests}</span></div>
    </div>

    <div class="section">
      <div class="section-title">Payment Information</div>
      <div class="row"><span class="label">Deposit Amount:</span><span class="value highlight">₹${bookingDeposit}</span></div>
      <div class="row"><span class="label">Payment Method:</span><span class="value">${schedPaymentMethod.toUpperCase()}</span></div>
      <div class="row"><span class="label">Cancellation Policy:</span><span class="value">${cancellationPolicy.replace('-', ' ')}</span></div>
      <div class="row"><span class="label">Status:</span><span class="value" style="color: #059669; font-weight: bold;">COMPLETED ✓</span></div>
    </div>

    <div class="section">
      <div class="section-title">Special Requests</div>
      <div class="row"><span class="value">${schedNotes || 'No special requests'}</span></div>
    </div>

    <div class="footer">
      <p><strong>Booking Issued:</strong> ${new Date().toLocaleString('en-IN')}</p>
      <p>Thank you for choosing Luxe Estate. We look forward to serving you!</p>
      <p style="margin-top: 20px; font-weight: bold;">For support, contact: support@luxeestates.com | +91-1800-LUXE-EST</p>
    </div>
  </div>
</body>
</html>`;
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `LuxeEstate_Receipt_${bookingReference}.html`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }} className="bg-blue-600 hover:bg-blue-700">🖨️ Print/HTML</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Cards */}
      <section 
        ref={cardsRef}
        className={`py-20 transition-all duration-1000 ${
          cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="bg-[hsl(var(--primary))]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <CardTitle className="font-serif">Visit Us</CardTitle>
                <CardDescription className="text-base">
                  123 Luxury Avenue<br />
                  Estate City, EC 12345
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="bg-[hsl(var(--primary))]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <CardTitle className="font-serif">Call Us</CardTitle>
                <CardDescription className="text-base">
                  +1 (555) 123-4567<br />
                  +1 (555) 987-6543
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="bg-[hsl(var(--primary))]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <CardTitle className="font-serif">Email Us</CardTitle>
                <CardDescription className="text-base">
                  info@prestigeestates.com<br />
                  sales@prestigeestates.com
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="bg-[hsl(var(--primary))]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <CardTitle className="font-serif">Business Hours</CardTitle>
                <CardDescription className="text-base">
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Sat: 10:00 AM - 4:00 PM
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Contact Form and Info */}
          <div 
            ref={formRef}
            className={`grid grid-cols-1 lg:grid-cols-3 gap-12 transition-all duration-1000 delay-300 ${
              formInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Left Side - Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[hsl(var(--primary))]" />
                    Office Locations
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground">Main Office</p>
                      <p className="text-sm">123 Luxury Avenue, Estate City, EC 12345</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Downtown Branch</p>
                      <p className="text-sm">456 Metropolitan Plaza, Downtown, DT 67890</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl mb-3">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    For immediate assistance, feel free to call us directly or use the WhatsApp button on the right side of your screen.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <Button onClick={() => setScheduleOpen(true)} className="bg-[hsl(var(--primary))]">Schedule a Viewing</Button>
                    <a href="/brochure.pdf" className="inline-block">
                      <Button variant="outline">Download Brochure</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    const payload = {
                      id: `msg-${Date.now()}`,
                      firstName, lastName, email: emailValue, phone: phoneValue, subject: subjectValue, message: messageValue, createdAt: new Date().toISOString()
                    };
                    try {
                      const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                      existing.unshift(payload);
                      localStorage.setItem('contactMessages', JSON.stringify(existing));
                      setFormSuccess('Message saved — opening email client as a fallback.');
                      const mailto = `mailto:info@prestigeestates.com?subject=${encodeURIComponent(subjectValue || 'Contact Request')}&body=${encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${emailValue}\nPhone: ${phoneValue}\n\n${messageValue}`)}`;
                      window.location.href = mailto;
                      setFirstName(''); setLastName(''); setEmailValue(''); setPhoneValue(''); setSubjectValue(''); setMessageValue('');
                    } catch (err) {
                      console.error(err);
                      setFormSuccess('Unable to save message locally, please email info@prestigeestates.com');
                    }
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="mt-2" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="john.doe@example.com" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} placeholder="+1 (555) 123-4567" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" value={subjectValue} onChange={(e) => setSubjectValue(e.target.value)} placeholder="Property Inquiry" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        placeholder="Tell us about your requirements..." 
                        className="mt-2 min-h-32"
                      />
                    </div>
                    
                    <Button size="lg" className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90" type="submit">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    {formSuccess && <p className="text-sm text-green-600 mt-2">{formSuccess}</p>}
                  </form>
                </CardContent>

                {/* Newsletter subscribe area under the form card */}
                <div className="px-6 pb-6">
                  <h4 className="font-semibold mb-2">Subscribe to our Newsletter</h4>
                  <div className="flex gap-2">
                    <Input placeholder="Your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} />
                    <Button onClick={() => {
                      if (!newsletterEmail) { setNewsletterMsg('Please enter a valid email.'); return; }
                      const subs = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                      subs.unshift({ email: newsletterEmail, createdAt: new Date().toISOString() });
                      localStorage.setItem('newsletterSubscribers', JSON.stringify(subs));
                      setNewsletterMsg('Subscribed — thank you!');
                      setNewsletterEmail('');
                    }}>Subscribe</Button>
                  </div>
                  {newsletterMsg && <p className="text-sm text-muted-foreground mt-2">{newsletterMsg}</p>}
                </div>

              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={mapRef}
        className={`py-20 bg-secondary/30 transition-all duration-1000 ${
          mapInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Find Us on the Map</h2>
          <div className="rounded-lg overflow-hidden shadow-2xl h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946234!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      <FloatingActions />
      <Footer />
    </div>
  );
};

export default Contact;
