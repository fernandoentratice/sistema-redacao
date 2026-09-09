export type ExtraCreditPaymentCardLifecycleAction = "keep" | "deactivate";

const DEFINITIVE_CARD_FAILURE_STATUSES = new Set([
  "failed",
  "canceled",
  "cancelled",
  "not_authorized",
  "refused",
  "past_due",
  "unpaid",
]);

export function isDefinitiveCardPaymentFailureStatus(status: string | null | undefined) {
  return Boolean(status && DEFINITIVE_CARD_FAILURE_STATUSES.has(status.toLowerCase()));
}

export function isDefinitivePagarmeHttpFailure(status: number) {
  return status >= 400 && status < 500 && ![408, 409, 425, 429].includes(status);
}

export function getExtraCreditPaymentCardLifecycleAction({
  createdLocally,
  status,
}: {
  createdLocally: boolean;
  status: "paid" | "pending" | "failed";
}): ExtraCreditPaymentCardLifecycleAction {
  if (status === "failed" && createdLocally) {
    return "deactivate";
  }

  return "keep";
}

export function isCheckoutPaymentCardConfirmed({
  expectedSubscriptionId,
  actualSubscriptionId,
  subscriptionStatus,
  expectedCardId,
  actualCardId,
}: {
  expectedSubscriptionId: string;
  actualSubscriptionId: string;
  subscriptionStatus: string;
  expectedCardId: string;
  actualCardId: string | null | undefined;
}) {
  return (
    actualSubscriptionId === expectedSubscriptionId &&
    subscriptionStatus === "active" &&
    actualCardId === expectedCardId
  );
}
