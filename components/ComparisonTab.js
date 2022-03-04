import { useState } from "react";

export default function ComparisonTab({
  locale,
  allTecnology,
  machines,
  resultAllTecnologyArray,
}) {
  let tecnologyOfMachineArray = [];
  let uniqueTecnologyArray = [];
  let tableArray = [];
  const result = resultAllTecnologyArray.map((tec) => {
    let rowObject = {};
    let rowItem = {};
    machines.map((machine) => {
      // machine.tecnology.map((t) => {
      //   tecnologyOfMachineArray.push(t.title);
      // });
      // uniqueTecnologyArray = [...new Set(tecnologyOfMachineArray)];
      // let yesOrNot =
      //   uniqueTecnologyArray.indexOf(tec) > -1 ? "YESSSS" : "NOOOO";
      // tecnologyOfMachineArray = [];
      let rowCell = { key: "value" };
      rowItem = { ...rowItem, ...rowCell };
    });
    rowObject = { ...rowObject, ...rowItem };
    tableArray.push(rowObject);
  });

  {
    console.log("tableArray:", tableArray);
    // console.log("result:", result);
  }

  return (
    <>
      <div className="flex justify-end gap-4">
        {machines.map((machine) => (
          <div key={machine.id} className="w-[100px] bg-red text-white">
            {machine.title}
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {resultAllTecnologyArray.map((tecnology) => (
          <div
            key={tecnology.key}
            className="flex justify-between bg-black p-2 text-white"
          >
            <div className="">{tecnology}</div>
            <div className="flex gap-4">
              {machines.map((machine) => {
                let uniqueTecnologyArray;
                return (
                  <div className="bg-yellow p-2 text-black">
                    {machine.tecnology.map((t) => {
                      tecnologyOfMachineArray.push(t.title);
                    })}
                    {
                      (uniqueTecnologyArray = [
                        ...new Set(tecnologyOfMachineArray),
                      ])
                    }
                    {uniqueTecnologyArray.indexOf(tecnology) > -1 ? (
                      <>YESSSS</>
                    ) : (
                      <>NOOOO</>
                    )}
                    {(tecnologyOfMachineArray = [])}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
