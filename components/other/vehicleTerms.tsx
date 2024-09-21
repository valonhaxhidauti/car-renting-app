"use client";

import { useTranslations } from "next-intl";

export default function VehicleTerms() {
    const t = useTranslations("RentalTerms");
    const paragraphs = [
        t.rich("content.paragraph1",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>}),
        t.rich("content.paragraph2",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>}),
    ];

    return (
        <>
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-grayFont">
                    {paragraph}
                </p>
            ))}
            <br/>
            <p className="text-grayFont">{t.rich("content.deposit", {
                br: () => <br/>,
                bold: (chunks) => <strong>{chunks}</strong>
            })}</p>
            <br/>
            <p className="text-grayFont">{t.rich("content.deductible", {
                br: () => <br/>,
                bold: (chunks) => <strong>{chunks}</strong>
            })}</p>
            <br/>
            <ul className="text-grayFont list-disc list-inside">
                <li>{t.rich("content.agreement1", {br: () => <br/>, bold: (chunks) => <strong>{chunks}</strong>})}</li>
                <li>{t.rich("content.agreement2", {br: () => <br/>, bold: (chunks) => <strong>{chunks}</strong>})}</li>
                <li>{t.rich("content.agreement3", {br: () => <br/>, bold: (chunks) => <strong>{chunks}</strong>})}</li>
                <li>{t.rich("content.agreement4", {br: () => <br/>, bold: (chunks) => <strong>{chunks}</strong>})}</li>
            </ul>
            <br/>
            <p className="text-grayFont">{t.rich("content.jurisdiction", {
                br: () => <br/>,
                bold: (chunks) => <strong>{chunks}</strong>
            })}</p>

        </>
    );
}
