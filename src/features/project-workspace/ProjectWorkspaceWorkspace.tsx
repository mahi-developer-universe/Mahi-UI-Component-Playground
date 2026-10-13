'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowRight, Download, Upload, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { downloadFile } from '@/lib/download';

export interface KanbanTask {
  id: string;
  title: string;
  column: 'backlog' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: 't-1', title: 'Implement WCAG 2.1 color contrast validator', column: 'done', priority: 'high', assignee: 'Alex Rivera' },
  { id: 't-2', title: 'Design high-dpi 1200x630 OG image canvas', column: 'in_progress', priority: 'high', assignee: 'Sarah Chen' },
  { id: 't-3', title: 'Connectable DAG visual workflow simulator', column: 'in_progress', priority: 'medium', assignee: 'Mahi Architect' },
  { id: 't-4', title: 'Add dark/cyberpunk/emerald theme switcher', column: 'done', priority: 'medium', assignee: 'Dev Team' },
  { id: 't-5', title: 'Refactor mobile navigation focus traps', column: 'review', priority: 'high', assignee: 'Sarah Chen' },
  { id: 't-6', title: 'Interactive prompt workbench variable injection', column: 'backlog', priority: 'low', assignee: 'Alex Rivera' },
];

const COLUMNS: { id: KanbanTask['column']; label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'review', label: 'In Review' },
  { id: 'done', label: 'Completed' },
];

export const ProjectWorkspaceWorkspace: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<KanbanTask['priority']>('medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Alex Rivera');

  // Load from localStorage on client mount safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mahi-kanban-tasks');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setTasks(parsed);
        } catch (e) {
          // ignore corrupted local state
        }
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mahi-kanban-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      column: 'backlog',
      priority: newTaskPriority,
      assignee: newTaskAssignee,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleMoveTask = (taskId: string, targetCol: KanbanTask['column']) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, column: targetCol } : t)));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleExportJson = () => {
    const payload = JSON.stringify(tasks, null, 2);
    downloadFile(payload, 'kanban-workspace.json', 'application/json');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Project Management Workspace
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Linear-style sprint Kanban board with state persistence, assignee tags, and JSON backup.
          </p>
        </div>

        <button
          onClick={handleExportJson}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          <Download size={15} />
          Export Board JSON
        </button>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task issue title..."
          style={{ flex: 1, minWidth: '240px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px' }}
        />

        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as any)}
          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 12px', color: '#cbd5e1', fontSize: '13px' }}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="text"
          value={newTaskAssignee}
          onChange={(e) => setNewTaskAssignee(e.target.value)}
          placeholder="Assignee name"
          style={{ width: '160px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 12px', color: '#fff', fontSize: '13px' }}
        />

        <button
          type="submit"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Task
        </button>
      </form>

      {/* 4 Kanban Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);

          return (
            <div
              key={col.id}
              style={{
                background: 'var(--card-bg, #090d16)',
                borderRadius: '12px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '400px',
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>{col.label}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: task.priority === 'high' ? 'rgba(239, 68, 68, 0.15)' : task.priority === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                        color: task.priority === 'high' ? '#f87171' : task.priority === 'medium' ? '#fbbf24' : '#38bdf8',
                      }}>
                        {task.priority}
                      </span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px' }}
                        title="Delete task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', lineHeight: 1.4 }}>
                      {task.title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>👤 {task.assignee}</span>

                      {/* Move to next stage button */}
                      {col.id !== 'done' && (
                        <button
                          onClick={() => {
                            const nextCol =
                              col.id === 'backlog' ? 'in_progress' :
                              col.id === 'in_progress' ? 'review' : 'done';
                            handleMoveTask(task.id, nextCol);
                          }}
                          style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: '600' }}
                        >
                          Next <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
