import { FacebookIcon, GoogleIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("Account");

  return (
    <div className="flex flex-col mobile:bg-white tablet:flex-row w-full gap-8 ">
      <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between mobile:p-16">
        <h1 className="text-grayFont font-bold text-4xl mb-2">
          {t("login.title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <p className="text-grayFont">{t("login.description")}</p>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col tablet:flex-row gap-6 w-full px-8 tablet:px-0">
            <button className="flex gap-4 p-4 justify-center w-full bg-white shadow-btnShadow hover:bg-slate-50 active:bg-slate-100">
              <FacebookIcon />
              <p className="text-grayFont"> {t("login.facebookButton")}</p>
            </button>
            <button className="flex gap-4 p-4 justify-center w-full bg-white shadow-btnShadow hover:bg-slate-50 active:bg-slate-100">
              <GoogleIcon />
              <p className="text-grayFont">{t("login.googleButton")}</p>
            </button>
          </div>
          <div className="flex items-center w-full my-8">
            <div className=" border-b border-zinc-200 w-full"></div>
            <span className="px-4 text-slate-400 italic">{t("login.or")}</span>
            <div className=" border-b border-zinc-200 w-full"></div>
          </div>
          <div className="w-full">
            <form className="flex flex-col gap-4" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-grayFont"
                >
                  {t("login.emailLabel")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-sm border-zinc-300 border p-4 text-grayFont focus-visible:outline-primary"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-grayFont"
                  >
                    {t("login.passwordLabel")}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-sm border-zinc-300 gray border p-4 text-grayFont focus-visible:outline-primary"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <a href="/account/password-reset" className="font-bold text-grayFont hover:underline">
                  {t("login.forgotPassword")}
                  </a>
                </div>
                <button
                  type="submit"
                  className="flex justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                >
                  {t("login.loginButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
