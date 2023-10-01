import { JSXElement } from "solid-js";

type AppProps = {
  children: JSXElement;
};

function App(props: AppProps) {
  return (
    <div class="w-screen h-screen  bg-gradient-to-b from-indigo-900 to-indigo-950">
      {props.children}
    </div>
  );
}

export default App;
