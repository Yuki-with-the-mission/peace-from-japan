import "server-only";
import path from "node:path";
import fs from "node:fs/promises";
import { Snapshot } from "../types";

const SNAPSHOT_DIR = path.join(process.cwd(), "data", "snapshots");

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function isDateFile(name: string) {
  // 例: 2025-08-17.json
  return /^\d{4}-\d{2}-\d{2}\.json$/.test(name);
}

function dateFromFilename(name: string) {
  // "2025-08-17.json" -> "2025-08-17"
  return name.replace(".json", "");
}

/** 指定日のスナップショットを読む（存在しなければ null） */
export async function getSnapshotByDate(dateISO: string): Promise<Snapshot | null> {
  const file = path.join(SNAPSHOT_DIR, `${dateISO}.json`);
  try {
    return await readJson<Snapshot>(file);
  } catch {
    return null;
  }
}

/** 最も新しい（＝日付が最大の）スナップショットを読む（無ければ null） */
export async function getLatestAvailableSnapshot(): Promise<Snapshot | null> {
  try {
    const entries = await fs.readdir(SNAPSHOT_DIR);
    const files = entries.filter(isDateFile);
    if (files.length === 0) return null;

    // 日付降順に並べ替え（最新が先頭）
    files.sort((a, b) => (dateFromFilename(a) > dateFromFilename(b) ? -1 : 1));
    const latest = files[0];
    return await readJson<Snapshot>(path.join(SNAPSHOT_DIR, latest));
  } catch {
    return null;
  }
}

/** 今日があれば今日、なければ最新にフォールバック（最終的に null 可） */
export async function getSnapshotPreferToday(): Promise<Snapshot | null> {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const todaySnap = await getSnapshotByDate(today);
  if (todaySnap) return todaySnap;
  return getLatestAvailableSnapshot();
}
