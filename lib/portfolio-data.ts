export type PortfolioItem = {
  id: string;
  title: string;
  style: string;
  placement: string;
  healed: boolean;
  src: string;
};

/** Local assets in `/public/portfolio/` (synced from client originals named `ozzy*`). */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "c1",
    title: "Color piece I",
    style: "Color",
    placement: "Custom",
    healed: false,
    src: "/portfolio/ozzycolor1.jpg",
  },
  {
    id: "c2",
    title: "Color piece II",
    style: "Color",
    placement: "Custom",
    healed: false,
    src: "/portfolio/ozzycolor2.jpg",
  },
  {
    id: "c3",
    title: "Color piece III",
    style: "Color",
    placement: "Custom",
    healed: false,
    src: "/portfolio/ozzycolor3.jpg",
  },
  {
    id: "bg1",
    title: "Black & grey I",
    style: "Black & grey",
    placement: "Custom",
    healed: false,
    src: "/portfolio/ozzyblackandgrey1.jpg",
  },
  {
    id: "bg2",
    title: "Black & grey II",
    style: "Black & grey",
    placement: "Custom",
    healed: false,
    src: "/portfolio/ozzyblackandgrey2.jpg",
  },
  {
    id: "prof",
    title: "Studio portrait",
    style: "Portrait",
    placement: "Profile",
    healed: false,
    src: "/portfolio/ozzyprofile.jpg",
  },
  {
    id: "cover",
    title: "Ozzy Melon cover",
    style: "Illustration",
    placement: "Cover",
    healed: false,
    src: "/portfolio/ozzy-melon-cover.jpeg",
  },
];
