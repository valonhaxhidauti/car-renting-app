import React, {forwardRef, useImperativeHandle, useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Checkbox} from "../ui/checkbox";
import {Label} from "../ui/label";
import {Link} from "next-view-transitions";
import {useTranslations} from "next-intl";
import {PaymentMethod} from "@stripe/stripe-js";

// Define and export the interface for the ref
export interface CreditCardPaymentRef {
    createPaymentMethod: () => Promise<PaymentMethod | null>;
}

const CreditCardPayment = forwardRef<CreditCardPaymentRef>(({}, ref) => {
    const t = useTranslations("vehiclePayment.payment");
    const stripe = useStripe();
    const elements = useElements();

    const [cardOwner, setCardOwner] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Expose createPaymentMethod to parent via ref
    useImperativeHandle(ref, () => ({
        createPaymentMethod,
    }));

    async function createPaymentMethod() {
        if (!stripe || !elements) {
            return null; // Stripe.js has not loaded yet
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement!,
                billing_details: {
                    name: cardOwner, // Include cardholder name
                },
            });

            if (error) {
                return null;
            }

            return paymentMethod;
        } catch (error: any) {
            setErrorMessage(error.message || "Payment failed");
            return null;
        }
    }

    return (
        <>
            <h1 className="text-grayFont font-bold">{t("creditCardInfoTitle")}</h1>
            <div className="flex flex-col w-full mobile:w-auto">
                <Label
                    className="block text-sm font-medium leading-6 text-grayFont"
                    htmlFor="cardOwner"
                >
                    {t("cardOwnerLabel")}
                </Label>
                <input
                    type="text"
                    id="cardOwner"
                    name="cardOwner"
                    value={cardOwner}
                    onChange={(e) => setCardOwner(e.target.value)}
                    className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                    required
                />
            </div>

            <div className="flex flex-col w-full mobile:w-auto mt-4">
                <Label
                    className="block text-sm font-medium leading-6 text-grayFont"
                    htmlFor="cardDetails"
                >
                    {t("cardNumberLabel")}
                </Label>
                <div className="block mt-2 w-full border-borderForm border rounded-sm p-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#32325d",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#fa755a",
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col mt-8">
                <div className="flex items-center">
                    <Checkbox id="terms" className="mr-2" required/>
                    <Label
                        htmlFor="terms"
                        className="text-sm text-grayFont cursor-pointer"
                    >
                        {t("termsLabel")}
                    </Label>
                </div>
                <Link href="/terms" className="ml-6 text-blue-500 underline text-sm">
                    {t("readTerms")}
                </Link>
            </div>
        </>
    );
});

// Set displayName for better debugging
CreditCardPayment.displayName = "CreditCardPayment";

export default CreditCardPayment;
