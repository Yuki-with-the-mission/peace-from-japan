export type SnapshotKind = "fact" | "opinion";

export type SnapshotItem = {
  kind: SnapshotKind;
  text: string;
  date?: string;
  source?: string;
  url?: string;
};

export type ReactionItem = {
  region: string;
  text: string;
};

export type HomeData = {
  snapshotUpdated: string;
  snapshot: SnapshotItem[];
  reactions: ReactionItem[];
};
