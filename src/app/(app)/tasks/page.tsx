'use client';

import { useState, useMemo } from 'react';
import {
  Circle,
  CircleCheck,
  HeartPulse,
  BookOpen,
  Coins,
  Clock,
  List,
  Columns3,
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import ProgressBar from '@/components/ui/progress-bar';
import Button from '@/components/ui/button';
import { mockTasks } from '@/lib/mock-data';
import { PILLAR_CONFIG, DIFFICULTY_CONFIG } from '@/types';
import type { PillarType, TaskStatus, Task } from '@/types';

const PILLAR_COLORS: Record<PillarType, string> = {
  health: '#00E676',
  intelligence: '#00D2FF',
  gold: '#FFAB00',
  strength: '#39FF14',
};

const PILLAR_ICONS: Record<PillarType, typeof HeartPulse> = {
  health: HeartPulse,
  intelligence: BookOpen,
  gold: Coins,
  strength: Clock,
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#00E676',
  medium: '#00D2FF',
  hard: '#FFAB00',
  epic: '#FF4081',
};

const pillars: PillarType[] = ['health', 'intelligence', 'gold', 'strength'];

type ViewMode = 'list' | 'kanban' | 'calendar';
type PillarFilter = PillarType | 'all';
type StatusFilter = TaskStatus | 'all';

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Completadas' },
  { key: 'expired', label: 'Expiradas' },
  { key: 'all', label: 'Todas' },
];

const VIEW_OPTIONS: { key: ViewMode; label: string; icon: typeof List }[] = [
  { key: 'list', label: 'Lista', icon: List },
  { key: 'kanban', label: 'Kanban', icon: Columns3 },
  { key: 'calendar', label: 'Calendario', icon: CalendarDays },
];

