import { useSearchParams } from "react-router-dom";
import ClientLayout from "@/components/layouts/ClientLayout";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const gigId = params.get("gigId");

  return (
    <ClientLayout>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">✅ Payment Successful!</h1>
        <p className="text-lg">Thank you for purchasing the gig.</p>
        <p className="text-sm mt-2">Gig ID: {gigId}</p>
      </div>
    </ClientLayout>
  );
};

export default PaymentSuccess;
