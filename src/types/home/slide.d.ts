type SlideData = {
  src: string;
  alt: string;
};

type SlideStore = {
  slideStatus: StoreStatus;
  slideData: SlideData[];
  getSlideData: () => Promise<void>;
};
