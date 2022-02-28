export default function TitleTextBlock({ locale, record, background }) {
  return (
    <>
      <div className="grid gap-5 md:col-span-full md:gap-x-10 lg:gap-x-12 xl:gap-x-24">
        <h2
          className={`${
            background == "dark" ? "text-white" : "text-black"
          } text-2xl lg:text-4xl xl:text-5xl`}
        >
          {record.title}
        </h2>
        <h3
          className={`${
            background == "dark" ? "text-white" : "text-black/80"
          } lg:text-lg`}
        >
          {record.text}
        </h3>
      </div>
    </>
  );
}
