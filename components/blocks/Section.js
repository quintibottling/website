import PostContent from "components/PostContent";

export default function Section({ locale, record }) {
  return (
    <>
      <div
        className={`${
          record.background == "light"
            ? "bg-transparent"
            : record.background == "dark"
            ? "rounded-b-[20px] bg-brown lg:rounded-b-[50px]"
            : "bg-white"
        } py-6 md:py-12 xl:py-20`}
      >
        {record.content.map((block) => {
          return (
            <div
              className={`${
                block.model == "gallery_block"
                  ? "my-6"
                  : block.model == "partner"
                  ? ""
                  : block.model == "certification_block"
                  ? "py-6"
                  : "container--small-x py-6 xl:py-12"
              }`}
              key={block.id}
            >
              <PostContent
                record={block}
                background={record.background}
                locale={locale}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
