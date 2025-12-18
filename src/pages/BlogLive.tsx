import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { Button } from '@/components/ui/button';

const BlogLive: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="py-40 bg-gray-100 text-center flex-1">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-serif mb-4">Live Project Page</h1>
          <p className="max-w-2xl mx-auto mb-8">
            Full gallery, specs and live data for an immersive view.
          </p>
          <Button onClick={() => alert('Open project gallery (placeholder)')}>
            Open Gallery
          </Button>
        </div>
      </section>
      <FloatingActions />
      <Footer />
    </div>
  );
};

export default BlogLive;
