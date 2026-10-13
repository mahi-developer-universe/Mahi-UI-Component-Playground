'use client';

import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, Download, Plus, Trash2, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { downloadFile } from '@/lib/download';

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'output';
  label: string;
  x: number;
  y: number;
  status: 'idle' | 'running' | 'success' | 'failed';
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

const INITIAL_NODES: WorkflowNode[] = [
  { id: '1', type: 'trigger', label: 'HTTP Webhook Received', x: 40, y: 80, status: 'idle' },
  { id: '2', type: 'condition', label: 'Validate JWT Token', x: 260, y: 80, status: 'idle' },
  { id: '3', type: 'action', label: 'Query Postgres Database', x: 480, y: 80, status: 'idle' },
  { id: '4', type: 'output', label: 'Send Slack Notification', x: 700, y: 80, status: 'idle' },
];

const INITIAL_EDGES: WorkflowEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

export const WorkflowBuilderWorkspace: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<WorkflowEdge[]>(INITIAL_EDGES);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Cycle detection algorithm (Depth-First Search / Kahn's algorithm)
  const hasCycle = useMemo(() => {
    const adj: Record<string, string[]> = {};
    nodes.forEach((n) => { adj[n.id] = []; });
    edges.forEach((e) => {
      if (adj[e.source]) adj[e.source].push(e.target);
    });

    const visited: Record<string, boolean> = {};
    const recStack: Record<string, boolean> = {};

    function isCyclicUtil(nodeId: string): boolean {
      if (!visited[nodeId]) {
        visited[nodeId] = true;
        recStack[nodeId] = true;

        const neighbors = adj[nodeId] || [];
        for (const neighbor of neighbors) {
          if (!visited[neighbor] && isCyclicUtil(neighbor)) return true;
          else if (recStack[neighbor]) return true;
        }
      }
      recStack[nodeId] = false;
      return false;
    }

    for (const node of nodes) {
      if (isCyclicUtil(node.id)) return true;
    }
    return false;
  }, [nodes, edges]);

  // Run sequential simulation safely without arbitrary code evaluation
  const handleRunSimulation = async () => {
    if (hasCycle) {
      setExecutionLogs(['❌ Error: Cyclic dependency detected in workflow DAG. Aborting simulation.']);
      return;
    }

    setIsSimulating(true);
    setExecutionLogs(['🚀 Starting deterministic workflow execution...']);

    // Map order starting from trigger
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      // update node status
      setNodes((prev) => prev.map((n) => (n.id === node.id ? { ...n, status: 'running' } : n)));
      setExecutionLogs((prev) => [...prev, `⏳ Step ${i + 1}: Executing "${node.label}"...`]);

      await new Promise((res) => setTimeout(res, 600));

      setNodes((prev) => prev.map((n) => (n.id === node.id ? { ...n, status: 'success' } : n)));
      setExecutionLogs((prev) => [...prev, `✅ Step ${i + 1}: Completed "${node.label}" (exit code 0)`]);
    }

    setExecutionLogs((prev) => [...prev, '🎉 Pipeline completed successfully with 0 errors.']);
    setIsSimulating(false);
  };

  const handleReset = () => {
    setNodes(INITIAL_NODES.map((n) => ({ ...n, status: 'idle' })));
    setEdges(INITIAL_EDGES);
    setExecutionLogs([]);
    setIsSimulating(false);
  };

  const handleExportJson = () => {
    const payload = JSON.stringify({ nodes, edges, hasCycle, timestamp: new Date().toISOString() }, null, 2);
    downloadFile(payload, 'workflow-dag.json', 'application/json');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Visual Workflow Node Builder
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Directed Acyclic Graph (DAG) node orchestrator with cycle detection and pipeline simulation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleReset}
            disabled={isSimulating}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <button
            onClick={handleExportJson}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            <Download size={15} />
            Export Graph JSON
          </button>
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating || hasCycle}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: isSimulating ? 'not-allowed' : 'pointer' }}
          >
            <Play size={15} />
            {isSimulating ? 'Running...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* Cycle Detection Status Banner */}
      {hasCycle && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px 18px', borderRadius: '8px', color: '#f87171', fontSize: '13px', fontWeight: '600' }}>
          <AlertTriangle size={18} />
          Cyclic dependency loop detected! Workflows must form a valid Directed Acyclic Graph (DAG) to execute.
        </div>
      )}

      {/* Interactive Visual Graph Canvas */}
      <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '32px', minHeight: '260px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '800px', justifyContent: 'center' }}>
          {nodes.map((node, index) => {
            const isLast = index === nodes.length - 1;
            const nodeColor =
              node.type === 'trigger' ? '#38bdf8' :
              node.type === 'condition' ? '#f59e0b' :
              node.type === 'action' ? '#a855f7' : '#10b981';

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  style={{
                    width: '200px',
                    borderRadius: '10px',
                    background: node.status === 'running' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${node.status === 'running' ? '#38bdf8' : node.status === 'success' ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: node.status === 'running' ? '0 0 15px rgba(56, 189, 248, 0.3)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: nodeColor }}>
                      {node.type}
                    </span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: node.status === 'success' ? '#10b981' : node.status === 'running' ? '#38bdf8' : '#64748b' }} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                    {node.label}
                  </div>
                </div>

                {/* Edge Connector Arrow */}
                {!isLast && (
                  <div style={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
                    <div style={{ width: '24px', height: '2px', background: '#334155' }} />
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Execution Logs Terminal */}
      <div style={{ background: '#05070e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
            Pipeline Execution Telemetry & Audit Logs
          </span>
          <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
            STATUS: {isSimulating ? 'RUNNING' : 'IDLE'}
          </span>
        </div>

        <div style={{ minHeight: '120px', maxHeight: '180px', overflowY: 'auto', background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {executionLogs.length === 0 ? (
            <span style={{ color: '#64748b' }}>Click "Run Simulation" above to execute DAG pipeline steps...</span>
          ) : (
            executionLogs.map((log, i) => <div key={i}>{log}</div>)
          )}
        </div>
      </div>
    </div>
  );
};
