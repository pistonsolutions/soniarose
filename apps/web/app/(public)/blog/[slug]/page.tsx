import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import type { Metadata } from 'next';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        return {
            title: 'Article non trouvé',
        };
    }

    return {
        title: post.metaTitle,
        description: post.metaDescription,
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const postIndex = blogPosts.findIndex((p) => p.slug === params.slug);
    const post = blogPosts[postIndex];

    if (!post) {
        notFound();
    }

    const prevPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
    const nextPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        description: post.metaDescription,
                        author: {
                            '@type': 'Person',
                            name: post.author,
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Sonia Rose Immobilier',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://soniarose.ca/assets/logo-sonia-rose-new.png',
                            },
                        },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://soniarose.ca/blog/${post.slug}`,
                        },
                    }),
                }}
            />

            <article className="min-h-screen bg-brand-beige-50 pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex justify-between items-center">
                        <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-brand-gold">
                            <Link href="/blog">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Retour au blog
                            </Link>
                        </Button>
                    </div>

                    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm">
                        <div className="relative h-[400px] w-full bg-slate-200">
                            <Image
                                src={post.image || "/home-hero-bg.jpg"}
                                alt={post.title}
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="mb-6 flex items-center gap-6 text-sm text-slate-500">
                                <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                                <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
                            </div>

                            <h1 className="mb-8 font-sans text-3xl font-bold text-brand-brown md:text-4xl lg:text-5xl">
                                {post.title}
                            </h1>

                            <div
                                className="prose prose-lg max-w-none text-slate-600 prose-headings:font-sans prose-headings:text-brand-brown prose-a:text-brand-gold hover:prose-a:text-brand-brown"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Author/CTA Block */}
                            <div className="mt-12 border-t border-slate-100 pt-8">
                                <h3 className="mb-4 font-sans text-2xl font-bold text-brand-brown">Vous avez aimé cet article ?</h3>
                                <p className="mb-6 text-slate-600">
                                    Si ce sujet vous parle, n'hésitez pas à me contacter pour en discuter. Je suis là pour vous accompagner dans vos réflexions immobilières.
                                </p>
                                <div className="flex gap-4">
                                    <Button asChild variant="gold">
                                        <Link href="/contact">Me contacter</Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <Link href="/blog">Lire d'autres articles</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next/Prev Navigation */}
                    <div className="mx-auto max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="group p-6 rounded-xl bg-white shadow-sm border border-transparent hover:border-brand-gold/20 hover:shadow-md transition-all">
                                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2 block">Article précédent</span>
                                <h4 className="font-sans font-bold text-brand-brown group-hover:text-brand-gold transition-colors line-clamp-2">
                                    {prevPost.title}
                                </h4>
                            </Link>
                        ) : <div />}

                        {nextPost ? (
                            <Link href={`/blog/${nextPost.slug}`} className="group p-6 rounded-xl bg-white shadow-sm border border-transparent hover:border-brand-gold/20 hover:shadow-md transition-all text-right">
                                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2 block">Article suivant</span>
                                <h4 className="font-sans font-bold text-brand-brown group-hover:text-brand-gold transition-colors line-clamp-2">
                                    {nextPost.title}
                                </h4>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </article>
        </>
    );
}
