import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import translate from "lib/locales";

export default function Footer({ locale, data }) {
  const year = new Date().getFullYear();
  return (
    <>
      <footer
        id="footer"
        data-datocms-noindex
        className="bg-brown px-4 md:pr-[20%] lg:px-10 lg:pr-10 2xl:px-[10%]"
      >
        footer
      </footer>
    </>
  );
}
