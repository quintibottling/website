import translate from "lib/locales";

export default function ComparisonTab({
  locale,
  machines,
  resultAllTecnologyArray,
  product,
}) {
  let tecnologyOfMachineArray = [];

  return (
    <>
      <div className="overflow-x-scroll pl-4 pb-4 lg:pl-10 xl:container xl:mx-auto xl:overflow-x-auto xl:pl-10 2xl:pl-28">
        <table>
          <tr>
            <td></td>
            {machines.map((machine) => (
              <th scope="col">{machine.title}</th>
            ))}
          </tr>
          {resultAllTecnologyArray.map((tec) => (
            <tr>
              <th scope="row">
                <div className="flex items-center gap-2">
                  {tec.request == true ? (
                    <div className={`${product.code} h-3 w-3`} />
                  ) : null}
                  <div>
                    {tec.title}
                    {tec.subtitle && (
                      <div className="text-xs opacity-70">{tec.subtitle}</div>
                    )}
                  </div>
                </div>
              </th>
              {machines.map((machine) => {
                let uniqueTecnologyArray;
                machine.tecnology.map((t) => {
                  tecnologyOfMachineArray.push(t.title);
                });
                uniqueTecnologyArray = [...new Set(tecnologyOfMachineArray)];
                tecnologyOfMachineArray = [];
                let result =
                  uniqueTecnologyArray.indexOf(tec.title) > -1 ? (
                    <div className="mx-auto h-3 w-3 rounded-full border-2 border-gold-light bg-gold-light" />
                  ) : (
                    <div className="mx-auto h-3 w-3 rounded-full border-2 border-black" />
                  );
                return <td>{result}</td>;
              })}
            </tr>
          ))}
        </table>
      </div>
      <div className="container--small-x pt-4">
        <div className="flex gap-2">
          <div className="text-xxs">{translate("legend", locale)}:</div>
          <div className="grid gap-1 md:flex md:gap-3">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full border-2 border-black" />
              <div className="text-xxs">{translate("not_present", locale)}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full border-2 border-gold-light bg-gold-light" />
              <div className="text-xxs">{translate("present", locale)}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className={`${product.code} h-3 w-3`} />
              <div className="text-xxs">
                {translate("not_removable", locale)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
