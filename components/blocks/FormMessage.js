import translate from "lib/locales";

export default function FormMessage({ status, locale }) {
  const bannerClass = "mt-6 p-2";
  const textClass = "text-xs";
  if (status === "success") {
    return (
      <div className={`${bannerClass} border-2 bg-green-light py-2`}>
        <div className={`${textClass}`}>
          {translate("formSuccessText", locale)}
        </div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className={`${bannerClass} border-2 bg-red-light py-2`}>
        <div className={`${textClass}`}>
          {translate("formErrorText", locale)}
        </div>
      </div>
    );
  }
  return "";
}
