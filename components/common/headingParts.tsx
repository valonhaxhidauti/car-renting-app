import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'next-view-transitions'

const HeadingTitle = ({ translations }: { translations: string }) => {
  return (
    <div className="w-full flex max-w-[1440px] m-auto px-4 mobile:px-8 bigDesktop:px-0 py-8 bg-white">
      <div className="text-primary font-bold text-4xl w-full items-center flex">
        {translations}
      </div>
    </div>
  );
};

const Breadcrumbs = ({ translations, }: { translations: any }) => {
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
          <BreadcrumbPage>
            {translations("heading")}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export {HeadingTitle, Breadcrumbs}