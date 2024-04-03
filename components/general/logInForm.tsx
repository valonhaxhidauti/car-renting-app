import { FacebookIcon, GoogleIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("Authenthication");

  return (
    <div className="flex flex-col bg-white tablet:flex-row w-full gap-8 ">
      <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between py-16 px-16">
        <h1 className="text-gray font-bold text-4xl mb-2">
          {t("Login.Title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <p className="text-gray">{t("Login.Description")}</p>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col tablet:flex-row gap-6 w-full px-8 tablet:px-0">
            <button className="flex gap-4 p-4 justify-center w-full shadow-btnShadow hover:bg-slate-50 active:bg-slate-100">
              <FacebookIcon />
              <p className="text-gray"> {t("Login.FacebookButton")}</p>
            </button>
            <button className="flex gap-4 p-4 justify-center w-full shadow-btnShadow hover:bg-slate-50 active:bg-slate-100">
              <GoogleIcon />
              <p className="text-gray">{t("Login.GoogleButton")}</p>
            </button>
          </div>
          <div className="flex items-center w-full my-8">
            <div className=" border-b border-zinc-200 w-full"></div>
            <span className="px-4 text-slate-400 italic">{t("Login.Or")}</span>
            <div className=" border-b border-zinc-200 w-full"></div>
          </div>
          <div className="w-full">
            <form className="flex flex-col gap-4" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray"
                >
                  {t("Login.EmailLabel")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-sm border-zinc-300 border p-4 text-gray focus-visible:outline-primary"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("Login.PasswordLabel")}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-sm border-zinc-300 gray border p-4 text-gray focus-visible:outline-primary"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <a href="/account/password-reset" className="font-bold text-gray hover:underline">
                  {t("Login.ForgotPassword")}
                  </a>
                </div>
                <button
                  type="submit"
                  className="flex justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                >
                  {t("Login.LoginButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
