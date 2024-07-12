export default function CashPayment() {
  return (
    <div>
      <p className="text-grayFont font-medium">
        Pay with cash at the company counter.
      </p>
        <div>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="cursor-pointer"
            required
          />
          <label
            htmlFor="terms"
            className="text-sm text-grayFont ml-2 cursor-pointer"
          >
            I have read and agree to the Terms and Conditions
          </label>
        </div>
    </div>
  );
}
