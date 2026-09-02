"use client";

import { cn } from "@/lib/utils";
import type { CartGiftOptions } from "@/lib/types";

const MESSAGE_LIMIT = 200;

export function GiftFields({
  value,
  onChange,
}: {
  value: CartGiftOptions;
  onChange: (next: CartGiftOptions) => void;
}) {
  const overLimit = value.giftMessage.length > MESSAGE_LIMIT;

  return (
    <div className="rounded-card border border-border bg-paper p-5">
      <label className="flex items-center gap-3 text-sm font-medium text-ink">
        <input
          type="checkbox"
          checked={value.isGift}
          onChange={(e) =>
            onChange({
              ...value,
              isGift: e.target.checked,
              giftMessage: e.target.checked ? value.giftMessage : "",
              giftReceipt: e.target.checked ? value.giftReceipt : false,
            })
          }
          className="h-4 w-4 rounded border-border-strong accent-ink"
        />
        This is a gift
      </label>

      {value.isGift ? (
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="gift-message" className="text-sm font-medium text-ink">
              Gift message <span className="font-normal text-ink-50">(optional)</span>
            </label>
            <textarea
              id="gift-message"
              rows={3}
              maxLength={MESSAGE_LIMIT + 40}
              value={value.giftMessage}
              onChange={(e) => onChange({ ...value, giftMessage: e.target.value })}
              placeholder="e.g. Happy birthday — hope this one keeps you up too late reading."
              aria-invalid={overLimit}
              aria-describedby="gift-message-count"
              className={cn(
                "mt-2 w-full rounded-control border bg-paper p-3 text-sm text-ink placeholder:text-ink-50 focus-visible:border-ink",
                overLimit ? "border-error" : "border-border-strong",
              )}
            />
            <p
              id="gift-message-count"
              className={cn("mt-1 text-xs", overLimit ? "text-error" : "text-ink-50")}
              aria-live="polite"
            >
              {overLimit
                ? `${value.giftMessage.length - MESSAGE_LIMIT} characters over the limit`
                : `${value.giftMessage.length}/${MESSAGE_LIMIT}`}
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={value.giftReceipt}
              onChange={(e) => onChange({ ...value, giftReceipt: e.target.checked })}
              className="h-4 w-4 rounded border-border-strong accent-ink"
            />
            Include a gift receipt (no prices shown)
          </label>
        </div>
      ) : null}
    </div>
  );
}
