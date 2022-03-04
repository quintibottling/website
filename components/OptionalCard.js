export default function OptionalCard({ locale, optional }) {
  return (
    <div className="p-y-2 my-2">
      <div className="text-lg text-black">{optional.title}</div>
      <div className="text-small mt-1">{optional.description}</div>
      {console.log("optional:", optional)}
    </div>
  );
}
