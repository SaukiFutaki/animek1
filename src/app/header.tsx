import React from "react";
import Link from "next/link";

interface Props {
  titleHeader: string;
  LinkTitle?: string;
  href?: string;
}

const Head = ({ titleHeader, LinkTitle, href }: Props) => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-3xl">{titleHeader}</h1>
      {href && LinkTitle ? (
        <Link
          href={href}
          className=" text-color-blueOcean hover:text-color-primary transition-all text-2xl p-4 underline"
        >
          {LinkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Head;
