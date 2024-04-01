import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Register() {
  return (
    <>
      <Header background={false} fixed={false} />
      <div className="bg-bgSecondary w-full pb-16 pt-8">
        <div className="relative max-w-[1440px] m-auto px-4 mobile:px-8 flex ">
          <div className="flex flex-col bg-white tablet:flex-row w-full gap-8 ">
            <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between py-16 px-16">
              <h1 className="text-gray font-bold text-4xl">
                Login
              </h1>
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row w-full gap-8 ">
            <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between py-16 px-16">
              <h1 className="text-gray font-bold text-4xl">
                Register Now
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
