'use client';

import React, { useState } from 'react';
import { Terminal, Send, Code2, Briefcase, Award, Mail, ExternalLink, CheckCircle2, User } from 'lucide-react';

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    year: '2024 — Present',
    role: 'Principal Frontend Architect',
    company: 'Mahi Developer Universe',
    description: 'Spearheaded 30-workspace interactive playground, modern design system token architecture, and zero-runtime bundle optimizations.',
    skills: ['Next.js 16', 'React 19', 'Zustand', 'Design Tokens'],
  },
  {
    year: '2022 — 2024',
    role: 'Senior UI/UX & Systems Engineer',
    company: 'HyperScale Cloud',
    description: 'Designed high-frequency telemetry dashboards, real-time WebSocket charts, and WCAG 2.1 AAA accessible component primitives.',
    skills: ['TypeScript', 'Tailwind', 'SVG Visualization', 'WAI-ARIA'],
  },
  {
    year: '2020 — 2022',
    role: 'Frontend Engineer',
    company: 'Veloce Labs',
    description: 'Engineered high-performance web applications, interactive canvas graphics, and continuous integration testing pipelines.',
    skills: ['React', 'HTML5 Canvas', 'REST/GraphQL', 'Jest'],
  },
];

const SKILLS = [
  { name: 'React 19 / Next.js 16', level: 98 },
  { name: 'TypeScript & Architecture', level: 95 },
  { name: 'CSS Tokens & Micro-interactions', level: 92 },
  { name: 'Web Accessibility (WCAG 2.1)', level: 90 },
  { name: 'State Management (Zustand/Redux)', level: 94 },
  { name: 'Canvas & SVG Visualizations', level: 88 },
];

export const DeveloperPortfolioWorkspace: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Mahi Interactive Portfolio CLI v2.4',
    'Type "help" to inspect supported commands (e.g. bio, skills, exp, contact, clear).',
  ]);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Strict safe command parser (no evaluation)
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = [
          'Available commands:',
          '  bio       - View author summary and engineering philosophy',
          '  skills    - List core competencies and proficiency ratings',
          '  exp       - Show career trajectory & enterprise experience',
          '  contact   - Display communication channels and direct links',
          '  clear     - Clear terminal session history',
        ];
        break;
      case 'bio':
        response = [
          'Author: Principal Frontend Systems Architect',
          'Focus: High-performance React/Next.js architectures, design systems, and accessible developer tooling.',
        ];
        break;
      case 'skills':
        response = [
          'Core Technical Stack:',
          '  • React 19 / Next.js 16 App Router (98%)',
          '  • TypeScript & Static Verification (95%)',
          '  • WCAG 2.1 AAA Accessibility (90%)',
          '  • Design Tokens & CSS Custom Properties (92%)',
        ];
        break;
      case 'exp':
        response = [
          'Trajectory:',
          '  • 2024 - Present: Principal Frontend Architect @ Mahi Universe',
          '  • 2022 - 2024: Senior UI/UX Engineer @ HyperScale Cloud',
          '  • 2020 - 2022: Frontend Engineer @ Veloce Labs',
        ];
        break;
      case 'contact':
        response = [
          'Reach out directly via:',
          '  • GitHub: github.com/mahi-developer-universe',
          '  • Web: mahi-ui-playground.vercel.app',
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [`Command not found: "${cmd}". Type "help" for a list of valid commands.`];
        break;
    }

    setTerminalHistory((prev) => [...prev, `$ ${terminalInput}`, ...response]);
    setTerminalInput('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Hero Banner */}
      <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '14px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-color, #10b981)' }}>
            Available for Strategic Engineering & Advisory
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0', color: '#fff', letterSpacing: '-0.02em' }}>
            Senior Frontend Systems Architect
          </h2>
          <p style={{ margin: 0, fontSize: '15px', color: '#94a3b8', maxWidth: '640px', lineHeight: 1.6 }}>
            Engineering accessible design system foundations, deterministic graph runtimes, and high-DPI frontend developer platforms.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', color: '#000', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}
          >
            GitHub Repository <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* 2-Column: Timeline & Skills Radar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Timeline */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={20} color="#10b981" />
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#fff' }}>Career Trajectory</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: '2px solid rgba(255,255,255,0.08)', paddingLeft: '20px', marginLeft: '6px' }}>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', border: '2px solid #090d16' }} />
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>{exp.year}</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>{exp.role} · <span style={{ color: '#94a3b8', fontWeight: '500' }}>{exp.company}</span></div>
                <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>{exp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {exp.skills.map((s) => (
                    <span key={s} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Bars */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="#10b981" />
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#fff' }}>Technical Proficiency</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SKILLS.map((skill) => (
              <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600' }}>
                  <span style={{ color: '#fff' }}>{skill.name}</span>
                  <span style={{ color: '#10b981' }}>{skill.level}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive CLI Terminal Sandbox */}
      <div style={{ background: '#05070e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="#10b981" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Interactive Developer Console</span>
          <span style={{ fontSize: '11px', color: '#64748b', marginLeft: 'auto' }}>Try: "help", "skills", "exp"</span>
        </div>

        <div style={{ minHeight: '130px', maxHeight: '180px', overflowY: 'auto', background: 'rgba(0,0,0,0.6)', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#34d399', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
          {terminalHistory.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', gap: '10px' }}>
          <span style={{ color: '#10b981', fontFamily: 'monospace', padding: '10px 0', fontSize: '14px' }}>$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Type 'help' and press Enter..."
            style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'monospace' }}
          />
          <button
            type="submit"
            style={{ padding: '0 16px', borderRadius: '6px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
