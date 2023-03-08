export type Datetime = string;
export type Nullable<T> = T | null;

export interface Photo {
  id: number;
  title: string;
  created: Datetime;
  image: Nullable<CloudinaryField>;
  url: string;
  thumb_url: Nullable<string>;
  square_url: Nullable<string>;
  tweet_id: Nullable<string>;
  arena_block_id: Nullable<string>;
  twitter_channel: Nullable<TwitterChannel>;
  was_tweeted: boolean;
  approved_to_tweet: boolean;
  declined_to_tweet: boolean;
  declined_by_user: Nullable<Profile>;
  approved_by_user: Nullable<Profile>;
  added_to_profile: Nullable<Profile>;
  uploaded_image: boolean;
  created_at: Datetime;
  updated_at: Datetime;
  tweet_time: Nullable<Datetime>;
  impressions: Nullable<number>;
  image_source: Nullable<string>;
  image_creator: Nullable<string>;
  image_description: Nullable<string>;
  nft: boolean;
  contract_address: Nullable<string>;
  token_id: Nullable<string>;
  creator_nft: boolean;
  nft_title: Nullable<string>;
  creator_nft_approved: Nullable<boolean>;
  submitter: Nullable<Profile>;
  curator: Nullable<Profile>;
  content_source: Nullable<ContentSource>;
}

export interface Profile {
  // user: User;
  profile_image: Nullable<CloudinaryField>;
  name: Nullable<string>;
  bio: Nullable<string>;
  handle: string;
  twitter_handle: string;
  ig_handle: Nullable<string>;
  website: Nullable<string>;
  slug: string;
  admin_approved: boolean;
  profile_views: Nullable<string>;
  seen_feed_images: Nullable<string>;
  linked_feed_images: Nullable<string>;
  entropy_score: Nullable<string>;
  total_feed_impressions: Nullable<string>;
  profile_awards: Nullable<string>;
  wallet_address: Nullable<string>;
}

interface User {
  username: string;
  first_name: Nullable<string>;
  last_name: Nullable<string>;
  email: Nullable<string>;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Datetime;
}

export interface Acheivement {
  isTopFivePercent: boolean;
  isCoreCurator: boolean;
  isJuiced: boolean;
  isArchivist: boolean;
}

export interface TwitterChannel {
  profile_image_url: string;
  screen_name: string;
}

interface CloudinaryField {
  width_field: number;
  height_field: number;
  url: string;
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

export interface GetSortResponse {
  image: Photo;
  twitter_channels: TwitterChannel[];
  current_channel: TwitterChannel;
}

export interface GetProfileResponse {
  profile: Profile;
  images: Photo[];
  acheivements: Acheivement;
}

export interface GetCuratorImageResponse {
  profile: Profile;
  image: Photo;
}

export interface GetDashboardResponse {
  profile: Profile;
  rankedCurators: Profile[];
  suggestedPhotos: Photo[];
  rank: number;
  userInvitesCount: number;
  curatedPhotosCount: number;
  allPhotosCount: number;
  acheivements: Acheivement;
}

export interface GetLeaderboardResponse {
  curators: Profile[];
}
