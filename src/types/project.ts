export type Project = {
  title: string;
  tagline: string;
  logo: string;
  description: string;
  tech: string[];
  visit: string;
  bannerFit?: 'cover' | 'contain';
  bannerScale?: number;
  bannerPadding?: string;
};
