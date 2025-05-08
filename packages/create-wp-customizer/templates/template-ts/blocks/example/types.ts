export type ExampleBlockAttributes = {
  text: string;
};

export type ExampleBlockEditProps = {
  attributes: ExampleBlockAttributes;
  setAttributes: (attributes: Partial<ExampleBlockAttributes>) => void;
};