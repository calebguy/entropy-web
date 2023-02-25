import {
  GetCuratorImageResponse,
  GetSortResponse,
  Profile,
} from "../interfaces";
import { GetProfileResponse } from "./../interfaces/index";

const twitterChannels = [
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1568148351484366849/CoJM7ubE_400x400.jpg",
    screen_name: "entropppy",
  },
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1608845499431264258/H39bmJlO_400x400.jpg",
    screen_name: "0",
  },
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1492066955204849666/PShpHTb__400x400.jpg",
    screen_name: "innnfra",
  },
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1492195515135631367/SLy_sQpB_400x400.jpg",
    screen_name: "juuuiiicee",
  },
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1515010243956117504/0hY7QkOn_400x400.jpg",
    screen_name: "l_o_r_eee",
  },
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1525356280474263552/7ttV5w0q_400x400.jpg",
    screen_name: "nowwwplaying",
  },
  {
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1569993679980331008/xpzldIsC_400x400.jpg",
    screen_name: "neee_eeed",
  },
];

export const MOCK_PROFILE: Profile = {
  profile_image: {
    url: "https://res.cloudinary.com/dpooqlfdf/image/upload/v1675634340/yjtez64evmrzjolxtu0e.jpg",
    height_field: 100,
    width_field: 100,
  },
  name: "gainor",
  bio: "Test this out",
  handle: "gainor",
  twitter_handle: "https://twitter.com/gainormather",
  ig_handle: "https://google.com",
  website: "https://gainor.xyz",
  slug: "gainor",
  admin_approved: true,
  profile_views: null,
  seen_feed_images: null,
  linked_feed_images: null,
  entropy_score: "90.43",
  total_feed_impressions: "12",
  profile_awards: null,
  wallet_address: null,
};

const MOCK_IMAGE = {
  title: "string",
  created: "Datetime",
  image: {
    width_field: 1019,
    height_field: 607,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/4947982/original_b6c46d340f2949daff548b63fc78679a.png?1567530746?bc=0",
  },
  url: "https://d2w9rnfcy7mm78.cloudfront.net/4947982/original_b6c46d340f2949daff548b63fc78679a.png?1567530746?bc=0",
  thumb_url: null,
  square_url: null,
  tweet_id: null,
  arena_block_id: null,
  twitter_channel: {
    profile_image_url: "",
    screen_name: "",
  },
  was_tweeted: false,
  approved_to_tweet: false,
  declined_to_tweet: false,
  declined_by_user: null,
  approved_by_user: null,
  added_to_profile: null,
  uploaded_image: false,
  created_at: ",",
  updated_at: "Datetime;",
  tweet_time: null,
  impressions: 10,
  image_source: null,
  image_creator: null,
  image_description: null,
  nft: false,
  contract_address: null,
  token_id: null,
  creator_nft: false,
  nft_title: null,
  creator_nft_approved: null,
  submitter: null,
  curator: MOCK_PROFILE,
  content_source: null,
};

export const MOCK_GET_SORT_RESPONSE: GetSortResponse = {
  image: MOCK_IMAGE,
  twitter_channels: twitterChannels,
  current_channel: twitterChannels[0],
};

export const MOCK_GET_PROFILE_RESPONSE: GetProfileResponse = {
  profile: MOCK_PROFILE,
  images: [MOCK_IMAGE],
  acheivements: {
    isCoreCurator: true,
    isTopFivePercent: true,
  },
};

export const MOCK_GET_CURATOR_IMAGE_RESPONSE: GetCuratorImageResponse = {
  image: MOCK_IMAGE,
  profile: MOCK_PROFILE,
};
