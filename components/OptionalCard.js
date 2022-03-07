export default function OptionalCard({ locale, data }) {
  return (
    <div
      key={data.id}
      className="nth-child-3n my-2 border-pink md:border-r md:pr-4 lg:pr-8"
    >
      <div className="pt-2 text-lg text-black">{data.title}</div>
      <div className="mt-2 text-xs opacity-80">{data.description}</div>
    </div>
  );
}
