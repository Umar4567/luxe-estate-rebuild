import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUp, login, getCurrentUser, activateSubscription, Plan } from '@/lib/subscription';

const plans: { id: Plan; price: string; description: string }[] = [
  { id: 'Basic', price: '$5/mo', description: 'Simple access to basic features' },
  { id: 'Standard', price: '$15/mo', description: 'Most popular for individuals' },
  { id: 'Premium', price: '$39/mo', description: 'Full access and priority support' },
];

export default function Subscription() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('Standard');
  const [mode, setMode] = useState<'signup'|'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [message, setMessage] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  const submit = async () => {
    setMessage(null);
    try {
      let user = getCurrentUser();
      if (!user) {
        if (mode === 'signup') {
          if (!email || !name) throw new Error('Please provide name and email');
          signUp({ name, email, password, phone });
        } else {
          if (!email) throw new Error('Please provide email to login');
          login(email, password);
        }
      }
      // activate subscription (mock)
      activateSubscription(email, selectedPlan, 1, paymentMethod, true);
      setMessage('Payment successful — subscription activated');
      // navigate to manage page
      setTimeout(() => navigate('/manage-subscription'), 800);
    } catch (err: any) {
      setMessage(err?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif mb-6">Welcome — Subscription</h1>

        {step === 1 && (
          <div className="space-y-4">
            <p>Select Your Subscription Plan:</p>
            <div className="flex gap-4">
              {plans.map(p => (
                <Button key={p.id} variant={plan === p.id ? 'default' : 'outline'} onClick={() => setPlan(p.id)}>
                  {p.label} — {p.price}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <Button onClick={() => plan ? setStep(2) : alert('Select a plan')}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input placeholder="Mobile" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="mt-4 flex gap-4">
              <Button type="submit">Create Account</Button>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p>Choose Payment Method (simulated)</p>
            <div className="flex gap-4">
              <Button onClick={() => { setPaymentDone(true); setStep(4); }}>Pay via UPI</Button>
              <Button onClick={() => { setPaymentDone(true); setStep(4); }}>Pay via Card</Button>
            </div>
          </div>
        )}

        {step === 4 && paymentDone && (
          <div className="p-6 bg-green-50 rounded">
            <h3 className="text-xl mb-2">Payment Successful!</h3>
            <p>Your subscription is now active. Plan: {plans.find(p => p.id === plan)?.label}</p>
            <div className="mt-4">
              <Button onClick={() => window.location.href = '/manage-subscription'}>Manage Subscription</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
