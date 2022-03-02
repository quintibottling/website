import CertificationCard from "components/CertificationCard";

export default function CertificationBlock({ locale, record }) {
  return (
    <div className="mx-auto px-4 pb-12 lg:px-10 lg:pb-16 xl:container xl:pb-24 2xl:px-28">
      <div className="grid gap-6 md:grid-cols-2 xl:gap-8">
        {record.certification.map((item) => (
          <CertificationCard item={item} />
        ))}
      </div>
    </div>
  );
}
