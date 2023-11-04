/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
    const content: React.FC<HTMLProps<SVGElement>>;
    export default content;
}