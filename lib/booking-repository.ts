import { Redis } from "@upstash/redis";
import type { BookingRecord, BookingStatus } from "@/types/booking";

const memory = new Map<string, BookingRecord>();

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

function bookingKey(id: string) {
  return `booking:${id}`;
}

export async function saveBooking(record: BookingRecord): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(bookingKey(record.id), JSON.stringify(record));
    return;
  }
  memory.set(record.id, record);
}

export async function getBooking(id: string): Promise<BookingRecord | null> {
  const redis = getRedis();
  if (redis) {
    const raw = await redis.get<string>(bookingKey(id));
    if (!raw) return null;
    if (typeof raw === "string") {
      return JSON.parse(raw) as BookingRecord;
    }
    return raw as unknown as BookingRecord;
  }
  return memory.get(id) ?? null;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<boolean> {
  const existing = await getBooking(id);
  if (!existing) return false;
  const next: BookingRecord = { ...existing, status };
  await saveBooking(next);
  return true;
}
