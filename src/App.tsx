/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, Palette, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateCreativePrompt } from './services/geminiService';

/** Utility for tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const prompt = await generateCreativePrompt(topic);
      setResult(prompt || "No response generated.");
    } catch (err) {
      console.error(err);
      setError("Failed to ignite the spark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-emerald-100">
      {/* Navigation */}
      <nav className="border-b border-black/5 px-6 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <span className="font-semibold tracking-tight text-lg">Creative Spark</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-500">
          <a href="#" className="hover:text-black transition-colors">Journal</a>
          <a href="#" className="hover:text-black transition-colors">Library</a>
          <a href="#" className="hover:text-black transition-colors">Studio</a>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all active:scale-95">
          Sign In
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        {/* Hero Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Ignite your <br />
              <span className="italic text-emerald-600 font-serif">next big idea.</span>
            </h1>
            <p className="max-w-xl text-lg text-neutral-500 leading-relaxed mb-10">
              A minimalist workspace designed to help you break through creative blocks. 
              Powered by Gemini to generate unique prompts tailored to your vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Writing Prompts", desc: "Narrative hooks and character studies." },
              { icon: Palette, title: "Visual Concepts", desc: "Mood boards and design challenges." },
              { icon: Zap, title: "Quick Brainstorm", desc: "Rapid-fire ideas for any project." }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                  <feature.icon size={20} className="text-neutral-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Prompt Generator Section */}
        <section id="studio" className="relative">
          <div className="absolute inset-0 bg-emerald-50/50 rounded-[40px] -z-10 blur-3xl" />
          
          <div className="bg-white border border-black/5 rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
            {/* Input Side */}
            <div className="w-full md:w-2/5 p-8 border-r border-black/5 bg-neutral-50/30">
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-2 block">The Spark Engine</span>
                <h2 className="text-2xl font-semibold tracking-tight">What are we creating?</h2>
              </div>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">Topic or Theme</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. A cyberpunk city where memories are currency..."
                    className="w-full h-32 p-4 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none text-sm leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !topic.trim()}
                  className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Generate Prompt</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-black/5">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Try topics like: "Solarpunk architecture", "Noir detective in space", or "Minimalist brand for a tea shop".
                </p>
              </div>
            </div>

            {/* Output Side */}
            <div className="w-full md:w-3/5 p-8 bg-white flex flex-col">
              <AnimatePresence mode="wait">
                {!result && !loading && !error ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-12"
                  >
                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
                      <Zap size={24} className="text-neutral-300" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-400">Your creative spark will appear here</h3>
                    <p className="text-sm text-neutral-300 mt-2">Enter a topic on the left to begin.</p>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-12 text-red-500"
                  >
                    <p>{error}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1"
                  >
                    <div className="prose prose-neutral prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:text-neutral-600">
                      <Markdown>{result || ''}</Markdown>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {result && (
                <div className="mt-8 pt-6 border-t border-black/5 flex justify-end">
                  <button 
                    onClick={() => {
                      setResult(null);
                      setTopic('');
                    }}
                    className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors flex items-center gap-2"
                  >
                    Start Over <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6 mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Creative Spark Studio</span>
          </div>
          <p className="text-xs text-neutral-400">
            © 2024 Built with Gemini. All creative rights reserved to the user.
          </p>
          <div className="flex gap-6 text-xs font-medium text-neutral-500">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