const todayStr = '2026-03-17';
const tomorrowStr = '2026-03-18';

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function TaskRow({ task }: { task: Task }) {
  const isCompleted = task.status === 'completed';
  const isExpired = task.status === 'expired';
  const pillarCfg = PILLAR_CONFIG[task.pillarType];
  const diffCfg = DIFFICULTY_CONFIG[task.difficulty];

  return (
    <Card hover>
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        {isCompleted ? (
          <CircleCheck className="h-5 w-5 shrink-0 text-accent-green" />
        ) : isExpired ? (
          <Clock className="h-5 w-5 shrink-0 text-semantic-error" />
        ) : (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-text-tertiary" />
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col gap-0.5">
          <span
            className={`text-sm font-medium ${
              isCompleted
                ? 'line-through opacity-60'
                : isExpired
                  ? 'text-semantic-error opacity-60'
                  : ''
            }`}
          >
            {task.title}
          </span>
          {task.description && (
            <span className="text-xs text-text-tertiary line-clamp-1">
              {task.description}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="hidden items-center gap-1.5 sm:flex">
          <Badge
            variant="pillar"
            label={pillarCfg.label}
            color={PILLAR_COLORS[task.pillarType]}
          />
          <Badge
            variant="difficulty"
            label={diffCfg.label}
            color={DIFFICULTY_COLORS[task.difficulty]}
          />
          {task.source === 'ai' && (
            <Badge variant="source" label="IA" color="#00D2FF" />
          )}
        </div>

        {/* XP */}
        <span
          className={`ml-auto whitespace-nowrap font-mono text-sm ${
            isCompleted ? 'text-text-tertiary' : 'text-accent-primary'
          }`}
        >
          +{task.xpReward} XP
        </span>
      </div>
    </Card>
  );
}

function KanbanCard({ task }: { task: Task }) {
  const pillarCfg = PILLAR_CONFIG[task.pillarType];
  const diffCfg = DIFFICULTY_CONFIG[task.difficulty];

  return (
    <div className="rounded-lg border border-white/6 bg-bg-secondary p-3 space-y-2">
      <p className="text-sm font-medium">{task.title}</p>
      <div className="flex flex-wrap items-center gap-1">
        <Badge
          variant="pillar"
          label={pillarCfg.label}
          color={PILLAR_COLORS[task.pillarType]}
        />
        <Badge
          variant="difficulty"
          label={diffCfg.label}
          color={DIFFICULTY_COLORS[task.difficulty]}
        />
        {task.source === 'ai' && (
          <Badge variant="source" label="IA" color="#00D2FF" />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-accent-primary">+{task.xpReward} XP</span>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [pillarFilter, setPillarFilter] = useState<PillarFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [calMonth, setCalMonth] = useState(2); // March = 2 (0-indexed)
  const [calYear, setCalYear] = useState(2026);

  // Stats
  const pendingCount = mockTasks.filter((t) => t.status === 'pending').length;
  const completedCount = mockTasks.filter((t) => t.status === 'completed').length;
  const expiredCount = mockTasks.filter((t) => t.status === 'expired').length;
  const totalFinished = completedCount + expiredCount;
  const completionRate = totalFinished > 0 ? Math.round((completedCount / totalFinished) * 100) : 0;

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    let tasks = [...mockTasks];
    if (pillarFilter !== 'all') {
      tasks = tasks.filter((t) => t.pillarType === pillarFilter);
    }
    if (statusFilter !== 'all') {
      tasks = tasks.filter((t) => t.status === statusFilter);
    }
    return tasks;
  }, [pillarFilter, statusFilter]);

  // Grouped tasks for list view
  const todayPending = filteredTasks.filter(
    (t) => t.status === 'pending' && (!t.dueDate || t.dueDate === todayStr)
  );
  const tomorrowPending = filteredTasks.filter(
    (t) => t.status === 'pending' && t.dueDate === tomorrowStr
  );
  const completedToday = filteredTasks.filter(
    (t) =>
      t.status === 'completed' &&
      t.completedAt &&
      t.completedAt.startsWith(todayStr)
  );
  const expiredTasks = filteredTasks.filter((t) => t.status === 'expired');

  interface TaskGroup {
    label: string;
    tasks: Task[];
  }

  const groups: TaskGroup[] = [
    { label: 'Hoje', tasks: todayPending },
    { label: 'Amanha', tasks: tomorrowPending },
    { label: 'Completadas hoje', tasks: completedToday },
    { label: 'Expiradas', tasks: expiredTasks },
  ].filter((g) => g.tasks.length > 0);

  // Kanban columns
  const kanbanPending = filteredTasks.filter((t) => t.status === 'pending');
  const kanbanInProgress: Task[] = []; // Placeholder, no in-progress status in data
  const kanbanCompleted = filteredTasks.filter((t) => t.status === 'completed');

  // Calendar
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  // Tasks by date for calendar
  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};
    for (const t of mockTasks) {
      const dateKey = t.dueDate ?? (t.completedAt ? t.completedAt.split('T')[0] : todayStr);
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(t);
    }
    return map;
  }, []);

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <h1 className="text-2xl font-bold">Tarefas</h1>

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-bg-secondary border border-white/6 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Circle className="h-3.5 w-3.5 text-accent-primary" />
          <span className="text-sm font-medium">{pendingCount}</span>
          <span className="text-xs text-text-tertiary">pendentes</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          <CircleCheck className="h-3.5 w-3.5 text-accent-green" />
          <span className="text-sm font-medium">{completedCount}</span>
          <span className="text-xs text-text-tertiary">completadas</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-semantic-error" />
          <span className="text-sm font-medium">{expiredCount}</span>
          <span className="text-xs text-text-tertiary">expiradas</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-tertiary">Taxa:</span>
          <span className="font-mono text-sm font-medium text-accent-primary">{completionRate}%</span>
        </div>
      </div>

      {/* Quick Add */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Plus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Adicionar tarefa rapida..."
            className="h-10 w-full rounded-lg border border-white/10 bg-bg-input pl-9 pr-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-colors focus:border-accent-primary"
          />
        </div>
        <Button variant="primary" size="sm">
          Adicionar
        </Button>
      </div>

      {/* View toggle + Pillar filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* View toggle */}
        <div className="inline-flex rounded-lg border border-white/10 bg-bg-tertiary p-0.5">
          {VIEW_OPTIONS.map((opt) => {
            const ViewIcon = opt.icon;
            const isActive = activeView === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setActiveView(opt.key)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-primary/15 text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <ViewIcon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Pillar filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setPillarFilter('all')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              pillarFilter === 'all'
                ? 'bg-accent-primary/15 text-accent-primary'
                : 'text-text-secondary hover:bg-white/5'
            }`}
          >
            Todas
          </button>
          {pillars.map((p) => {
            const config = PILLAR_CONFIG[p];
            const PIcon = PILLAR_ICONS[p];
            const isActive = pillarFilter === p;
            return (
              <button
                key={p}
                onClick={() => setPillarFilter(p)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-text-primary'
                    : 'text-text-secondary hover:bg-white/5'
                }`}
              >
                <PIcon className="h-3.5 w-3.5" style={{ color: PILLAR_COLORS[p] }} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap items-center gap-1 text-sm">
        {STATUS_FILTERS.map((sf, i) => (
          <span key={sf.key}>
            {i > 0 && <span className="mr-1 text-text-tertiary">|</span>}
            <button
              onClick={() => setStatusFilter(sf.key)}
              className={`transition-colors ${
                statusFilter === sf.key
                  ? 'font-medium text-accent-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {sf.label}
            </button>
          </span>
        ))}
      </div>

      {/* ===== LIST VIEW ===== */}
      {activeView === 'list' && (
        <div className="space-y-6">
          {groups.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-text-tertiary">Nenhuma tarefa encontrada com os filtros selecionados.</p>
            </div>
          )}
          {groups.map((group) => (
            <section key={group.label} className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                {group.label}
              </h2>
              <div className="space-y-2">
                {group.tasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ===== KANBAN VIEW ===== */}
      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Pendente */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-t-lg bg-accent-amber/10 px-3 py-2">
              <span className="text-sm font-semibold text-accent-amber">Pendente</span>
              <Badge variant="status" label={String(kanbanPending.length)} color="#FFAB00" />
            </div>
            <div className="space-y-2">
              {kanbanPending.map((task) => (
                <KanbanCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Em Progresso */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-t-lg bg-accent-cyan/10 px-3 py-2">
              <span className="text-sm font-semibold text-accent-cyan">Em Progresso</span>
              <Badge variant="status" label={String(kanbanInProgress.length)} color="#00D2FF" />
            </div>
            <div className="space-y-2">
              {kanbanInProgress.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/10 p-6 text-center">
                  <p className="text-xs text-text-tertiary">Nenhuma tarefa em progresso</p>
                </div>
              )}
              {kanbanInProgress.map((task) => (
                <KanbanCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Completa */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-t-lg bg-accent-green/10 px-3 py-2">
              <span className="text-sm font-semibold text-accent-green">Completa</span>
              <Badge variant="status" label={String(kanbanCompleted.length)} color="#00E676" />
            </div>
            <div className="space-y-2">
              {kanbanCompleted.map((task) => (
                <KanbanCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== CALENDAR VIEW ===== */}
      {activeView === 'calendar' && (
        <Card>
          {/* Month header */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="text-base font-semibold">
              {MONTH_NAMES[calMonth]} {calYear}
            </h3>
            <button
              onClick={handleNextMonth}
              className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day of week headers */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((d) => (
              <div
                key={d}
                className="py-1 text-center text-[10px] font-medium uppercase text-text-tertiary"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isToday = dateStr === todayStr;
              const dayTasks = tasksByDate[dateStr] ?? [];
              const uniquePillars = [...new Set(dayTasks.map((t) => t.pillarType))];

              return (
                <div
                  key={day}
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                    isToday
                      ? 'border border-accent-primary bg-accent-primary/5 font-bold text-accent-primary'
                      : 'text-text-secondary hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs">{day}</span>
                  {uniquePillars.length > 0 && (
                    <div className="mt-0.5 flex gap-0.5">
                      {uniquePillars.slice(0, 3).map((p) => (
                        <div
                          key={p}
                          className="h-1 w-1 rounded-full"
                          style={{ backgroundColor: PILLAR_COLORS[p] }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
