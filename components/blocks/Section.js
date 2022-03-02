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
        }`}
      >
        {record.content.map((block) => {
          return (
            <div
              className={`${
                block.model == "gallery_block"
                  ? ""
                  : block.model == "partner"
                  ? ""
                  : block.model == "certification_block"
                  ? ""
                  : "container--small"
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
