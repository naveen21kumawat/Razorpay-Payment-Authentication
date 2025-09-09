import { useEffect } from "react";

const SimplePayment = () => {
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, []);

  // Payment Success Handler
  const handlePaymentSuccess = (response) => {
    console.log("🎉 ===== PAYMENT SUCCESS ===== 🎉");
    
    // Complete Payment Response Data
    console.log("📋 Complete Payment Response:", response);
    console.log("💳 Payment ID:", response.razorpay_payment_id);
    console.log("📦 Order ID:", response.razorpay_order_id);
    console.log("🔐 Signature:", response.razorpay_signature);
    
    // User Data
    const userData = {
      name: "Test User",
      email: "test@example.com",
      contact: "9999999999",
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform
    };
    console.log("👤 User Data:", userData);
    
    // Payment Details
    const paymentDetails = {
      amount: 10,
      currency: "INR",
      method: response.razorpay_payment_method || "Unknown",
      status: "SUCCESS",
      transactionTime: new Date().toISOString(),
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      signature: response.razorpay_signature
    };
    console.log("💰 Payment Details:", paymentDetails);
    
    // Complete Transaction Record
    const transactionRecord = {
      user: userData,
      payment: paymentDetails,
      response: response,
      sessionId: Date.now(),
      browserInfo: {
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      }
    };
    console.log("📊 Complete Transaction Record:", transactionRecord);
    
    alert("✅ Payment Successful! Check console for complete data.");
  };

  // Payment Failure Handler
  const handlePaymentFailure = (response) => {
    console.log("❌ ===== PAYMENT FAILED ===== ❌");
    
    // Complete Error Response
    console.log("🚨 Complete Error Response:", response);
    console.log("❌ Error Code:", response.error.code);
    console.log("📝 Error Description:", response.error.description);
    console.log("🔍 Error Source:", response.error.source);
    console.log("📋 Error Step:", response.error.step);
    console.log("💳 Payment Method:", response.error.metadata?.payment_id || "N/A");
    
    // User Data at Failure
    const userData = {
      name: "Test User",
      email: "test@example.com",
      contact: "9999999999",
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform
    };
    console.log("👤 User Data at Failure:", userData);
    
    // Failure Details
    const failureDetails = {
      amount: 8979870,
      currency: "INR",
      status: "FAILED",
      errorCode: response.error.code,
      errorDescription: response.error.description,
      errorSource: response.error.source,
      errorStep: response.error.step,
      failureTime: new Date().toISOString(),
      orderId: response.error.metadata?.order_id || "N/A"
    };
    console.log("💔 Failure Details:", failureDetails);
    
    // Complete Failure Record
    const failureRecord = {
      user: userData,
      failure: failureDetails,
      errorResponse: response,
      sessionId: Date.now(),
      browserInfo: {
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      }
    };
    console.log("📊 Complete Failure Record:", failureRecord);
    
    alert("❌ Payment Failed! Check console for complete error data.");
  };

  const handlePayment = () => {
    console.log("🚀 ===== INITIATING PAYMENT ===== 🚀");
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    //   key: "rzp_test_gWqq3BZQw957fl",
      amount: 100, // Amount in paise
      currency: "INR",
      name: "Test Course Payment",
      description: "Complete Payment Test with Full Data Logging",
      handler: handlePaymentSuccess,
      prefill: {
        name: "Naveen",
        email: "naveen@example.com",
        contact: "9988687574"
      },
      theme: { color: "#8b5cf6" },
      modal: {
        ondismiss: function() {
          console.log("⚠️ ===== PAYMENT CANCELLED ===== ⚠️");
          console.log("User cancelled the payment");
          console.log("Cancellation Time:", new Date().toISOString());
        }
      }
    };

    console.log("⚙️ Payment Configuration:", options);
    
    const rzp = new window.Razorpay(options);
    
    // Add failure event listener
    rzp.on('payment.failed', handlePaymentFailure);
    
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Simple Payment Test</h1>
        <p className="text-gray-600 mb-6">Click to test payment (₹1)</p>
        <button 
          onClick={handlePayment}
          className="bg-purple-600 hover:bg-purple-700 text-cyan-900 font-bold py-3 px-6 rounded-lg w-full"
        >
          Pay ₹1
        </button>
        <p className="text-sm text-gray-500 mt-4">Check browser console for payment details</p>
      </div>
    </div>
  );
};

export default SimplePayment;
