import translate from "lib/locales";
import { ArrowRightIcon } from "@heroicons/react/solid";

export default function Pagination({
  handleChangePage,
  totals,
  pageSize,
  currentPage,
  locale,
}) {
  const totalPages = Math.ceil(totals / pageSize);
  const pages = [...Array(totalPages).keys()];
  const classNav =
    "relative z-0 flex justify-center items-center space-x-4 py-12 lg:col-start-2 lg:col-span-3 xl:pb-20";
  const disabled = "cursor-auto opacity-10";

  return (
    <div className="flex justify-center gap-2 md:col-span-2">
      <nav
        className={classNav}
        role="navigation"
        aria-label={translate("pagination", locale)}
      >
        <button
          onClick={
            currentPage > 1 ? () => handleChangePage(currentPage - 1) : null
          }
          aria-label={translate("pagePrev", locale)}
          className={`${
            currentPage > 1 ? "" : disabled
          } flex h-10 w-8 items-center justify-center border border-gray-dark`}
        >
          <ArrowRightIcon className="w-5 -rotate-180" aria-hidden="true" />
        </button>
        {pages.map((p, index) => {
          return (
            <button
              key={p}
              className={`${
                index == currentPage - 1
                  ? "border-yellow bg-yellow/50 text-black"
                  : "border-gray-dark"
              } relative inline-block h-10 w-8 border border-gray-dark text-center`}
              onClick={() => handleChangePage(p + 1)}
              aria-current={index == currentPage - 1 ? true : false}
            >
              {p + 1}
            </button>
          );
        })}
        <button
          onClick={
            Number(currentPage) < totalPages
              ? () => handleChangePage(Number(currentPage) + 1)
              : null
          }
          aria-label="Go to Page next"
          className={`${
            Number(currentPage) < totalPages ? "" : disabled
          } flex h-10 w-8 items-center justify-center border border-gray-dark`}
        >
          <ArrowRightIcon className="w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
