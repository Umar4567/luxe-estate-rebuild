import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCurrentUser, getSubscriptionFor, logout, cancelSubscription, updateAutoRenew, changePlan, updatePaymentMethod } from '@/lib/subscription';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ManageSubscription(){
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sub, setSub] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [plan, setPlan] = useState<string>('premium');
  const [status, setStatus] = useState<string>('Active');

  useEffect(()=>{
    const u = getCurrentUser();
    if (!u) {
      navigate('/subscribe');
      return;
    }
    setUser(u);
    const s = getSubscriptionFor(u.email);
    setSub(s);
    if (s) {
      setPaymentMethod(s.paymentMethod || 'Card');
      setPlan(s.plan);
      setStatus(s.status);
    }
  },[]);

  if (!user) return null;

  const handleCancel = ()=>{
    const s = cancelSubscription(user.email);
    setSub(s);
    setStatus('Cancelled');
  };

  const toggleAuto = ()=>{
    const s = updateAutoRenew(user.email, !sub?.autoRenew);
    setSub(s);
  };

  const handleChangePlan = (plan: any)=>{
    const s = changePlan(user.email, plan);
    setSub(s);
    setPlan(plan);
  };

  const handleUpdatePayment = ()=>{
    const s = updatePaymentMethod(user.email, paymentMethod);
    setSub(s);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl mb-4">Manage Subscription</h1>
        <div className="bg-white/5 p-6 rounded shadow">
          <div className="mb-4">
            <div className="text-sm text-muted-foreground">Signed in as</div>
            <div className="font-medium">{user.name} • {user.email}</div>
          </div>

          {!sub && (
            <div className="p-4 bg-secondary/5 rounded">You do not have an active subscription. <Button onClick={()=>navigate('/subscribe')}>Subscribe now</Button></div>
          )}

          {sub && (
            <div className="space-y-4">
              <div>Plan: <strong>{sub.plan}</strong></div>
              <div>Started: {new Date(sub.startedAt).toLocaleString()}</div>
              <div>Expires: {new Date(sub.expiresAt).toLocaleString()}</div>
              <div>Auto-renew: {sub.autoRenew ? 'On' : 'Off'} <Button variant="outline" onClick={toggleAuto} className="ml-2">Toggle</Button></div>

              <div className="mt-4">
                <div className="text-sm mb-2">Change Plan</div>
                <div className="flex gap-2">
                  <Button onClick={()=>handleChangePlan('Basic')}>Basic</Button>
                  <Button onClick={()=>handleChangePlan('Standard')}>Standard</Button>
                  <Button onClick={()=>handleChangePlan('Premium')}>Premium</Button>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm mb-2">Payment Method</div>
                <div className="flex gap-2">
                  <Input value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} />
                  <Button onClick={handleUpdatePayment}>Update</Button>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="destructive" onClick={handleCancel}>Cancel Subscription</Button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button variant="outline" onClick={()=>{logout(); navigate('/')}}>Sign out</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
