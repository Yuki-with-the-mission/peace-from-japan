export type SourceRef = { name: string; url: string };

export type Snapshot = {
  dateISO: string; // YYYY-MM-DD
  headline: string;
  lede: string;
  keyFacts: { text: string; source: SourceRef }[];
  contextNotes?: string[];
  media?: { caption?: string; credit?: string; url?: string };
};