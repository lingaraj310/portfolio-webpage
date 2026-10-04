import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  Terminal, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare, 
  Globe, 
  ExternalLink, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  User, 
  AtSign, 
  AlignLeft,
  Lock
} from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactLinks = [
    {
      id: 'email',
      label: 'DIRECT EMAIL',
      value: 'lingaraj24bcs151@gmail.com',
      display: 'lingaraj24bcs151@gmail.com',
      icon: Mail,
      action: 'mailto:lingaraj24bcs151@gmail.com'
    },
    {
      id: 'location',
      label: 'LOCATION',
      value: 'Coimbatore, Tamil Nadu, India',
      display: 'Coimbatore, Tamil Nadu, India',
      icon: MapPin,
      action: null
    },
    {
      id: 'linkedin',
      label: 'PROFESSIONAL NETWORK',
      value: 'https://www.linkedin.com/in/lingaraj-v-4a1438328',
      display: 'linkedin.com/in/lingaraj-v ↗',
      icon: LinkedinIcon,
      action: 'https://www.linkedin.com/in/lingaraj-v-4a1438328'
    },
    {
      id: 'github',
      label: 'CODE REPOSITORIES',
      value: 'https://github.com/lingaraj310',
      display: 'github.com/lingaraj310 ↗',
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
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="select-none max-w-6xl mx-auto space-y-8 animate-fade-in font-sans text-slate-800">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's Connect
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            Interested in software engineering roles, collaborative innovation projects, or research fellowships? Feel free to reach out.
          </p>
        </div>

        <div className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>INBOX ACTIVE // RESPONSIVE</span>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Communication Channels (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300">
          <div className="space-y-1">
            <h3 
              className="text-xl font-bold text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Communication Channels
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Reach out directly through email, connect on LinkedIn, or inspect my source code repositories on GitHub.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const isCopied = copiedField === link.id;

              return (
                <div
                  key={link.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 transition-all duration-200 hover:border-sky-300"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-slate-500">
                        {link.label}
                      </span>
                      {link.action ? (
                        <a
                          href={link.action}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-sky-700 truncate block hover:underline"
                        >
                          {link.display}
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-slate-900 truncate block">
                          {link.display}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(link.id, link.value)}
                    onMouseEnter={() => sound.playHover()}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition-colors cursor-pointer shrink-0 shadow-sm"
                    title="Copy to clipboard"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-amber-700">
              💡 ENGINEERING FOCUS
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Open to summer engineering internships, industrial research fellowships, computer vision pipelines & tech startup builds.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300">
          <div className="flex items-center space-x-2.5 border-b border-slate-200 pb-4">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
              <MessageCircle className="w-4 h-4" />
            </div>
            <h3 
              className="text-xl font-bold text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Send a Direct Message
            </h3>
          </div>

          <form onSubmit={handleTransmit} className="space-y-4">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                YOUR NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Ramesh Kumar / Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:bg-slate-50 transition-all duration-200"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                YOUR EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:bg-slate-50 transition-all duration-200"
              />
            </div>

            {/* Subject Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                SUBJECT
              </label>
              <input
                type="text"
                placeholder="e.g. Internship Opportunity / Technical Collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:bg-slate-50 transition-all duration-200"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                MESSAGE *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the project, inquiry, or opportunity..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:bg-slate-50 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg shadow-sky-500/25 cursor-pointer hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>SENDING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>

            {/* Form Notice */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <Lock className="w-3.5 h-3.5 text-sky-700" />
              <span>Direct frontend submission. For urgent correspondence, email directly to <strong className="text-sky-600">lingaraj24bcs151@gmail.com</strong>.</span>
            </div>

            {/* Success Feedback Animation */}
            {isSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center space-x-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div className="text-xs font-medium">
                  <strong className="block font-bold">Message Transmitted!</strong>
                  Thank you for reaching out. I will get back to you shortly.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
