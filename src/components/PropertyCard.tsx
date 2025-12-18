import { useState } from "react";
import { Bed, Bath, Maximize, X, MapPin, Home, DollarSign, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";

interface PropertyCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  type?: string;
  features?: string[];
}

const PropertyCard = ({
  image,
  price,
  title,
  location,
  beds,
  baths,
  sqft,
  type,
  features = [],
}: PropertyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [schedName, setSchedName] = useState('');
  const [schedEmail, setSchedEmail] = useState('');
  const [schedPhone, setSchedPhone] = useState('');
  const [schedStartDate, setSchedStartDate] = useState('');
  const [schedStartTime, setSchedStartTime] = useState('');
  const [schedEndDate, setSchedEndDate] = useState('');
  const [schedEndTime, setSchedEndTime] = useState('');
  const [schedGuests, setSchedGuests] = useState<number>(1);
  const [schedMessage, setSchedMessage] = useState('');
  const [schedSuccess, setSchedSuccess] = useState(false);
  const [schedDuration, setSchedDuration] = useState<number | null>(null);
  const [schedError, setSchedError] = useState('');
  // Aadhaar + government ID
  const [schedAadhaar, setSchedAadhaar] = useState('');
  const [schedGovIdName, setSchedGovIdName] = useState('');
  const [schedGovIdData, setSchedGovIdData] = useState('');
  // Aadhaar verification & address
  const [schedFullName, setSchedFullName] = useState('');
  const [schedAddress, setSchedAddress] = useState('');
  const [schedAadhaarVerified, setSchedAadhaarVerified] = useState(false);
  const [schedVerifyingAadhaar, setSchedVerifyingAadhaar] = useState(false);
  const [schedVerifyError, setSchedVerifyError] = useState('');
  // Payment options
  const [schedPaymentMethod, setSchedPaymentMethod] = useState('razorpay');
  const [schedReadyForPayment, setSchedReadyForPayment] = useState(false);
  // 5-step booking system states
  const [schedNotes, setSchedNotes] = useState('');
  const [custCity, setCustCity] = useState('');
  const [custState, setCustState] = useState('');
  const [custPostal, setCustPostal] = useState('');
  const [custCountry, setCustCountry] = useState('India');
  const [govDocs, setGovDocs] = useState<Array<{ docType: string; docNumber: string; fileName: string; fileData: string }>>([]);
  const [currentDocType, setCurrentDocType] = useState('Passport');
  const [currentDocNumber, setCurrentDocNumber] = useState('');
  const [currentDocFile, setCurrentDocFile] = useState('');
  const [currentDocFileName, setCurrentDocFileName] = useState('');
  const [docUploadError, setDocUploadError] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [bookingDeposit, setBookingDeposit] = useState('10000');
  const [cancellationPolicy, setCancellationPolicy] = useState('standard');
  const [bookingReference, setBookingReference] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <>
      <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div className="relative h-64 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
            {price}
          </div>
          {type && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="capitalize">{type}</Badge>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
            <span>📍</span> {location}
          </p>
          
          <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{beds} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{baths} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{sqft} sqft</span>
            </div>
          </div>
          
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {features.slice(0, 3).map((feature, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
              ))}
              {features.length > 3 && (
                <Badge variant="outline" className="text-xs">+{features.length - 3} more</Badge>
              )}
            </div>
          )}
          
          <Button 
            onClick={() => setIsOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            <DialogClose />
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Property Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-lg">
                {price}
              </div>
            </div>

            {/* Location & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-semibold capitalize">{type || "Luxury Property"}</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-semibold mb-4">Property Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{beds}</p>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{baths}</p>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <Maximize className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{sqft}</p>
                  <p className="text-xs text-muted-foreground">Sq Feet</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-lg font-bold">{price}</p>
                  <p className="text-xs text-muted-foreground">Price</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {features.length > 0 && (
              <div className="border-t border-border pt-6">
                <h4 className="text-lg font-semibold mb-4">Premium Amenities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-semibold mb-4">About This Property</h4>
              <p className="text-muted-foreground leading-relaxed">
                This exceptional {type || "property"} is located in one of the world's most prestigious destinations. 
                With {beds} luxurious bedrooms and {baths} refined bathrooms spanning {sqft} square feet, 
                this home offers the ultimate in luxury living. Each detail has been carefully crafted to provide 
                an unparalleled lifestyle experience with world-class amenities and breathtaking surroundings.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span>📞</span> Interested? Get in Touch
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>Call:</strong> +1-555-123-4567</p>
                <p><strong>Email:</strong> inquiries@luxeestates.com</p>
                <p><strong>WhatsApp:</strong> Available 24/7</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid gap-3 pt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // Download brochure as JSON
                    const data = { title, location, price, beds, baths, sqft, type, features };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${title.replace(/\s+/g, '_')}_brochure.json`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download Brochure
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const mapsQuery = encodeURIComponent(`${title}, ${location}`);
                    window.open(`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`, '_blank');
                  }}
                >
                  Get Directions
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => setIsScheduleOpen(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Schedule Viewing
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Viewing Modal */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Booking — {title}</DialogTitle>
            <DialogClose />
          </DialogHeader>

          <form
            onSubmit={(e) => {
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

              const request = {
                id: bookingRef,
                property: title,
                location,
                price,
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
                notes: schedMessage,
                selectedProperty: selectedProperty,
                bookingDeposit: Number(bookingDeposit),
                cancellationPolicy: cancellationPolicy,
                paymentMethod: schedPaymentMethod,
                paymentStatus: 'completed',
                createdAt: new Date().toISOString(),
              };

              try {
                const existing = JSON.parse(localStorage.getItem('viewingRequests') || '[]');
                existing.unshift(request);
                localStorage.setItem('viewingRequests', JSON.stringify(existing));
              } catch (err) {
                console.error('save viewing request failed', err);
              }

              setSchedSuccess(true);
              setShowReceipt(true);
              
              setTimeout(() => { 
                setIsScheduleOpen(false); 
                setSchedSuccess(false);  
                setShowReceipt(false);
                // Reset form fields
                setSchedName(''); setSchedPhone(''); setSchedEmail(''); setSchedStartDate(''); setSchedStartTime(''); 
                setSchedEndDate(''); setSchedEndTime(''); setSchedGuests(1); setSchedMessage(''); setSchedAadhaar(''); 
                setSchedFullName(''); setSchedAddress(''); setSchedAadhaarVerified(false); 
                setCustCity(''); setCustState(''); setCustPostal(''); setCustCountry('India');
                setGovDocs([]);
                setSelectedProperty('');
              }, 3000);
            }}
            className="space-y-4 max-h-[70vh] overflow-y-auto"
          >
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
                    <Input placeholder="Any special requests?" value={schedMessage} onChange={(e) => setSchedMessage(e.target.value)} className="mt-1" />
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

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">Complete Booking</Button>
            </div>

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
${schedMessage || 'No special requests'}

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
      <div class="row"><span class="value">${schedMessage || 'No special requests'}</span></div>
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;
