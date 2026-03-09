import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Home, Package, FlaskConical, FolderOpen, Building2, Newspaper,
  ChevronDown, ChevronRight, Loader2, ExternalLink, RefreshCw, Check,
} from 'lucide-react';
import { usePageContent } from '@/contexts/PageContentContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type Row = { id: string; page: string; section: string; key: string; label: string; value: string; type: string };

// ─── Nav tree ─────────────────────────────────────────────────────────────────

type NavLeaf  = { type: 'leaf';  key: string; label: string; icon: LucideIcon };
type NavGroup = { type: 'group'; label: string; icon: LucideIcon; children: { key: string; label: string }[] };
type NavItem  = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { type: 'leaf', key: 'home', label: 'Home', icon: Home },
  {
    type: 'group', label: 'Products', icon: Package,
    children: [
      { key: 'ai-analyzer', label: 'AI Analyzer' },
      { key: 'dm-03',       label: 'DM-03 Microscope' },
    ],
  },
  {
    type: 'group', label: 'Applications', icon: FlaskConical,
    children: [
      { key: 'blood',   label: 'Blood Analysis' },
      { key: 'urine',   label: 'Urine Analysis' },
      { key: 'feces',   label: 'Feces Analysis' },
      { key: 'pleural', label: 'Pleural Effusion' },
      { key: 'exotic',  label: 'Exotic Animals' },
    ],
  },
  { type: 'leaf', key: 'resources', label: 'Resources', icon: FolderOpen },
  {
    type: 'group', label: 'Company', icon: Building2,
    children: [
      { key: 'about',   label: 'About' },
      { key: 'contact', label: 'Contact' },
      { key: 'footer',  label: 'Footer' },
    ],
  },
  { type: 'leaf', key: 'news', label: 'News', icon: Newspaper },
];

// ─── Page routes for live preview ─────────────────────────────────────────────

const PAGE_ROUTES: Record<string, string> = {
  home:         '/',
  about:        '/company/about',
  contact:      '/contact',
  resources:    '/resources',
  news:         '/company/news',
  footer:       '/',
  blood:        '/applications/blood',
  urine:        '/applications/urine',
  feces:        '/applications/feces',
  pleural:      '/applications/pleural-effusion',
  exotic:       '/applications/exotic-animals',
  'ai-analyzer': '/products/ai-analyzer',
  'dm-03':       '/products/dm-03',
};

const PAGE_LABELS: Record<string, string> = {
  home: 'Home', about: 'About', contact: 'Contact',
  resources: 'Resources', news: 'News', footer: 'Footer',
  blood: 'Blood Analysis', feces: 'Feces Analysis', urine: 'Urine Analysis',
  pleural: 'Pleural Effusion', exotic: 'Exotic Animals',
  'ai-analyzer': 'AI Analyzer', 'dm-03': 'DM-03 Microscope',
};

// ─── FieldEditor ──────────────────────────────────────────────────────────────

const isMultiline = (row: Row) =>
  row.value.length > 80 ||
  row.value.includes('\n') ||
  row.type === 'textarea' ||
  /body|description|desc|subtitle|support|items|_items$/.test(row.key);

type FEProps = {
  row: Row;
  onSave: (id: string, value: string) => Promise<void>;
  onSaved: () => void;
};

