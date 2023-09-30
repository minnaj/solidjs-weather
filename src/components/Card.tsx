import { Accessor, JSXElement, Show } from "solid-js";

type CardProps = {
  title?: string;
  subtitle?: string;
  error?: boolean;
  children: JSXElement;
};

function Card(props: CardProps) {
  return (
    <div class="text-white shadow-lg text-base">
      <Show when={props.title}>
        <div
          class={`rounded-t-md ${
            props.error ? "bg-orange-400" : "bg-sky-600"
          } flex-col items-center py-2 px-4`}
        >
          <div class="text-2xl">{props.title}</div>
          <div class="text-sm">{props.subtitle}</div>
        </div>
      </Show>
      <div class={`${props.title ? "rounded-b-md" : "rounded-md"} bg-slate-900 py-2 px-4`}>
        {props.children}
      </div>
    </div>
  );
}

export default Card;
