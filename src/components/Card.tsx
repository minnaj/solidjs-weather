import { JSXElement } from "solid-js";

type CardProps = {
  error?: boolean;
  children: JSXElement;
};

function Card({ error = false, children }: CardProps) {
  let backgroundColor = "bg-indigo-400";
  if (error) {
    backgroundColor = "bg-orange-400";
  }
  return <div class={`${backgroundColor} p-4`}>{children}</div>;
}

export default Card;
