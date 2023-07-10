export type ElementType = "h1" | "div" | "button" | "a" | "b" | "TEXT_ELEMENT";

export type PropsType = {
  [key: string]: any;
};

export type ContainerType = HTMLElement | null;

export type ChildType = any;

export type RactElement = {
  type: ElementType;
  props: PropsType | null;
  children?: ChildType[] | RactElement | ChildType;
};
