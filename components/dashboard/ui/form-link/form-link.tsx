import React from "react";

type Props = {
  href: string;
  text: string;
  linkCaption?: string;
  linkClasses?: string;
  captionClasses?: string;
  align?: "center" | "left" | "right";
};

const FormLink = ({
  href = "",
  text = "",
  linkCaption,
  captionClasses = "",
  linkClasses = "",
  align = "center",
}: Props) => {
  const varients = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`w-full flex gap-2 flex-wrap ${varients[align]}`}>
      {linkCaption && (
        <span className={`${captionClasses}`}>{linkCaption}</span>
      )}
      <a
        href={href}
        className={`${linkClasses} text-sm text-blue-500 underline`}
      >
        {text}
      </a>
    </div>
  );
};

export default FormLink;
