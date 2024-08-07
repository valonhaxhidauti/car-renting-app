import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "next-view-transitions";

const HeadingTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex max-w-[1440px] m-auto px-4 mobile:px-8 bigDesktop:px-0 py-8 bg-white">
      <div className="text-primary font-bold text-4xl w-full items-center flex">
        {title}
      </div>
    </div>
  );
};

const Breadcrumbs = ({ translations }: { translations: any }) => {
  return (
    <Breadcrumb className="max-w-[1440px] m-auto w-full px-4 mobile:px-8 bigDesktop:px-0 py-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/"> {translations("breadcrumb.homepage")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{translations("heading")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbExtended = ({
  translations,
  params,
}: {
  translations: any;
  params: any;
}) => {
  return (
    <Breadcrumb className="w-full px-4 mobile:px-8 bigDesktop:px-0 py-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{translations("homepage")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={`/explore/vehicle?vehicleId=${params.vehicleId}&rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
            >
              {translations("vehicleDetails")}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{translations("payment")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { HeadingTitle, Breadcrumbs, BreadcrumbExtended };