const FieldEditor = ({ row, onSave, onSaved }: FEProps) => {
  const [value, setValue] = useState(row.value);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState(false);

  // Only sync when switching to a different row
  useEffect(() => { setValue(row.value); }, [row.id]);

  const dirty = value !== row.value;
  const multiline = isMultiline(row);

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    try {
      await onSave(row.id, value);
      setFlash(true);
      onSaved();
      setTimeout(() => setFlash(false), 1500);
    } finally {
      setSaving(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setValue(row.value);
    if (!multiline && e.key === 'Enter') { e.preventDefault(); save(); }
    if (multiline && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); save(); }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-medium text-muted-foreground truncate flex-1">
          {row.label || row.key}
        </label>
        <div className="flex items-center gap-1.5 shrink-0">
          {flash && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <Check className="h-3 w-3" /> Saved!
            </span>
          )}
          <button
            onClick={save}
            disabled={!dirty || saving}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
              flash
                ? 'bg-emerald-500 text-white'
                : dirty
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground opacity-40 cursor-not-allowed'
            }`}
          >
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Save'}
          </button>
        </div>
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={Math.max(3, value.split('\n').length + 1)}
          className="w-full rounded border border-border bg-background px-2.5 py-2 text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary resize-y min-h-[72px]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full rounded border border-border bg-background px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-9"
        />
      )}
      <p className="text-[10px] text-muted-foreground/50">
        {multiline ? 'Ctrl+Enter to save' : 'Enter to save'} · Esc to reset
      </p>
    </div>
  );
};

// ─── Key ordering within sections (matches website visual order) ──────────────

const FIELD_PRIORITY: Record<string, number> = {
  badge: 0, name: 1, tagline: 1,
  title: 2, title_highlight: 3, title_suffix: 4, title_highlight2: 5,
  title_line1: 2, title_line2: 3,
  subtitle: 6, description: 7, body: 8, excerpt: 8,
  label: 9, desc: 10, support: 10, support_text: 10, items: 11,
  // numbered group sub-fields (e.g. metric_1_value, year_1_highlight, bullet_1)
  year: 0, value: 1, highlight: 3, suffix: 4, bullet: 9, decimals: 20,
  year_count: 0,
  cta_primary: 12, cta_secondary: 13, cta_text: 12, cta_url: 13,
  button_text: 12, button_url: 13,
  // footer address
  phone: 1, email: 2, location: 3, copyright: 20,
  q: 20, a: 21,
  text: 1,
};

// Explicit key order for sections whose keys can't be sorted heuristically
const SECTION_KEY_ORDER: Record<string, string[]> = {
  'contact/form': [
    'title_highlight', 'title_suffix', 'subtitle',
    'label_name', 'label_position', 'label_company', 'label_email',
    'label_whatsapp', 'label_country', 'label_message',
    'btn_submit', 'btn_sending',
    'success_title', 'success_body', 'success_cta',
  ],
  'footer/nav': ['label_quicklinks', 'label_company', 'label_contact'],
  'exotic/species_table': [
    'group_species',
    'col_1', 'col_2', 'col_3', 'col_4',
    'row_1_label', 'row_1_col1', 'row_1_col2', 'row_1_col3', 'row_1_col4',
    'row_2_label', 'row_2_col1', 'row_2_col2', 'row_2_col3', 'row_2_col4',
    'row_3_label', 'row_3_col1', 'row_3_col2', 'row_3_col3', 'row_3_col4',
    'row_4_label', 'row_4_col1', 'row_4_col2', 'row_4_col3', 'row_4_col4',
    'group_samples',
    'row_supported_label', 'companion_species', 'avian_species', 'reptile_species', 'livestock_species',
  ],
};

const leadingNum = (key: string) => {
  // Only count digits that follow an underscore (e.g. metric_1_value → 1, year_1 → 1).
  // Avoids treating name-suffixes like title_highlight2 or title_line1 as group numbers.
  const m = key.match(/_(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
};

const fieldSuffix = (key: string): string => {
  if (/^q\d+$/.test(key)) return 'q';
  if (/^a\d+$/.test(key)) return 'a';
  // e.g. year_1 → 'year' (the key IS the group item, not a sub-field)
  if (/^[a-z]+_\d+$/.test(key)) return key.replace(/_\d+$/, '');
  return key.replace(/^[a-z]+_\d+_/, '');
};

const sortRowKeys = (page: string, section: string, rows: Row[]): Row[] => {
  const explicit = SECTION_KEY_ORDER[`${page}/${section}`];
  if (explicit) {
    return rows.slice().sort((a, b) => {
      const ai = explicit.indexOf(a.key);
      const bi = explicit.indexOf(b.key);
      if (ai === -1 && bi === -1) return a.key.localeCompare(b.key);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }
  return rows.slice().sort((a, b) => {
    const na = leadingNum(a.key), nb = leadingNum(b.key);
    if (na !== nb) return na - nb;
    const pa = FIELD_PRIORITY[fieldSuffix(a.key)] ?? 50;
    const pb = FIELD_PRIORITY[fieldSuffix(b.key)] ?? 50;
    if (pa !== pb) return pa - pb;
    return a.key.localeCompare(b.key);
  });
};

// ─── Section order matching website layout ────────────────────────────────────

const SECTION_ORDER: Record<string, string[]> = {
  home:          ['hero', 'why_us', 'products', 'certifications', 'partners', 'cta'],
  blood:         ['hero', 'overview', 'classification', 'categories', 'how_it_works', 'clinical_images', 'faq', 'cta'],
  feces:         ['hero', 'overview', 'classification', 'categories', 'direct_sampling', 'flotation', 'clinical_images', 'faq', 'cta'],
  urine:         ['hero', 'overview', 'classification', 'categories', 'how_it_works', 'clinical_images', 'faq', 'cta'],
  exotic:        ['hero', 'overview', 'species', 'species_table', 'low_volume', 'faq', 'cta'],
  pleural:       ['hero', 'overview', 'classification', 'clinical_images', 'faq', 'cta'],
  'ai-analyzer': ['hero', 'overview', 'capabilities', 'workflow', 'faq', 'cta'],
  'dm-03':       ['hero', 'overview', 'sample_types', 'hardware', 'capabilities', 'image_hub', 'faq', 'cta'],
  about:         ['hero', 'story', 'metrics', 'journey', 'principles', 'vision', 'values', 'global', 'cta'],
  contact:       ['hero', 'form'],
  footer:        ['tagline', 'nav', 'address'],
  news:          ['hero'],
  resources:     ['hero'],
};

const sortSections = (page: string, entries: [string, Row[]][]) => {
  const order = SECTION_ORDER[page] ?? [];
  return entries.slice().sort(([a], [b]) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
};

// ─── PageEditor ───────────────────────────────────────────────────────────────
// Auto-groups all DB rows for the page by section and renders a FieldEditor per row.

const formatSection = (s: string) =>
  s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

type PageEditorProps = {
  page: string;
  rows: Row[];
  onSave: (id: string, value: string) => Promise<void>;
  onSaved: () => void;
};

const PageEditor = ({ page, rows, onSave, onSaved }: PageEditorProps) => {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/40 py-12 text-center">
        <p className="text-sm text-muted-foreground font-medium">No content rows in DB for this page.</p>
        <p className="text-xs text-muted-foreground mt-1">Run the Supabase migration to seed rows, then refresh.</p>
      </div>
    );
  }

  // Group by section
  const sections = new Map<string, Row[]>();
  for (const row of rows) {
    if (!sections.has(row.section)) sections.set(row.section, []);
    sections.get(row.section)!.push(row);
  }

  const sorted = sortSections(page, [...sections.entries()]);

  const toggle = (section: string) =>
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section); else next.add(section);
      return next;
    });

  return (
    <div className="space-y-3">
      {sorted.map(([section, sRows]) => {
        const isCollapsed = collapsed.has(section);
        const sortedRows = sortRowKeys(page, section, sRows);
        return (
          <div key={section} className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <button
              onClick={() => toggle(section)}
              className="w-full flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
            >
              {isCollapsed
                ? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-1">
                {formatSection(section)}
              </p>
              <span className="text-[10px] text-muted-foreground/50 shrink-0">
                {sRows.length} field{sRows.length !== 1 ? 's' : ''}
              </span>
            </button>
            {!isCollapsed && (
              <div className="p-4 space-y-4">
                {sortedRows.map(row => (
                  <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const PageContentManager = () => {
  const { rows, loading, updateContent } = usePageContent();
  const [selectedPage, setSelectedPage] = useState('home');
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(['Products', 'Applications', 'Company']));
  const [iframeKey, setIframeKey] = useState(0);

  const pageRows = rows.filter(r => r.page === selectedPage);
  const route = PAGE_ROUTES[selectedPage] ?? '/';
  const previewUrl = `${window.location.origin}${route}`;

  const handleSave = async (id: string, value: string) => {
    await updateContent(id, value);
  };

  const handleSaved = () => setIframeKey(k => k + 1);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground gap-2">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading page content…
      </div>
    );
  }

  return (
    <div className="flex h-full">

      {/* ── Left: page nav ──────────────────────────────────────────────────── */}
      <div className="w-52 shrink-0 border-r border-border/50 bg-muted/10 overflow-y-auto">
        <div className="px-3 py-4 space-y-0.5">
          <p className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Pages
          </p>

          {NAV.map(item => {
            if (item.type === 'leaf') {
              const { key, label, icon: Icon } = item as NavLeaf;
              const active = selectedPage === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPage(key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </button>
              );
            }

            const group = item as NavGroup;
            const isOpen = openGroups.has(group.label);
            const hasActive = group.children.some(c => c.key === selectedPage);
            const Icon = group.icon;

            return (
              <div key={group.label}>
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    hasActive && !isOpen ? 'text-primary' : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-left">{group.label}</span>
                  {isOpen
                    ? <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                    : <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />}
                </button>

                {isOpen && (
                  <div className="ml-3 pl-3 border-l border-border/40 mt-0.5 mb-1 space-y-0.5">
                    {group.children.map(child => {
                      const active = selectedPage === child.key;
                      return (
                        <button
                          key={child.key}
                          onClick={() => setSelectedPage(child.key)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                            active
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Center: auto-generated edit form ────────────────────────────────── */}
      <div className="w-[380px] shrink-0 border-r border-border/50 overflow-y-auto">
        <div className="px-5 py-5 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">{PAGE_LABELS[selectedPage] ?? selectedPage}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{pageRows.length} field{pageRows.length !== 1 ? 's' : ''} · Enter to save · Esc to reset</p>
          </div>
          <PageEditor page={selectedPage} rows={pageRows} onSave={handleSave} onSaved={handleSaved} />
        </div>
      </div>

      {/* ── Right: live iframe preview ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-border/50 bg-muted/10">
          <span className="flex-1 truncate text-xs text-muted-foreground font-mono">{previewUrl}</span>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground border border-border rounded hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" /> Open
          </a>
          <button
            onClick={() => setIframeKey(k => k + 1)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground border border-border rounded hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-3 w-3" /> Reload
          </button>
        </div>
        {/* iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            key={iframeKey}
            src={previewUrl}
            className="w-full h-full border-0"
            title="Page preview"
          />
        </div>
      </div>
    </div>
  );
};

export default PageContentManager;
