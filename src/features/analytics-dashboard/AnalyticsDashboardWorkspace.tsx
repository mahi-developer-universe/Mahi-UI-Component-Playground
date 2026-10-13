'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Filter,
  BarChart2,
  Layers,
  Sparkles,
  CreditCard,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { downloadFile } from '@/lib/download';

interface MetricCardProps {
  title: string;
  value: string;
  subValue: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, change, isPositive, icon }) => (
  <div
    style={{
      background: 'var(--card-bg, #090d16)',
      borderRadius: '14px',
      border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      boxShadow: '0 8px 24px -6px rgba(0,0,0,0.4)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted, #94a3b8)' }}>{title}</span>
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10b981'
        }}
      >
        {icon}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
      <span style={{ fontSize: '32px', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em' }}>{value}</span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: '700',
          padding: '2px 8px',
          borderRadius: '20px',
          background: isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: isPositive ? '#10b981' : '#ef4444'
        }}
      >
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
    </div>
    <div style={{ fontSize: '12px', color: '#64748b' }}>{subValue}</div>
  </div>
);

type MetricView = 'revenue' | 'users' | 'churn';

export const AnalyticsDashboardWorkspace: React.FC = () => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeMetric, setActiveMetric] = useState<MetricView>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Multi-range telemetry datasets
  const data = useMemo(() => {
    if (range === '7d') {
      return [
        { date: 'Mon', revenue: 4200, users: 140, churn: 0.8 },
        { date: 'Tue', revenue: 4800, users: 165, churn: 0.6 },
        { date: 'Wed', revenue: 5100, users: 180, churn: 0.7 },
        { date: 'Thu', revenue: 4900, users: 172, churn: 0.5 },
        { date: 'Fri', revenue: 5600, users: 210, churn: 0.4 },
        { date: 'Sat', revenue: 6200, users: 245, churn: 0.3 },
        { date: 'Sun', revenue: 6800, users: 290, churn: 0.2 },
      ];
    }
    if (range === '30d') {
      return [
        { date: 'Week 1', revenue: 24500, users: 820, churn: 1.2 },
        { date: 'Week 2', revenue: 28900, users: 950, churn: 1.0 },
        { date: 'Week 3', revenue: 34200, users: 1140, churn: 0.8 },
        { date: 'Week 4', revenue: 41800, users: 1420, churn: 0.6 },
      ];
    }
    return [
      { date: 'Month 1', revenue: 84000, users: 2900, churn: 1.5 },
      { date: 'Month 2', revenue: 112000, users: 3800, churn: 1.1 },
      { date: 'Month 3', revenue: 148500, users: 5100, churn: 0.8 },
    ];
  }, [range]);

  const maxVal = Math.max(...data.map((d) => d[activeMetric]));

  const handleExportCsv = () => {
    let csv = 'Period,Revenue (USD),Active Users,Churn Rate (%)\n';
    data.forEach((row) => {
      csv += `"${row.date}",${row.revenue},${row.users},${row.churn}\n`;
    });
    downloadFile(csv, `saas-analytics-${range}.csv`, 'text/csv');
  };

  const getMetricFormat = (val: number) => {
    if (activeMetric === 'revenue') return `$${val.toLocaleString()}`;
    if (activeMetric === 'users') return `${val.toLocaleString()} seats`;
    return `${val}%`;
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner / Header Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'var(--card-bg, #090d16)',
          padding: '20px 28px',
          borderRadius: '16px',
          border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10b981', padding: '3px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)' }}>
              LIVE TELEMETRY
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>• Cluster US-East-1 (Operational)</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '6px 0 0', color: 'var(--text-primary, #fff)', letterSpacing: '-0.02em' }}>
            SaaS Analytics & Revenue Dashboard
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Metric Selector */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {(['revenue', 'users', 'churn'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMetric(m)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: activeMetric === m ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activeMetric === m ? '#fff' : '#94a3b8',
                  fontWeight: '600',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Timeframe pill filter */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  background: range === r ? 'var(--primary-color, #10b981)' : 'transparent',
                  color: range === r ? '#000' : '#cbd5e1',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        <MetricCard
          title="Monthly Recurring Revenue"
          value={range === '7d' ? '$6,800' : range === '30d' ? '$41,800' : '$148,500'}
          subValue="ARR run-rate estimated at $501.6k"
          change="+18.4%"
          isPositive={true}
          icon={<DollarSign size={20} />}
        />
        <MetricCard
          title="Active Paid Seats"
          value={range === '7d' ? '290' : range === '30d' ? '1,420' : '5,100'}
          subValue="94.2% daily active license engagement"
          change="+24.1%"
          isPositive={true}
          icon={<Users size={20} />}
        />
        <MetricCard
          title="Net Churn Rate"
          value={range === '7d' ? '0.2%' : range === '30d' ? '0.6%' : '0.8%'}
          subValue="Industry top quartile benchmark <1.2%"
          change="-0.4%"
          isPositive={true}
          icon={<Activity size={20} />}
        />
        <MetricCard
          title="Telemetry Uptime SLA"
          value="99.98%"
          subValue="Zero catastrophic outages in past 90 days"
          change="Operational"
          isPositive={true}
          icon={<CheckCircle2 size={20} />}
        />
      </div>

      {/* Main Charts & Telemetry Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Interactive Bar Chart Studio */}
        <div
          style={{
            background: 'var(--card-bg, #090d16)',
            borderRadius: '16px',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#fff', textTransform: 'capitalize' }}>
                {activeMetric} Trajectory & Velocity
              </h3>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Interactive histogram across {range} timeline
              </span>
            </div>
            {hoveredIndex !== null && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{data[hoveredIndex].date}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#10b981' }}>
                  {getMetricFormat(data[hoveredIndex][activeMetric])}
                </div>
              </div>
            )}
          </div>

          {/* SVG Bar Chart with Hover Highlighting */}
          <div
            style={{
              height: '260px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '16px',
              padding: '20px 0 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              position: 'relative'
            }}
          >
            {data.map((item, idx) => {
              const heightPct = Math.round((item[activeMetric] / maxVal) * 100);
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={item.date}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      color: isHovered ? '#fff' : '#94a3b8',
                      fontWeight: isHovered ? '700' : '600',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {activeMetric === 'revenue' ? `$${(item.revenue / 1000).toFixed(1)}k` : activeMetric === 'users' ? item.users : `${item.churn}%`}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '54px',
                      height: `${heightPct}%`,
                      background: isHovered
                        ? 'linear-gradient(180deg, #34d399 0%, #10b981 100%)'
                        : 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.25) 100%)',
                      borderRadius: '8px 8px 0 0',
                      border: `1px solid ${isHovered ? '#34d399' : 'rgba(16, 185, 129, 0.4)'}`,
                      boxShadow: isHovered ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: isHovered ? '#fff' : '#cbd5e1',
                      fontWeight: isHovered ? '700' : '500',
                      transition: 'color 0.15s ease'
                    }}
                  >
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Sub-metrics Summary Footer */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '4px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Peak Period Value</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>
                {getMetricFormat(maxVal)}
              </div>
            </div>
            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Growth Velocity</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#10b981', marginTop: '4px' }}>
                +28.4% WoW
              </div>
            </div>
            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Telemetry Quality</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#38bdf8', marginTop: '4px' }}>
                100% Validated
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Event Feed & System Health */}
        <div
          style={{
            background: 'var(--card-bg, #090d16)',
            borderRadius: '16px',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', margin: 0, color: '#fff' }}>
              Live Event Audit Stream
            </h3>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              Syncing
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { text: 'Enterprise Plan Upgrade', org: 'Acme Robotics', amount: '+$1,200/mo', time: '2m ago', type: 'upgrade' },
              { text: 'Seat Expansion (+15 seats)', org: 'Stripe Ecosystem', amount: '+$360/mo', time: '14m ago', type: 'seat' },
              { text: 'Pro Annual Renewal', org: 'Vercel Partner', amount: '+$3,600/yr', time: '1h ago', type: 'renewal' },
              { text: 'Custom Webhook Pipeline', org: 'Fintech Alpha', amount: 'Configured', time: '2h ago', type: 'dev' },
              { text: 'SOC-2 Compliance Report', org: 'Vault Systems', amount: 'Passed', time: '3h ago', type: 'sec' },
            ].map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{ev.text}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{ev.org} • {ev.time}</div>
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: ev.amount.startsWith('+') ? '#10b981' : '#cbd5e1',
                    background: ev.amount.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.06)',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {ev.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Cluster Status Health */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Infra Cluster Health
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1' }}>
              <span>Database Query Latency</span>
              <span style={{ color: '#10b981', fontWeight: '700' }}>14ms</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginTop: '6px' }}>
              <span>Global CDN Cache Hit Rate</span>
              <span style={{ color: '#10b981', fontWeight: '700' }}>98.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
