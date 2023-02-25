import { GetSortResponse } from "../interfaces";

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

export const MOCK_GET_SORT_RESPONSE: GetSortResponse = {
  image: {
    title: "string",
    created: "Datetime",
    image: {
      width_field: 1019,
      height_field: 607,
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
    curator: {
      profile_image: {
        url: "https://res.cloudinary.com/dpooqlfdf/image/upload/v1675634340/yjtez64evmrzjolxtu0e.jpg",
        height_field: 100,
        width_field: 100,
      },
      name: "gainor",
      bio: null,
      handle: "gainor",
      twitter_handle: "gainor",
      ig_handle: null,
      website: null,
      slug: "gainor",
      admin_approved: true,
      profile_views: null,
      seen_feed_images: null,
      linked_feed_images: null,
      entropy_score: null,
      total_feed_impressions: null,
      profile_awards: null,
      wallet_address: null,
    },
    content_source: null,
  },
  twitter_channels: twitterChannels,
  current_channel: twitterChannels[0],
};
