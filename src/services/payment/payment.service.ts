export interface PaymentResponse {
  data: {
    checkoutUrl: string;
    sessionId: string;
  },
  success: boolean,
  message: string,
  statusCode: number,
}

export const paymentService = {
  // Create payment session - CLIENT SIDE
  async createPayment(bookingId: string) : Promise<PaymentResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/booking/${bookingId}/create-payment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create payment session");
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment");
      }
      // 
      return {
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: {
          checkoutUrl: data.data.paymentUrl,
          sessionId: data.data.sessionId,
        },
      };
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error
    }
  },

  // Check payment status
  async checkPaymentStatus(
    sessionId: string
  ): Promise<{ success: string; }> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/confirm`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ sessionId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check payment status");
      }

      const data = await response.json();
      return { success: data.success ? "true" : "false" };
    } catch (error) {
      console.error("Error checking payment status:", error);
      return { success: "error" };
    }
  },
};
