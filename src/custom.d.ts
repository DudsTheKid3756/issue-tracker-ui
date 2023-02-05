declare module "*.svg" {
  import React = require("react");
  export const content: React.FC<React.SVGAttributes<SVGElement>>;
  const src: string;
  export default src;
}
