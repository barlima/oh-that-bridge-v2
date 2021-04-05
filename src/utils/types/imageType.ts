export interface Image {
  src: string;
  alt: string;
  caption?: {
    text: string;
    link?: string;
    href?: string;
  };
}
