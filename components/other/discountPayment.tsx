
export default function DiscountPayment() {
  return (
    <div className="flex flex-col gap-4 w-full bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">Discount Code</h1>
      <p className="text-grayFont text-sm">
        Pay less by entering a discount code!
      </p>
      <form className="flex flex-col mobile:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Please enter the discount code"
          className="border border-zinc-300 p-3 w-full mobile:w-2/3 rounded-sm leading-none"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-secondary transition text-white py-3 w-full mobile:w-40"
        >
          Check Code
        </button>
      </form>
    </div>
  );
}
