"use client";

import {useTranslations} from "next-intl";
import {Breadcrumbs, HeadingTitle} from "../common/headingParts";
import ScrollToTop from "../common/scrollToTop";
import SideMenu from "../common/sideMenu";

interface Section {
    title: string | null;
    content: string | null;
    subsections?: Subsection[]; // Optional, as not all sections have subsections
}

interface Subsection {
    title: string | null; // Nullable, as some subsections may not have a title
    content: string | null;
}


export default function RentalTerms() {
    const t = useTranslations("RentalTerms");

    const locale = useTranslations()("Locale");
    const sectionsEn = [
        {
            "title": "Beginning and end of the agreement",
            "content": "The hire vehicle or rental vehicle contract lasts from the time of vehicle handover until the contractually agreed time of vehicle return."
        },
        {
            "title": "Vehicle takeover",
            "content": "The lessor or lender (ABAG-Rent) shall hand over the vehicle with a full tank of petrol,\nclean, checked, free of defects and with the required documents. With the handover of the\nthe vehicle by the garage or its representative, the payment of the agreed deposit by the renter\nby the renter or borrower (hereinafter referred to as the customer) is due immediately. Complaints\nthe vehicle or its accessories on the part of the customer must be reported to ABAG-Rent\nimmediately upon takeover."
        },
        {
            "title": "Return of the vehicle",
            "content": "The vehicle and its accessories must be returned to the return station specified in the contract at the time specified in the contract, with a full tank of petrol and in a clean condition. In the event of delay, the customer must compensate for any damage incurred as a result and is also liable for accidental damage in addition to the general liability rules. If the customer does not return the vehicle with a full tank, he must pay the costs for the fuel and refuelling service. If the vehicle is returned uncleaned, the necessary work will be carried out at the customer's expense. Any defects and damage must be reported to ABAG-Rent when the vehicle is returned. The vehicle can only be returned within the regular opening hours of the garage and directly to ABAG-Rent or its representative. The mere parking of the vehicle at ABAG-Rent's premises or the mere parking of the vehicle outside of opening hours by leaving the keys with ABAG-Rent shall not constitute a return and shall not release the customer."
        },
        {
            "title": "Extension of the contract term",
            "content": "An extension of the contract term is only possible with the written consent of ABAG-Rent before 1 day before the end of the current contract term. If payment of the requested extension is not made within one day. ABAG-Rent reserves the right to charge a reminder fee of CHF 50.00 in addition to the total amount. If payment is not made within the third day including the CHF 50. A further reminder fee of CHF 50 will be charged. In the event of a further delay in the total payment, ABAG-Rent shall be authorised to confiscate the vehicle immediately and to charge the expenses associated with this measure as follows:",
            "subsections": [
                {
                    "title": null,
                    "content": "Lump sum of 600."
                },
                {
                    "title": null,
                    "content": "Expenses incurred in connection with the collection or securing of the vehicle - including the use of specialised external service providers"
                },
                {
                    "title": null,
                    "content": "ABAG-Rent may refuse the extension without giving reasons. If an extension of the contract period is agreed, all conditions of the original contract shall continue to apply, unless otherwise agreed in writing."
                }
            ]
        },
        {
            "title": "Premature return of the rental object",
            "content": "Early return within the scope of the rental agreement does not entitle the tenant to any reductions or refunds."
        },
        {
            "title": "Late return",
            "content": null,
            "subsections": [
                {
                    "title": "Of the rental object:",
                    "content": "The hire charge is calculated per hire day. In the absence of any other agreement in the contract, one rental day corresponds to 24 hours. In the event of late return of more than 30 minutes, an additional rental day will be charged for each 24 hours or part thereof."
                },
                {
                    "title": "Of the rental item:",
                    "content": "If the return of the rented vehicle is delayed by more than 30 minutes per 24 hours or part thereof, the borrower shall owe the lender the daily rental rate per day of delay in addition to any damages incurred as a result of the delay."
                }
            ]
        },
        {
            "title": "Repairs",
            "content": "Defects that the customer does not have to rectify himself must be reported to ABAG-Rent\nimmediately and follow its instructions regarding the rectification of defects. For\nexpenses in connection with defects must be authorised in advance by ABAG-Rent. Expenses incurred in the context of a cost approval shall be reimbursed to the customer upon return of the vehicle upon presentation of the corresponding receipts."
        },
        {
            "title": "Behaviour in the event of accidents and special events",
            "content": "In the event of incidents such as accidents, theft (burglary/theft/embezzlement, etc.), loss, fire, damage caused by wild animals or other damage, the customer must inform the police immediately and have a police report drawn up. This also applies to accidents caused by the customer without the involvement of third parties. Opposing claims may not be recognised. In any case, ABAG-Rent must always be informed immediately. The customer must immediately prepare a detailed written report, including a sketch, for all the events mentioned, even in the case of minor damage.\nIn the event of an accident, the report must include in particular the names and addresses of the\npersons involved and any witnesses as well as the licence plate numbers of the vehicles involved.\nIn the event of theft, the remaining vehicle keys, a report on the circumstances of the theft and the police report must be submitted to ABAG-Rent within 24 hours."
        },
        {
            "title": "Prohibited uses / entry restrictions / exit restrictions",
            "content": "The customer is prohibited from using the vehicle:",
            "subsections": [
                {
                    "title": null,
                    "content": "To participate in motorsport events, vehicle tests and for driving instruction."
                },
                {
                    "title": null,
                    "content": "For the transport of goods or persons for a fee."
                },
                {
                    "title": null,
                    "content": "To tow, haul or otherwise move another vehicle, provided that the rented vehicle is not a vehicle intended for this purpose."
                },
                {
                    "title": null,
                    "content": "In an overloaded condition, i.e. with a number of persons or a payload that exceeds the values specified in the specified in the vehicle licence."
                },
                {
                    "title": null,
                    "content": "For the transport of flammable, explosive, toxic or otherwise dangerous substances, no narcotics of any kind."
                },
                {
                    "title": null,
                    "content": "To commit customs offences and other criminal offences, even if these are only punishable under the law of the place where the offence was committed."
                },
                {
                    "title": null,
                    "content": "Trips abroad must be clarified with ABAG-Rent."
                }
            ]
        },
        {
            "title": "Liability of the customer",
            "content": null,
            "subsections": [
                {
                    "title": null,
                    "content": "The customer shall be liable for all damages incurred by ABAG-Rent as a result of unlawful or careless behaviour of the customer or its auxiliary persons, regardless of whether the customer is at fault."
                },
                {
                    "title": null,
                    "content": "Furthermore, the customer shall be liable for all defects or damage to the vehicle for which he is responsible. This includes, but is not limited to, damage caused by: refuelling with the wrong fuel, failure to observe the maximum heights for garage entrances, subways, etc.; improper use of the vehicle. improper use of snow chains, ski racks, careless loading of ski racks, careless handling of the vehicle interior (in particular cigarette holes, tears and stains on upholstery and carpets), off-road driving and generally careless handling (in particular damage to the underbody such as steering, gearbox, suspension, suspension damage and damage to axle parts, sills, oil pan, exhaust system, shielding plates and covers), incorrect manipulation of the vehicle (mechanical damage to the clutch, gearbox, suspension, etc., which is not covered by the garage's warranty), incorrect handling of convertible tops (in particular failure to close the top in rain, wind, etc.)."
                },
                {
                    "title": null,
                    "content": " The scope of liability includes the repair costs or, in the event of a total loss, the value of the vehicle as well as further damage, such as towing costs, costs of an expert opinion, depreciation of the rental property, lost rental income, legal fees, administration fees."
                },
                {
                    "title": null,
                    "content": " If fines or penalties are incurred in connection with the use of the vehicle for which ABAG-Rent is held liable, the customer shall pay the corresponding amount plus administration fees to ABAG-Rent. The corresponding amount plus the garage's administration fees. In the case of fines, the administration costs shall amount to CHF 50, with the exception of fines and penalties incurred due to the fault of the garage. In the event of offences against the Road Traffic Act in Switzerland and abroad, the customer authorises the garage to disclose the contract data to all official agencies (police, lawyers, road traffic authorities, etc.) in Switzerland and abroad."
                },
                {
                    "title": null,
                    "content": "If cover is agreed in accordance with the principles of fully comprehensive cover, the scope of the customer's liability shall be reduced to the excess agreed in the contract. This exemption from liability shall not apply to the damage listed under clause 11b, provided that there is no cover for the damage incurred by ABAG-Rent in the specific case. The exemption from liability also does not apply to damage caused by use by an unauthorised driver or for a prohibited purpose, in the event of a hit-and-run accident by the customer and in the event of damage caused intentionally or through gross negligence in accordance with the SVG, in particular due to fatigue, alcohol or drug-induced driving incapacity and in the event of damage caused by the load."
                },
                {
                    "title": null,
                    "content": "Any exemption of the customer from liability by ABAG-Rent is otherwise only valid if it is made in writing."
                }
            ]
        },
        {
            "title": "Liability of the company",
            "content": "ABAG-Rent shall not be liable to the customer or third parties for any\naccidental damage that occurs during the term of the contract. The garage shall also not be liable for\ndamage that the customer may suffer as a result of any defect in the vehicle that prevents\nwhich prevents onward travel, causes loss of time or other consequential damage."
        },
        {
            "title": "Invoices",
            "content": null,
            "subsections": [
                {
                    "title": null,
                    "content": "Invoices must be paid within 30 days."
                },
                {
                    "title": "Default:",
                    "content": "ABAG Rent is entitled to charge a reminder fee of CHF 15 in the event of late payment. In the event of a second delay in payment, the customer will be reminded again and charged a reminder fee of CHF 30. In the event of a third default in payment, the customer will be pursued without further notice."
                }
            ]
        },
        {
            "title": "Supplementary provisions",
            "content": "The Swiss Code of Obligations shall apply in addition to these provisions."
        },
        {
            "title": "Place of jurisdiction",
            "content": "In the absence of any mandatory legal provisions to the contrary, the parties agree that the ordinary courts at the registered office or domicile of ABAG-Rent shall have jurisdiction. The garage shall be free to bring an action before the ordinary courts at the customer's domicile or place of residence instead."
        }
    ];
    const sectionsDe = [
        {
            "title": "Beginn und Ende der Vereinbarung",
            "content": "Der Mietfahrzeug- resp. Leihfahrzeugvertrag dauert vom Zeitpunkt der Fahrzeugübernahme bis zum vertraglich vereinbarten Zeitpunkt der Fahrzeugrückgabe."
        },
        {
            "title": "Fahrzeugübernahme",
            "content": "Der Vermieter resp. Verleiher (ABAG-Rent) übergibt das Fahrzeug mit vollem Tank,\n" +
                "sauber, geprüft, mängelfrei und mit den erforderlichen Dokumenten. Mit der Übergabe des\n" +
                "Fahrzeuges durch die Garage bzw. dessen Vertreter, wird die Leistung der vereinbarten Kaution\n" +
                "durch den Mieter resp. Entlehnter (nachstehend Kunde genannt) sofort fällig. Beanstandungen\n" +
                "seitens des Kunden am Fahrzeug bzw. dessen Zubehör muss dieser der ABAG-Rent\n" +
                "umgehend bei der Übernahme melden."
        },
        {
            "title": "Fahrzeugrückgabe",
            "content": "Das Fahrzeug mitsamt dessen Zubehör ist an der gemäss Vertrag zuständigen Rückgabestation zu der im Vertrag angegebenen Zeit in ordnungsgemässen Zustand vollgetankt und sauber zurückzugeben. Bei Verspätung hat der Kunde einen allfällig dadurch entstandenen Schaden zu ersetzen und neben den allgemeinen Haftungsregeln auch für Zufall zu haften. Gibt der Kunde das Fahrzeug nicht mit vollem Tank zurück, dann hat er die Kosten für den Kraftstoff sowie Betankungsservice zu bezahlen. Wird das Fahrzeug ungereinigt zurückzugeben, so werden dafür notwendige Tätigkeiten auf Rechnung des Kunden vorgenommen. Mit der Rückgabe des Fahrzeuges sind der ABAG-Rent allfällige Mängel und Schäden zu melden. Die Fahrzeugrückgabe kann nur innerhalb der ordentlichen Öffnungszeiten der Garage und unmittelbar gegenüber der ABAG-Rent bzw. deren Vertreter erfolgen. Das blosse Abstellen des Fahrzeuges bei der ABAG-Rent oder das blosse Abstellen ausserhalb der Öffnungszeiten unter Hinterlegung der Schlüssel zuhanden der ABAG-Rent stellen keine Rückgabe dar und befreien den Kunden nicht."
        },
        {
            "title": "Verlängerung der Vertragsdauer",
            "content": "Eine Verlängerung der Vertragsdauer ist nur mit schriftlicher Zustimmung der ABAG-Rent vor 1 Tag vor Beendigung der laufenden Vertragsdauer möglich. Erfolgt die Zahlung der gewünschten Verlängerung nicht innerhalb eines Tags. Behält sich die ABAG-Rent das Recht von einer Mahngebühr in Höhe von CHF 50.00 in Rechnung zu stellen, zusätzlich zum Gesamtbetrag. Wird die Zahlung innerhalb des dritten Tages inkl. den CHF 50 Franken nicht geleistet. So wird eine weitere Mahngebühr von CHF 50.- Franken in Rechnung gestellt. Bei einer weiteren Verspätung der Gesamtzahlung ist ABAG-Rent berechtigt das Fahrzeug umgehend einzuziehen und die mit dieser Massnahme verbunden Aufwendung wie folgt zu verrechnen:",
            "subsections": [
                {
                    "title": null,
                    "content": "Aufwandpauschale von 600.-"
                },
                {
                    "title": null,
                    "content": "Aufwendungen, die im Zusammenhang mit der Abholung bzw. Sicherstellung des Fahrzeuges stehen- u.a. Einsatz spezialisierter externer Dienstleister."
                },
                {
                    "title": null,
                    "content": "Die ABAG-Rent kann ohne Angaben von Gründen die Verlängerung verweigern. Soweit einer Verlängerung der Vertragsdauer zugestimmt wird, gelten alle Bedingung des ursprünglichen Vertrages weiter, sofern schriftlich nicht etwas anderes vereinbart wird."
                }
            ]
        },
        {
            "title": "Vorzeitige Rückgabe der Mietsache",
            "content": "Die vorzeitige Rückgabe im Rahmen des Mietvertrages berechtigt zu keinerlei Reduktionen oder Rückerstattungen."
        },
        {
            "title": "Verspätete Rückgabe",
            "content": null,
            "subsections": [
                {
                    "title": "der Mietsache:",
                    "content": "Der Mietpreis wird pro Miettag berechnet. Ein Miettag entspricht mangels anderer Vereinbarung im Vertrag 24 Stunden. Bei verspäteter Rückgabe von mehr als 30 Minuten wird pro angefangene 24 Stunden ein weiterer Miettag verrechnet."
                },
                {
                    "title": "der Leihsache:",
                    "content": "Bei Verspätung der Rückgabe des verliehenen Fahrzeuges von mehr als 30 Minuten pro angefangene 24 Stunden, schuldet der Entlehner dem Verleiher unabhängig eines durch die Verspätung entstandenen Schadens neben allfälligem Schadenersatz pro Tag der Verspätung den Tagesmietansatz."
                }
            ]
        },
        {
            "title": "Reparaturen",
            "content": "Mängel, die der Kunde nicht selber beseitigen muss, hat der Kunde der ABAG-Rent unverzüglich zu melden und deren Weisungen hinsichtlich Mangelbehebung zu befolgen. Für Aufwendungen im Zusammenhang mit Mängeln ist vorgängig eine Kostengutsprache der ABAG-Rent notwendig. Im Rahmen einer Kostengutsprache getätigte Auslagen werden dem Kunden bei Rückgabe des Fahrzeuges auf Vorlage der entsprechenden Quittungen erstattet."
        },
        {
            "title": "Verhalten bei Unfall und besonderen Ereignissen",
            "content": "Bei Ereignissen wie Unfall, Diebstahl (Einbruch-Diebstahl/Veruntreuung usw.), Verlust, Brand, Wild- oder sonstigem Schaden muss der Kunde sofort die Polizei verständigen und einen Polizeibericht erstellen lassen. Dies gilt auch bei selbstverschuldeten Unfällen ohne Mitwirkung Dritter. Gegnerische Ansprüche dürfen nicht anerkannt werden. In jedem Fall ist stets unverzüglich die ABAG-Rent zu informieren. Der Kunde hat bei allen erwähnten Ereignissen, selbst bei geringfügigen Schäden, unverzüglich einen ausführlichen schriftlichen Bericht unter Vorlage einer Skizze zu erstellen. Bei Unfall muss der Bericht insbesondere Namen und Anschrift der beteiligten Personen und etwaiger Zeugen sowie die amtlichen Kennzeichen der beteiligten Fahrzeuge enthalten. Bei Diebstahl sind die noch vorhandenen Fahrzeugschlüssel, ein Bericht über den Hergang des Diebstahls sowie der Polizeibericht innerhalb von 24 Stunden bei der ABAG-Rent einzureichen."
        },
        {
            "title": "Verbotene Nutzungen / Einreisebeschränkungen / Ausreisebeschränkungen",
            "content": "Dem Kunden ist untersagt, das Fahrzeug zu verwenden:",
            "subsections": [
                {
                    "title": null,
                    "content": "Zur Teilnahme an motorsportlichen Veranstaltungen, Fahrzeugtests und zur Fahrschulung."
                },
                {
                    "title": null,
                    "content": "Für den Transport von Waren oder Personen gegen Entgelt."
                },
                {
                    "title": null,
                    "content": "Um ein anderes Fahrzeug zu ziehen, zu schleppen oder anderweitig zu bewegen, sofern es sich beim Mietfahrzeug nicht um ein dafür vorgesehenes Fahrzeug handelt."
                },
                {
                    "title": null,
                    "content": "In überladenem Zustand, d.h. mit einer Personenzahl bzw. einer Nutzlast, welche die im Fahrzeugausweis angegebenen Werte übersteigt."
                },
                {
                    "title": null,
                    "content": "Zur Beförderung entzündlicher, explosiver, giftiger oder sonst gefährlicher Stoffe, keine Betäubungsmittel jeglicher Art."
                },
                {
                    "title": null,
                    "content": "Zur Begehung von Zollvergehen und sonstigen Straftaten, auch wenn diese nur nach dem Recht des Tatortes mit Strafe bedroht sind."
                },
                {
                    "title": null,
                    "content": "Auslandfahrten müssen mit der ABAG-Rent abgeklärt werden."
                }
            ]
        },
        {
            "title": "Haftung des Kunden",
            "content": null,
            "subsections": [
                {
                    "title": null,
                    "content": "Der Kunde haftet für alle Schäden, welche der ABAG-Rent durch gesetz- oder vertragswidriges oder unsorgfältiges Handeln des Kunden oder dessen Hilfspersonen entstehen unabhängig davon, ob ihn daran ein Verschulden trifft."
                },
                {
                    "title": null,
                    "content": "Weiter haftet der Kunde für alle Mängel bzw. Beschädigungen des Fahrzeuges, welche er zu verantworten hat. Dies umfasst namentlich, aber nicht ausschliesslich, Schäden, die entstehen: durch Betankung mit dem falschen Kraftstoff, Nichtbeachtung der Maximalhöhen bei Garageneinfahrten, Unterführungen u.ä.; bei unsachgemässem Gebrauch von Schneeketten, Skiträgern, unachtsamer Beladung von Skiträgern, unsorgfältiger Handhabung des Fahrzeuginnern (insbesondere Zigarettenlöcher, Risse und Flecken auf Polster und Teppichen), Fahrten abseits der Strasse und allgemein unvorsichtiger Handhabung (insbesondere Schäden am Unterboden wie Lenkung-, Getriebe-, Aufhängungs-, Federungsschäden sowie Schäden an Achsteilen, Schwelle, Ölwanne, Leitungen, Auspuffanlage, Abschirmblechen und Abdeckungen), falscher Manipulation des Fahrzeuges (mechanische Schäden an Kupplung, Getriebe, Aufhängung usw., welche von der Garage nicht in Garantie übernommen werden), falscher Handhabung von Cabriolet-Verdecken (insbesondere Nichtverschliessen des Verdecks bei Regen, Wind usw.)."
                },
                {
                    "title": null,
                    "content": "Der Umfang der Haftung beinhaltet die Reparaturkosten bzw. bei Totalschaden den Fahrzeugwert sowie den weiteren Schaden, wie beispielsweise Abschleppkosten, Kosten einer Expertise, Wertminderung des Mietobjekts, entgangene Mieteinnahmen, Anwaltskosten, Administrationsgebühren."
                },
                {
                    "title": null,
                    "content": "Soweit im Zusammenhang mit der Nutzung des Fahrzeuges Bussgelder oder Strafen anfallen, für welche die ABAG-Rent zur Verantwortung gezogen wird, hat der Kunde den entsprechenden Betrag zuzüglich Administrationsgebühren der Garage zu ersetzen. Bei Bussen, betragen die Administrationskosten CHF 50. Ausgenommen sind Bussgelder und Strafen, welche wegen Verschuldens der Garage anfallen. Bei Vergehen gegen das Strassenverkehrsgesetz im In- und Ausland ermächtigt der Kunde die Garage die Herausgabe der Vertragsdaten an alle behördlichen Amtsstellen (Polizei, Anwaltschaften, Strassenverkehrsämter usw.) in der Schweiz und im Ausland."
                },
                {
                    "title": null,
                    "content": "Wird eine Deckung nach den Grundsätzen des Vollkaskoschutzes vereinbart, reduziert sich der Umfang der Haftung des Kunden auf den im Vertrag vereinbarten Selbstbehalt. Diese Haftungsbefreiung gilt nicht für die unter Ziffer 11b aufgeführten Schäden, sofern im konkreten Fall keine Deckung für den Schaden der ABAG-Rent besteht. Die Haftungsbefreiung gilt zudem nicht für Schäden, die bei Benutzung durch einen nicht berechtigten Lenker oder zu verbotenem Zweck entstehen, bei Unfallflucht des Kunden und bei nach SVG vorsätzlicher oder grobfahrlässiger Verursachung eines Schadens, insbesondere durch Übermüdung, alkohol- oder drogenbedingter Fahruntüchtigkeit sowie bei Schäden, die durch das Ladegut entstehen."
                },
                {
                    "title": null,
                    "content": "Eine allfällige Haftungsbefreiung des Kunden durch die ABAG-Rent ist im Übrigen nur gültig, wenn sie schriftlich erfolgt."
                }
            ]
        },
        {
            "title": "Haftung des Unternehmens",
            "content": "Die ABAG-Rent haftet weder gegenüber dem Kunden noch Drittpersonen für einen Unfallschaden, der sich während der Vertragsdauer ereignet. Die Garage haftet auch nicht für Schäden, die dem Kunden dadurch entstehen können, dass sich am Fahrzeug irgendein Defekt einstellt, der eine Weiterreise verhindert, Zeitverlust oder sonstigen Folgeschaden verursacht."
        },
        {
            "title": "Forderungen",
            "content": null,
            "subsections": [
                {
                    "title": null,
                    "content": "Forderungen müssen innerhalb von 30 Tage bezahlt werden."
                },
                {
                    "title": "Verzug:",
                    "content": "ABAG Rent ist berechtigt, bei Zahlungsverzug eine Mahngebühr in Höhe von 15 CHF zu erheben. Bei einem zweiten Zahlungsverzug wird der Kunde erneut gemahnt und erhält eine Mahngebühr von 30 CHF. Bei einem dritten Zahlungsverzug wird der Kunde ohne weiteres betrieben."
                }
            ]
        },
        {
            "title": "Ergänzende Bestimmungen",
            "content": "Ergänzend zu diesen Bestimmungen gilt das Schweizerische Obligationenrecht."
        },
        {
            "title": "Gerichtsstand",
            "content": "Ohne anderslautende zwingende Gesetzbestimmungen, vereinbaren die Parteien die Zuständigkeit der ordentlichen Gerichte am Sitz resp. Wohnsitz der ABAG-Rent. Es ist der Garage freigestellt, stattdessen auch die ordentlichen Gerichte am Sitz resp. Wohnsitz des Kunden anzurufen."
        }
    ];

    const sections: Section[] =  locale == 'de' ? sectionsDe : sectionsEn;

    return (
        <>
            <HeadingTitle title={t("heading")} />
            <div className="bg-bgSecondary w-full pb-16">
                <Breadcrumbs translations={t} />
                <div className="max-w-[1440px] m-auto">
                    <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 desktop:px-8 pb-8 flex flex-col ">
                        <SideMenu />
                        <div className="flex flex-col w-full laptop:w-3/4 py-4">
                            <ol className="pl-6">
                                {sections.map((section, index) => (
                                    <li key={index} className="mb-6">
                                        <h2 className="text-lg font-bold">{section.title}</h2>
                                        {section.content && <p>{section.content}</p>}
                                        {section.subsections && section.subsections.length > 0 && (
                                            <ol className="list-alpha pl-4 ml-4">
                                                {section.subsections.map((sub, subIndex) => (
                                                    <li key={subIndex} className="mb-4">
                                                        {typeof sub === 'string' ? (
                                                            <p className="ml-4">{sub}</p>
                                                        ) : (
                                                            <>
                                                                <h3 className="text-md font-semibold">{sub.title}</h3>
                                                                {sub.content && <p className="ml-4">{sub.content}</p>}
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ol>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTop />
        </>
    );
}
