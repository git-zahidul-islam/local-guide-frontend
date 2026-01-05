"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentService } from "@/services/payment/payment.service";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const checkPayment = async () => {
      try {
        const result = await paymentService.checkPaymentStatus(sessionId);

        if (result?.success === "true") {
          router.replace("/dashboard/tourist/my-trips");
        } else {
          setError("Payment verification failed");
        }
      } catch (error) {
        console.error("Payment check failed:", error);
        setError("Payment verification failed. Please contact support.");
      }
    };

    checkPayment();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md rounded-2xl bg-secondary shadow-lg p-6 text-center animate-fade-in">
        {error ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
              ❌
            </div>

            <h1 className="text-xl font-semibold text-red-600">
              Payment Failed
            </h1>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {error}
            </p>

            <button
              onClick={() => router.push("/dashboard/tourist/my-trips")}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
              Go to My Trips
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              🎉
            </div>

            <h1 className="text-xl font-semibold text-green-600">
              Payment Successful
            </h1>

            <p className="mt-2 text-sm text-secondary-foreground">
              Verifying your payment, please wait…
            </p>

            <div className="mt-6 flex justify-center">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
