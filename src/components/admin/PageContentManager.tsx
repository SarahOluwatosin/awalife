import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Home, Package, FlaskConical, FolderOpen, Building2, Newspaper,
  ChevronDown, ChevronRight, Loader2, ExternalLink, RefreshCw, Check,
  Upload, X, Plus,
} from 'lucide-react';
import { usePageContent } from '@/contexts/PageContentContext';
import { uploadToStorage } from '@/lib/storage';
import { dbSelect, dbInsert, dbDelete } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';

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
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [resources, setResources] = useState<any[] | null>(null);

  // Only sync when switching to a different row
  useEffect(() => { setValue(row.value); }, [row.id]);

  const dirty = value !== row.value;
  const multiline = isMultiline(row);
  const isFile = row.type === 'file';

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
      {isFile ? (
        <div className="space-y-2">
          {/* URL display */}
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="No file selected"
            className="w-full rounded border border-border bg-background px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-9 truncate"
          />
          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Upload */}
            <label className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-border hover:border-primary/50 hover:text-primary transition-colors">
              {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
              {uploading ? 'Uploading…' : 'Upload'}
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg,.gif,.webp,.mp4,.webm"
                disabled={uploading}
                onChange={async e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const url = await uploadToStorage('media', 'brochures', file);
                    setValue(url);
                    // Auto-save immediately so the URL is persisted without requiring a manual Save click
                    await onSave(row.id, url);
                    onSaved();
                    setFlash(true);
                    setTimeout(() => setFlash(false), 1500);
                  } catch { /* silent */ } finally {
                    setUploading(false);
                    e.target.value = '';
                  }
                }}
              />
            </label>
            {/* Pick from Resources */}
            <button
              type="button"
              onClick={async () => {
                if (!resources) {
                  const rows = await dbSelect<any>('resources', 'order=created_at.desc&media_url=neq.');
                  setResources(rows);
                }
                setPickerOpen(o => !o);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-border hover:border-primary/50 hover:text-primary transition-colors"
            >
              <FolderOpen className="h-3 w-3" />
              Pick from Resources
            </button>
            {value && (
              <button type="button" onClick={() => setValue('')} className="ml-auto flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-destructive transition-colors" title="Clear URL">
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
          {/* Resource picker dropdown */}
          {pickerOpen && resources && (
            <div className="max-h-48 overflow-y-auto rounded border border-border bg-background shadow-md text-sm">
              {resources.length === 0 && (
                <p className="px-3 py-2 text-muted-foreground text-xs">No resources with files found.</p>
              )}
              {resources.map((r: any) => (
                <button
                  key={r.id}
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-secondary/50 truncate flex items-center gap-2 transition-colors"
                  onClick={async () => {
                    const url = r.media_url;
                    setValue(url);
                    setPickerOpen(false);
                    await onSave(row.id, url);
                    onSaved();
                    setFlash(true);
                    setTimeout(() => setFlash(false), 1500);
                  }}
                >
                  <span className="text-[10px] font-bold text-muted-foreground uppercase shrink-0">{r.media_mime?.split('/').pop()?.slice(0,4) || 'file'}</span>
                  <span className="truncate">{r.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : multiline ? (
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
        {multiline && !isFile ? 'Ctrl+Enter to save' : 'Enter to save'} · Esc to reset
      </p>
    </div>
  );
};

// ─── NavLinkPairEditor ────────────────────────────────────────────────────────

const ROUTE_OPTIONS = [
  { label: 'Home',              path: '/' },
  { label: 'AI Analyzer',       path: '/products/ai-analyzer' },
  { label: 'DM-03 Microscope',  path: '/products/dm-03' },
  { label: 'Blood Analysis',    path: '/applications/blood' },
  { label: 'Urine Analysis',    path: '/applications/urine' },
  { label: 'Feces Analysis',    path: '/applications/feces' },
  { label: 'Pleural Effusion',  path: '/applications/pleural-effusion' },
  { label: 'Exotic Animals',    path: '/applications/exotic-animals' },
  { label: 'About',             path: '/company/about' },
  { label: 'News Center',       path: '/company/news' },
  { label: 'Resources',         path: '/resources' },
  { label: 'Contact',           path: '/contact' },
];

type NLProps = {
  labelRow: Row;
  urlRow: Row | null;
  onSave: (id: string, value: string) => Promise<void>;
  onSaved: () => void;
};

const NavLinkPairEditor = ({ labelRow, urlRow, onSave, onSaved }: NLProps) => {
  const [labelVal, setLabelVal] = useState(labelRow.value);
  const [urlVal, setUrlVal] = useState(urlRow?.value ?? '');
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => { setLabelVal(labelRow.value); }, [labelRow.id]);
  useEffect(() => { if (urlRow) setUrlVal(urlRow.value); }, [urlRow?.id]);

  const labelDirty = labelVal !== labelRow.value;
  const urlDirty = urlRow ? urlVal !== urlRow.value : false;
  const dirty = labelDirty || urlDirty;

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    try {
      if (labelDirty) await onSave(labelRow.id, labelVal);
      if (urlRow && urlDirty) await onSave(urlRow.id, urlVal);
      setFlash(true);
      onSaved();
      setTimeout(() => setFlash(false), 1500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-border/30 p-3 space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground truncate flex-1">
          {labelRow.label || labelRow.key}
        </p>
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
      <div className="space-y-1">
        <p className="text-[10px] text-muted-foreground/50">Display text</p>
        <input
          type="text"
          value={labelVal}
          onChange={e => setLabelVal(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Escape') setLabelVal(labelRow.value);
            if (e.key === 'Enter') { e.preventDefault(); save(); }
          }}
          className="w-full rounded border border-border bg-background px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-9"
        />
      </div>
      {urlRow && (
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground/50">Page</p>
          <select
            value={urlVal}
            onChange={e => setUrlVal(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-9"
          >
            {ROUTE_OPTIONS.map(opt => (
              <option key={opt.path} value={opt.path}>{opt.label} — {opt.path}</option>
            ))}
          </select>
        </div>
      )}
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
  brochure_url: 14, sample_report_url: 14,
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
  'footer/nav': [
    'label_quicklinks',
    'link_ai_analyzer', 'link_ai_analyzer_url',
    'link_dm03', 'link_dm03_url',
    'link_blood', 'link_blood_url',
    'link_urine', 'link_urine_url',
    'link_feces', 'link_feces_url',
    'link_fluid', 'link_fluid_url',
    'link_exotic', 'link_exotic_url',
    'label_company',
    'link_about', 'link_about_url',
    'link_news', 'link_news_url',
    'link_resources', 'link_resources_url',
    'link_contact', 'link_contact_url',
    'label_contact',
  ],
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
  home:          ['seo', 'hero', 'why_us', 'products', 'certifications', 'partners', 'cta'],
  blood:         ['seo', 'hero', 'overview', 'classification', 'categories', 'how_it_works', 'clinical_images', 'faq', 'cta'],
  feces:         ['seo', 'hero', 'overview', 'classification', 'categories', 'direct_sampling', 'flotation', 'clinical_images', 'faq', 'cta'],
  urine:         ['seo', 'hero', 'overview', 'classification', 'categories', 'how_it_works', 'clinical_images', 'faq', 'cta'],
  exotic:        ['seo', 'hero', 'overview', 'species', 'species_table', 'low_volume', 'faq', 'cta'],
  pleural:       ['seo', 'hero', 'overview', 'classification', 'clinical_images', 'faq', 'cta'],
  'ai-analyzer': ['seo', 'hero', 'overview', 'capabilities', 'workflow', 'faq', 'cta'],
  'dm-03':       ['seo', 'hero', 'overview', 'sample_types', 'hardware', 'capabilities', 'image_hub', 'faq', 'cta'],
  about:         ['seo', 'hero', 'story', 'metrics', 'journey', 'principles', 'vision', 'values', 'global', 'cta'],
  contact:       ['seo', 'hero', 'form', 'social'],
  footer:        ['tagline', 'social', 'nav', 'address'],
  news:          ['seo', 'hero'],
  resources:     ['seo', 'hero'],
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
  onAddYear?: () => Promise<void>;
  onDeleteYear?: (n: number) => Promise<void>;
};

const PageEditor = ({ page, rows, onSave, onSaved, onAddYear, onDeleteYear }: PageEditorProps) => {
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
                {(page === 'footer' && section === 'nav')
                  ? (() => {
                      const QUICK_LINK_KEYS = ['link_ai_analyzer', 'link_dm03', 'link_blood', 'link_urine', 'link_feces', 'link_fluid', 'link_exotic'];
                      const COMPANY_LINK_KEYS = ['link_about', 'link_news', 'link_resources', 'link_contact'];
                      const headerRows = sortedRows.filter(r => ['label_quicklinks', 'label_company', 'label_contact'].includes(r.key));
                      const renderLinkGroup = (keys: string[], title: string) => (
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider pt-1">{title}</p>
                          {keys.map(key => {
                            const lr = sortedRows.find(r => r.key === key);
                            const ur = sortedRows.find(r => r.key === `${key}_url`) ?? null;
                            if (!lr) return null;
                            return <NavLinkPairEditor key={key} labelRow={lr} urlRow={ur} onSave={onSave} onSaved={onSaved} />;
                          })}
                        </div>
                      );
                      return (
                        <>
                          {headerRows.filter(r => r.key === 'label_quicklinks').map(row => (
                            <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                          ))}
                          {renderLinkGroup(QUICK_LINK_KEYS, 'Quick Links')}
                          {headerRows.filter(r => r.key === 'label_company').map(row => (
                            <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                          ))}
                          {renderLinkGroup(COMPANY_LINK_KEYS, 'Company Links')}
                          {headerRows.filter(r => r.key === 'label_contact').map(row => (
                            <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                          ))}
                        </>
                      );
                    })()
                  : (page === 'about' && section === 'journey' && (onAddYear || onDeleteYear))
                  ? (() => {
                      const isYearRow = (k: string) => /^year_\d+(_highlight|_items)?$/.test(k);
                      const headerRows = sortedRows.filter(r => !isYearRow(r.key));
                      const yearNums = [...new Set(
                        sortedRows
                          .map(r => r.key.match(/^year_(\d+)/))
                          .filter(Boolean)
                          .map(m => parseInt(m![1], 10))
                      )].sort((a, b) => a - b);
                      return (
                        <>
                          {headerRows.map(row => (
                            <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                          ))}
                          {yearNums.map(n => {
                            const yearRows = sortedRows.filter(r => r.key === `year_${n}` || r.key === `year_${n}_highlight` || r.key === `year_${n}_items`);
                            return (
                              <div key={n} className="rounded-lg border border-border/30 p-3 space-y-3">
                                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Year {n}</p>
                                {yearRows.map(row => (
                                  <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                                ))}
                                {onDeleteYear && (
                                  <button
                                    onClick={() => onDeleteYear(n)}
                                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/30 py-2 text-sm text-destructive/70 hover:bg-destructive/5 hover:border-destructive/50 transition-colors"
                                  >
                                    <X className="h-3.5 w-3.5" /> Delete Year {n}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          {onAddYear && (
                            <button
                              onClick={onAddYear}
                              className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors"
                            >
                              <Plus className="h-4 w-4" /> Add Year
                            </button>
                          )}
                        </>
                      );
                    })()
                  : sortedRows.map(row => (
                      <FieldEditor key={row.id} row={row} onSave={onSave} onSaved={onSaved} />
                    ))
                }
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
  const { rows, loading, updateContent, refetch } = usePageContent();
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

  const handleAddYear = async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token ?? '';
    const yearCountRow = rows.find(r => r.page === 'about' && r.section === 'journey' && r.key === 'year_count');
    const n = parseInt(yearCountRow?.value ?? '7', 10) + 1;
    await dbInsert('page_content', { page: 'about', section: 'journey', key: `year_${n}`, label: `Year ${n}`, value: '', type: 'text' }, token);
    await dbInsert('page_content', { page: 'about', section: 'journey', key: `year_${n}_highlight`, label: `Year ${n} Highlight`, value: '', type: 'text' }, token);
    await dbInsert('page_content', { page: 'about', section: 'journey', key: `year_${n}_items`, label: `Year ${n} Milestones (one per line)`, value: '', type: 'textarea' }, token);
    if (yearCountRow) await updateContent(yearCountRow.id, String(n));
    await refetch();
    setIframeKey(k => k + 1);
  };

  const handleDeleteYear = async (n: number) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token ?? '';
    const journeyRows = rows.filter(r => r.page === 'about' && r.section === 'journey');
    const yearCountRow = journeyRows.find(r => r.key === 'year_count');
    const yearCount = parseInt(yearCountRow?.value ?? '0', 10);
    if (yearCount < 1) return;

    // Shift all years after n down by one
    for (let i = n; i < yearCount; i++) {
      const src = (k: string) => journeyRows.find(r => r.key === `year_${i + 1}${k}`);
      const dst = (k: string) => journeyRows.find(r => r.key === `year_${i}${k}`);
      for (const suffix of ['', '_highlight', '_items']) {
        const srcRow = src(suffix);
        const dstRow = dst(suffix);
        if (srcRow && dstRow) await updateContent(dstRow.id, srcRow.value);
      }
    }

    // Delete the last year's rows
    for (const suffix of ['', '_highlight', '_items']) {
      const row = journeyRows.find(r => r.key === `year_${yearCount}${suffix}`);
      if (row) await dbDelete('page_content', row.id, token);
    }

    // Decrement year_count
    if (yearCountRow) await updateContent(yearCountRow.id, String(yearCount - 1));

    await refetch();
    setIframeKey(k => k + 1);
  };

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
          <PageEditor page={selectedPage} rows={pageRows} onSave={handleSave} onSaved={handleSaved} onAddYear={selectedPage === 'about' ? handleAddYear : undefined} onDeleteYear={selectedPage === 'about' ? handleDeleteYear : undefined} />
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
