export type Datetime = string;
export type Nullable<T> = T | null;

export interface Photo {
  id: number;
  url: string;
  added_to_profile: Array<{ slug: string }>;
  image_source: Nullable<string>;
  image_creator: Nullable<string>;
  image_description: Nullable<string>;
}

export interface CuratorPhoto {
  image: Photo;
  curator: Profile;
}

export interface SuggestedPhoto
  extends Pick<Photo, "id" | "url" | "added_to_profile"> {
  approved_to_tweet: boolean;
  was_tweeted: boolean;
  twitter_channel: string;
  approved_by_user: Array<{ slug: string }>;
  declined_by_user: Array<{ slug: string }>;
}

export interface HeaderProfile {
  id: number;
  handle: string;
  bio: Nullable<string>;
  profile_image:
    | { url: any; height_field: number; width_field: number }
    | undefined;
}

export interface Acheivement {
  isTopFivePercent: boolean;
  isCoreCurator: boolean;
  isJuiced: boolean;
  isArchivist: boolean;
}

export type TwitterChannelScreenName = string;

export interface TwitterChannel {
  profile_image_url: string;
  screen_name: TwitterChannelScreenName;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  access_expires: number;
  refresh_expires: number;
  detail?: string;
}

export interface ContentSource {}

export interface LoginDto {
  username: string;
  password: string;
}

export interface PostLoginResponse {
  access: string;
  access_expires: number;
  refresh: string;
  refresh_expires: number;
}

export interface Profile {
  id: number;
  user: number;
  profile_image: string;
  name: Nullable<string>;
  bio: string;
  handle: string;
  twitter_handle: string;
  ig_handle: string;
  website: string;
  slug: string;
  admin_approved: boolean;
  profile_views: number;
  seen_feed_images: number;
  liked_feed_images: number;
  entropy_score: number;
  total_feed_impressions: number;
  profile_awards: Array<number>;
  wallet_address: Nullable<string>;
}

export interface Sort {
  added_to_profile: [];
  approved_by_user: [];
  approved_to_tweet: boolean;
  declined_by_user: Slug[];
  id: number;
  twitter_channel: TwitterChannelScreenName;
  url: string;
  was_tweeted: boolean;
  curator?: Profile;
}

export interface Slug {
  slug: string;
}
