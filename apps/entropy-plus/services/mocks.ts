import { getRandomIntInclusive } from "utils";
import {
  GetCuratorImageResponse,
  GetDashboardResponse,
  GetLeaderboardResponse,
  GetSortResponse,
  Photo,
  Profile,
} from "../interfaces";
import { GetProfileResponse } from "./../interfaces/index";
import { brianImages } from "./seed";

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
    url: "https://res.cloudinary.com/dpooqlfdf/image/upload/v1667501807/qy4stehdletuhpewxdud.png",
    height_field: 100,
    width_field: 100,
  },
  name: "brian",
  bio: "feel-my-inter-connectedness",
  handle: "superuser",
  twitter_handle: "https://twitter.com/superduper",
  ig_handle: "https://google.com",
  website: "https://super.xyz",
  slug: "brian",
  admin_approved: true,
  profile_views: null,
  seen_feed_images: null,
  linked_feed_images: null,
  entropy_score: "1040360",
  total_feed_impressions: "12",
  profile_awards: null,
  wallet_address: null,
};

const GET_MOCK_IMAGE = ({
  id,
  width,
  height,
  url,
}: {
  id: number;
  width: number;
  height: number;
  url: string;
}): Photo => {
  return {
    id,
    title: "-get-connected-",
    created: new Date().toISOString(),
    image: {
      width_field: width,
      height_field: height,
      url,
    },
    url,
    thumb_url: url,
    square_url: url,
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tweet_time: null,
    impressions: 0,
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
};

export const MOCK_IMAGES = [
  GET_MOCK_IMAGE({
    id: 0,
    width: 1019,
    height: 607,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/4947982/original_b6c46d340f2949daff548b63fc78679a.png?1567530746?bc=0",
  }),
  GET_MOCK_IMAGE({
    id: 1,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/12534916/original_b670f5b15553c1319fdcc3d622d0eb73.jpg?1626229587?bc=0",
    width: 800,
    height: 478,
  }),
  GET_MOCK_IMAGE({
    id: 2,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/18314420/original_131e33d9172c3e2942fef911c05429fa.jpg?1664738661?bc=0",
    width: 1055,
    height: 751,
  }),
  GET_MOCK_IMAGE({
    id: 3,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/16884192/original_9d18f86cf9fde85a1b45760efd836a88.jpg?1655326685?bc=0",
    width: 422,
    height: 317,
  }),
  GET_MOCK_IMAGE({
    id: 4,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/2889174/original_a539dbaf19f99d2a814279ca6e01bd83.jpg?1539800822?bc=1",
    width: 790,
    height: 1325,
  }),
  GET_MOCK_IMAGE({
    id: 5,
    url: "https://d2w9rnfcy7mm78.cloudfront.net/1182019/original_a8bcc2b51c6ec8aa5eb466703bfeb387.jpg?1502208880?bc=1",
    width: 396,
    height: 400,
  }),
].concat(brianImages.map((image) => GET_MOCK_IMAGE(image)));

export const GET_MOCK_GET_SORT_RESPONSE = (): GetSortResponse => ({
  image: MOCK_IMAGES[getRandomIntInclusive(0, MOCK_IMAGES.length - 1)],
  twitter_channels: twitterChannels,
  current_channel: twitterChannels[0],
});

export const GET_MOCK_PROFILE_RESPONSE = (): GetProfileResponse => ({
  profile: MOCK_PROFILE,
  images: MOCK_IMAGES,
  acheivements: {
    isCoreCurator: true,
    isTopFivePercent: true,
    isJuiced: true,
    isArchivist: true,
  },
});

export const GET_MOCK_GET_CURATOR_IMAGE_RESPONSE = (
  id: number
): GetCuratorImageResponse => {
  const image = MOCK_IMAGES.filter((photo) => photo.id === id)[0];
  return {
    image,
    profile: MOCK_PROFILE,
  };
};

export const GET_MOCK_DASHBAORD_RESPONSE = (): GetDashboardResponse => ({
  profile: MOCK_PROFILE,
  rankedCurators: [MOCK_PROFILE, MOCK_PROFILE, MOCK_PROFILE],
  suggestedPhotos: MOCK_IMAGES.splice(0, 8),
  rank: 10,
  userInvitesCount: 4,
  curatedPhotosCount: 103,
  allPhotosCount: 3982,
  acheivements: {
    isCoreCurator: true,
    isTopFivePercent: true,
    isJuiced: true,
    isArchivist: true,
  },
});

export const GET_MOCK_LEADERBOARD_RESPONSE = (): GetLeaderboardResponse => ({
  curators: [MOCK_PROFILE, MOCK_PROFILE, MOCK_PROFILE],
});
