import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import blogHero from '@/assets/blog-hero.jpg';
import blogPost1 from '@/assets/blog-post-1.jpg';
import blogPost2 from '@/assets/blog-post-2.jpg';
import blogPost3 from '@/assets/blog-post-3.jpg';
import blogPost4 from '@/assets/blog-post-4.jpg';
import blogPost5 from '@/assets/blog-post-5.jpg';
import blogPost6 from '@/assets/blog-post-6.jpg';
import { Link } from 'react-router-dom';

const posts = [
	{
		title: '10 Tips for Choosing the Perfect Luxury Home',
		category: 'Property Guide',
		author: 'Sarah Mitchell',
		date: 'Dec 15, 2024',
		readTime: '5 min read',
		image: blogPost1,
	},
	{
		title: 'Interior Design Trends for Modern Luxury Homes',
		category: 'Design',
		author: 'Michael Chen',
		date: 'Dec 10, 2024',
		readTime: '7 min read',
		image: blogPost2,
	},
	{
		title: 'Understanding Home Loan Options for Luxury Properties',
		category: 'Finance',
		author: 'John Anderson',
		date: 'Dec 5, 2024',
		readTime: '6 min read',
		image: blogPost3,
	},
	{
		title: 'The Art of Home Staging: Maximizing Property Value',
		category: 'Property Tips',
		author: 'Sarah Mitchell',
		date: 'Nov 28, 2024',
		readTime: '4 min read',
		image: blogPost4,
	},
	{
		title: 'Sustainable Luxury: Eco-Friendly Home Features',
		category: 'Sustainability',
		author: 'Michael Chen',
		date: 'Nov 20, 2024',
		readTime: '8 min read',
		image: blogPost5,
	},
	{
		title: 'Investment Potential of Premium Real Estate',
		category: 'Investment',
		author: 'John Anderson',
		date: 'Nov 15, 2024',
		readTime: '6 min read',
		image: blogPost6,
	},
];

const container = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 30, scale: 0.98 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
	},
};

const BlogAnimated: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Header />

			<section
				className="relative h-[60vh] flex items-center justify-center text-center"
				style={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${blogHero})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className="container mx-auto px-4 lg:px-8 z-10">
					<h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
						Our Blog
					</h1>
					<p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
						Scroll to explore — posts reveal with a smooth storytelling animation.
					</p>
					<div className="mt-6">
						<Link to="/blog" className="inline-block">
							<Button variant="ghost">Back to Classic Blog</Button>
						</Link>
					</div>
				</div>
			</section>

			<main className="container mx-auto px-4 lg:px-8 py-12">
				<div className="sticky top-20 z-20 bg-transparent py-4">
					<div className="flex gap-3 items-center overflow-auto pb-2">
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							All
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							Property Guide
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							Design
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							Finance
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							Property Tips
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							Sustainability
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="rounded-full"
						>
							Investment
						</Button>
					</div>
				</div>

				<motion.section
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
				>
					{posts.map((p, i) => (
						<motion.article key={i} variants={item} className="">
							<Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
								<div className="relative h-48 md:h-44 w-full">
									<img
										src={p.image}
										alt={p.title}
										className="object-cover w-full h-full"
									/>
									<span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
										{p.category}
									</span>
								</div>
								<CardContent>
									<h3 className="mt-4 text-lg font-semibold text-foreground">
										{p.title}
									</h3>
									<div className="flex items-center justify-between mt-4">
										<div className="text-xs text-muted-foreground">
											{p.author} • {p.date}
										</div>
										<div className="text-sm text-primary">
											Read More →
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.article>
					))}
				</motion.section>

				<section className="py-40 bg-gradient-to-b from-gray-900 to-black text-white text-center">
					<div className="container mx-auto px-4">
						<h1 className="text-5xl font-serif mb-4">
							Animated Storytelling
						</h1>
						<p className="max-w-2xl mx-auto mb-8">
							Interactive narrative with animated visuals and progressive
							reveals.
						</p>
						<Button
							onClick={() => alert('Animation demo placeholder')}
						>
							Play Demo
						</Button>
					</div>
				</section>
			</main>

			<FloatingActions />
			<Footer />
		</div>
	);
};

export default BlogAnimated;
