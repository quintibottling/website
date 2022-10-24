import OptionalCard from "components/OptionalCard";

export default function FunctionsPlusBlock({ locale, record }) {
  return (
    <div className="grid divide-y divide-pink md:grid-cols-3 md:gap-x-4 md:gap-y-4 md:divide-y-0 lg:gap-x-4 xl:gap-x-10">
      {record.functions.map((data) => (
        <OptionalCard key={data.id} locale={locale} data={data} />
      ))}
    </div>
  );
}
