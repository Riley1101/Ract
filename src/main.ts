import type { ChildType, ContainerType, RactElement } from "./types";

function createElement(
  type: RactElement["type"],
  props: RactElement["props"],
  ...children: RactElement["children"]
): RactElement {
  return {
    type,
    props: {
      ...props,
      children: children?.map((child: any) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text: ChildType) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element: RactElement, container: ContainerType) {
  const dom: any =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = (key: string) => key !== "children";
  Object.keys(element.props || {})
    .filter(isProperty)
    .forEach((name: any) => {
      dom[name] = element.props && element.props[name];
    });
  element.props &&
    element.props.children.forEach((child: any) => render(child, dom));
  container && container.appendChild(dom);
}

export const Ract = {
  createElement,
  render,
};

const element = Ract.createElement(
  "div",
  { id: "foo" },
  Ract.createElement("a", null, "bar"),
  Ract.createElement("button", null, "CLicl me")
);

let container = document.getElementById("app");
Ract.render(element, container);
