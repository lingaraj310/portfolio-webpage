import React, { useState } from 'react';
import { Radio, Send, Terminal, Mail, Copy, Check, Sparkles, MessageSquare, Globe, ExternalLink } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7 0-.93-.76-1.7-1.7-1.7-.93 0-1.7.77-1.7 1.7 0 .94.77 1.7 1.7 1.7m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function ContactPanel() {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const contactLinks = [
    {
      id: 'email',
      label: 'Direct Email',
      value: 'lingaraj24bcs151@gmail.com',
      display: 'lingaraj24bcs151@gmail.com',
      icon: Mail,
      action: 'mailto:lingaraj24bcs151@gmail.com'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Professional Profile',
      value: 'https://www.linkedin.com/in/lingaraj-v-4a1438328',
      display: 'linkedin.com/in/lingaraj-v-4a1438328',
      icon: LinkedinIcon,
      action: 'https://www.linkedin.com/in/lingaraj-v-4a1438328'
    },
    {
      id: 'github',
      label: 'GitHub Code Repositories',
      value: 'https://github.com/lingaraj310',
      display: 'github.com/lingaraj310',
      icon: GithubIcon,
      action: 'https://github.com/lingaraj310'
    }
  ];

  const handleCopy = (id, value) => {
    sound.playSelect();
    navigator.clipboard.writeText(value);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    sound.playSelect();
    setStatus('TRANSMITTING...');
    setTimeout(() => {
      setStatus('TRANSMISSION DISPATCHED // MESSAGE RECORDED');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Sector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-2xl bg-space-900/80 border border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>SECTOR 07 // SINGAPORE HUB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Direct Communications & Social Links
          </h2>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          FREQUENCY: 142.85 MHz // OPEN
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Contact Direct Links */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-space-900 via-space-850 to-space-950 border border-slate-800 space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>Verified Channels</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-space leading-relaxed">
              Open to engineering opportunities, software development roles, startup collaborations, and innovation projects.
            </p>

            <div className="space-y-3 pt-2">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const isCopied = copiedField === link.id;
                return (
                  <div
                    key={link.id}
                    className="p-4 rounded-xl bg-space-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-space-900 text-cyan-400 group-hover:scale-110 group-hover:text-neon-cyan transition-all border border-slate-800 group-hover:border-cyan-500/50">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                          {link.label}
                        </span>
                        <a
                          href={link.action}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs sm:text-sm font-mono text-white hover:text-cyan-300 transition-colors truncate block"
                        >
                          {link.display}
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(link.id, link.value)}
                      onMouseEnter={() => sound.playHover()}
                      className="p-2.5 rounded-lg bg-space-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer shrink-0"
                      title="Copy to clipboard"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Transmission Form */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-space-900 via-space-850 to-space-950 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Terminal className="w-5 h-5" />
            <h3 className="font-orbitron font-bold text-lg text-white">Send Direct Message</h3>
          </div>

          <form onSubmit={handleTransmit} className="space-y-3 font-space text-xs">
            <div>
              <label className="text-slate-400 font-mono block mb-1">YOUR NAME</label>
              <input
                type="text"
                required
                placeholder="e.g. Recruiter / Collaborator"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 focus:border-cyan-400 text-white outline-none font-mono text-xs transition-colors"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">YOUR EMAIL</label>
              <input
                type="email"
                required
                placeholder="e.g. recruiter@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 focus:border-cyan-400 text-white outline-none font-mono text-xs transition-colors"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">MESSAGE</label>
              <textarea
                required
                rows={4}
                placeholder="Enter message or project discussion details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 focus:border-cyan-400 text-white outline-none font-space text-xs transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => sound.playHover()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer transition-all shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>SEND MESSAGE</span>
            </button>

            {status && (
              <div className="p-3 rounded-xl bg-space-950 border border-cyan-400/50 text-cyan-300 font-mono text-xs text-center animate-fade-in">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
