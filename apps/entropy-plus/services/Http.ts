import axios, { AxiosInstance } from "axios";
import { PROXY_PREFIX } from "../constants";
import env from "../environment";
import AppStore from "../store/App.store";
import {
  GetLeaderboardResponse,
  LoginDto,
  Photo,
  PostLoginResponse,
  Profile,
} from "../interfaces";
import { AuthTokens } from "./../interfaces/index";
import { useSession } from "next-auth/react"
  ;


import App from "next/app";

interface MeProps {
  me: Profile;
}

interface ImageData {
  id: number;
}

interface ProfileData {
  slug: string;
}
interface ImageData {
  id: number;
}


async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


class EntropyHttp {
  protected http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
  }


  login({ username, password }: LoginDto) {
    return this.http.post<PostLoginResponse>("/api/login/token/", {
      username,
      password,
    });
  }

  refreshToken() {
    return this.http.post<AuthTokens>("/api/login/token/refresh/");
  }

  logout() {
    return this.http.post("/api/login/token/logout/");
  }

  getMe() {
    return this.http.get<Profile>("/api/login/me/");
  }

  getPing() {
    return this.http.get("/api/ping");
  }

  postImage(image: File, imageSource: string) {
    const formData = new FormData();
    // get the image file from the input
    formData.append("picture", image);

    formData.append("image_source", imageSource);
    return this.http.post("/api/upload/image/", formData);
  }

  async joinWaitlist(email: string) {
    return this.http.post("/api/waitlist/", { email });
  }

  async getProfile(slug: string) {
    const profileUrl = `https://entropy-plus.herokuapp.com/api/profiles/${slug}/`;
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();
    const photoUrl = `https://entropy-plus.herokuapp.com/api/${slug}/photos/`;
    const photoResponse = await fetch(photoUrl);
    const photoData = await photoResponse.json();

    const profileImages: Photo[] = [];
    for (let i = 0; i < 30 && i < photoData.length; i++) {
      profileImages.push(photoData[i]);
    }



    const profile = {
      profile_image: {
        url: profileData.profile_image,
        height_field: 100,
        width_field: 100,
      },
      name: profileData.name,
      bio: profileData.bio,
      id: profileData.id,
      handle: profileData.handle,
      twitter_handle: profileData.twitter_handle,
      ig_handle: profileData.ig_handle,
      website: profileData.website,
      slug: profileData.slug,
      admin_approved: profileData.admin_approved,
      profile_views: profileData.profile_views,
      seen_feed_images: profileData.seen_feed_images,
      linked_feed_images: profileData.liked_feed_images,
      entropy_score: profileData.entropy_score,
      total_feed_impressions: profileData.total_feed_impressions,
      profile_awards: profileData.profile_awards,
      wallet_address: profileData.wallet_address,
    };


    const data = { profile: profile, images: profileImages }
    return { data: data };
  }

  async getImageData() {
    const profile = await this.getProfile("brian");
    const slug = profile.data.profile.slug;
    const url = `https://entropy-plus.herokuapp.com/api/v1/sort/?slug=${slug}`;
    const response = await fetch(url);
    const imageData = await response.json();
    const data = imageData[0];
    return data;
  }
  async getTwitterChannels() {
    const response = await fetch(
      "https://entropy-plus.herokuapp.com/api/v1/twitter-channels/"
    );
    const data = await response.json();
    return data;
  }
  async getSort() {
    const imageData = await this.getImageData();
    const twitterChannels = await this.getTwitterChannels();
    const image_channel = imageData.twitter_channel;
    const response = await fetch(
      `https://entropy-plus.herokuapp.com/api/twitter-channels/${image_channel}`
    );

    const image_twitter_channel = await response.json();

    const data = {
      image: imageData,
      twitterChannels: twitterChannels,
      currentChannel: image_twitter_channel,
      profile: AppStore.auth.profile,
    };
    return { data: data };
  }

  async approveImage(imageData: ImageData) {
    try {
      const getMe = AppStore.auth.profile?.handle;
      if (!getMe) {
        throw new Error("Profile handle is not defined.");
      }
      const profile = await this.getProfile(getMe);
      const slug = profile.data.profile.slug;
      const url = `https://entropy-plus.herokuapp.com/api/images/${imageData.id}/update/?slug=${slug}`;
      const response = await this.http.patch(url);
      console.log(response, "approve")
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }


  async declineImage(imageData: ImageData) {
    try {
      const getMe = AppStore.auth.profile?.handle;
      if (!getMe) {
        throw new Error("Profile handle is not defined.");
      }
      const profile = await this.getProfile(getMe);
      const slug = profile.data.profile.slug;
      const url = `https://entropy-plus.herokuapp.com/api/images/${imageData.id}/update/decline/?slug=${slug}`;
      const response = await this.http.patch(url);
      console.log(response, "decline")
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getCuratorImage(curatorSlug: string, id: string) {

    const photoURL = `https://entropy-plus.herokuapp.com/api/${curatorSlug}/photos/${id}/`
    const response = await fetch(photoURL);
    const responseData = await response.json();

    const profileUrl = `https://entropy-plus.herokuapp.com/api/profiles/${curatorSlug}/`;
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();

    const profile = {
      profile_image: {
        url: profileData.profile_image,
        height_field: 100,
        width_field: 100,
      },
      name: profileData.name,
      bio: profileData.bio,
      id: profileData.id,
      handle: profileData.handle,
      twitter_handle: profileData.twitter_handle,
      ig_handle: profileData.ig_handle,
      website: profileData.website,
      slug: profileData.slug,
      admin_approved: profileData.admin_approved,
      profile_views: profileData.profile_views,
      seen_feed_images: profileData.seen_feed_images,
      linked_feed_images: profileData.liked_feed_images,
      entropy_score: profileData.entropy_score,
      total_feed_impressions: profileData.total_feed_impressions,
      profile_awards: profileData.profile_awards,
      wallet_address: profileData.wallet_address,
    };

    const data = {
      image: responseData,
      profile: profile,
    };

    console.log("data", data)


    return { data: data };
    // return { data: GET_MOCK_GET_CURATOR_IMAGE_RESPONSE(Number(id)) };
    // return this.http.get<GetCuratorImageResponse>(`${curatorSlug}/image/${id}`);
  }

  async getLogin() {
    console.log(AppStore.auth.isLoggedIn, "auth")
  }
  async getDashboard() {
    console.log("hello")
  }


  async getLeaderboard() {
    const url = `https://entropy-plus.herokuapp.com/api/leaderboard/`;
    const response = await fetch(url);
    const responseData = await response.json();
    const curators: Profile[] = []; // create an array variable

    // iterate through each object in responseData and push to curators array
    for (const data of responseData) {
      const profile = {
        profile_image: {
          url: data.profile_image,
          height_field: 100,
          width_field: 100,
        },
        name: data.name,
        id: data.id,
        bio: data.bio,
        handle: data.handle,
        twitter_handle: data.twitter_handle,
        ig_handle: data.ig_handle,
        website: data.website,
        slug: data.slug,
        admin_approved: data.admin_approved,
        profile_views: data.profile_views,
        seen_feed_images: data.seen_feed_images,
        linked_feed_images: data.liked_feed_images,
        entropy_score: data.entropy_score,
        total_feed_impressions: data.total_feed_impressions,
        profile_awards: data.profile_awards,
        wallet_address: data.wallet_address,
      };
      curators.push(profile);
    }

    const CREATE_LEADERBOARD_DATA = (): GetLeaderboardResponse => ({
      curators: curators,
    });

    return { data: CREATE_LEADERBOARD_DATA() };
  }

  static createForServer() {
    return new _HttpForServer();
  }

  static createForClient() {
    return new _HttpForClient();
  }
}

class _HttpForServer extends EntropyHttp {
  private _accessToken?: string;
  private _refreshToken?: string;

  constructor() {
    super(env.api.baseUrl);
  }

  setAccessToken(accessToken: string) {
    this._accessToken = accessToken;
    this.updateInterceptor();
  }

  setRefreshToken(refreshToken: any) {
    this._refreshToken = refreshToken;
    this.updateInterceptor();
  }

  private updateInterceptor() {
    this.http.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${this._accessToken}`;
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";
        if (this._refreshToken) {
          config.headers["Cookie"] = `refresh_token=${this._refreshToken};`;
        }
        return config;
      },
      (e) => Promise.reject(e)
    );
  }

}

class _HttpForClient extends EntropyHttp {
  constructor() {
    super(PROXY_PREFIX);
    this.http.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error?.config;
        if (error?.response?.status === 401 && !config._retry) {
          config._retry = true;
          await this.refreshToken();
          return this.http(config);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
}


export async function getDashboardData(slug: string) {
  console.log("glllladsflasdlflasflasdf")
  const entropyHttp = new EntropyHttp('https://entropy-plus.herokuapp.com/api/');
  const me = await entropyHttp.getProfile(slug);
  const profSlug = me.data.profile.slug;
  const url = `https://entropy-plus.herokuapp.com/api/profiles/${profSlug}/`;
  const leaderboardUrl = `https://entropy-plus.herokuapp.com/api/leaderboard/`;
  const leaderboardResponse = await fetch(leaderboardUrl);
  const leaderboardResponseData = await leaderboardResponse.json();

  let topThreeCurators: Profile[] = [];
  if (
    Array.isArray(leaderboardResponseData) &&
    leaderboardResponseData.length > 0
  ) {
    topThreeCurators = leaderboardResponseData
      .slice(0, 3)
      .map((curator: any) => {
        const profile = {
          profile_image: {
            url: curator.profile_image,
            height_field: 100,
            width_field: 100,
          },
          id: curator.id,
          bio: curator.bio,
          name: curator.name,
          handle: curator.handle,
          twitter_handle: curator.twitter_handle,
          ig_handle: curator.ig_handle,
          website: curator.website,
          slug: curator.slug,
          admin_approved: curator.admin_approved,
          profile_views: curator.profile_views,
          seen_feed_images: curator.seen_feed_images,
          linked_feed_images: curator.liked_feed_images,
          entropy_score: curator.entropy_score,
          total_feed_impressions: curator.total_feed_impressions,
          profile_awards: curator.profile_awards,
          wallet_address: curator.wallet_address,
        };
        return profile;
      });
  }

  const response = await fetch(url);
  const responseData = await response.json();
  const rankIndex = leaderboardResponseData.findIndex(
    (profile: any) => profile.handle === slug
  );

  // const suggestedResponse = await fetch(
  //   "https://entropyplus.xyz/api/suggested-photos/"
  // );
  // const suggestedData = await suggestedResponse.json();
  // const suggestedPhotos: Photo[] = [];

  // if (Array.isArray(suggestedData) && suggestedData.length > 0) {
  //   suggestedPhotos.push(...suggestedData.slice(0, 10));
  // }

  const profile = {
    profile_image: {
      url: responseData.profile_image,
      height_field: 100,
      width_field: 100,
    },
    name: responseData.name,
    id: responseData.id,
    bio: responseData.bio,
    handle: responseData.handle,
    twitter_handle: responseData.twitter_handle,
    ig_handle: responseData.ig_handle,
    website: responseData.website,
    slug: responseData.slug,
    admin_approved: responseData.admin_approved,
    profile_views: responseData.profile_views,
    seen_feed_images: responseData.seen_feed_images,
    linked_feed_images: responseData.liked_feed_images,
    entropy_score: responseData.entropy_score,
    total_feed_impressions: responseData.total_feed_impressions,
    profile_awards: responseData.profile_awards,
    wallet_address: responseData.wallet_address,
  };
  const data = {
    profile: profile,
    rankedCurators: topThreeCurators,
    // suggestedPhotos: suggestedPhotos,
    rank: rankIndex,
    userInvitesCount: 4,
    curatedPhotosCount: responseData.liked_feed_images,
    allPhotosCount: responseData.seen_feed_images,
    acheivements: {
      isCoreCurator: true,
      isTopFivePercent: true,
      isJuiced: true,
      isArchivist: true,
    },
  };

  return { data: data };
}



export async function getSuggestedPhotos() {
  const entropyHttp = new EntropyHttp('https://entropy-plus.herokuapp.com/api/');
  const suggestedResponse = await fetch(
    "https://entropy-plus.herokuapp.com/api/suggested-photos/"
  );
  const suggestedData = await suggestedResponse.json();
  const suggestedPhotos: Photo[] = [];

  if (Array.isArray(suggestedData) && suggestedData.length > 0) {
    suggestedPhotos.push(...suggestedData.slice(0, 10));
  }

  return { data: suggestedPhotos };
}


export async function getDashboardLeaderboard() {
  const entropyHttp = new EntropyHttp('https://entropy-plus.herokuapp.com/api/');
  const leaderboardUrl = `https://entropy-plus.herokuapp.com/api/leaderboard/`;
  const leaderboardResponse = await fetch(leaderboardUrl);
  const leaderboardResponseData = await leaderboardResponse.json();

  let topThreeCurators: Profile[] = [];
  if (
    Array.isArray(leaderboardResponseData) &&
    leaderboardResponseData.length > 0
  ) {
    topThreeCurators = leaderboardResponseData
      .slice(0, 3)
      .map((curator: any) => {
        const profile = {
          profile_image: {
            url: curator.profile_image,
            height_field: 100,
            width_field: 100,
          },
          id: curator.id,
          bio: curator.bio,
          name: curator.name,
          handle: curator.handle,
          twitter_handle: curator.twitter_handle,
          ig_handle: curator.ig_handle,
          website: curator.website,
          slug: curator.slug,
          admin_approved: curator.admin_approved,
          profile_views: curator.profile_views,
          seen_feed_images: curator.seen_feed_images,
          linked_feed_images: curator.liked_feed_images,
          entropy_score: curator.entropy_score,
          total_feed_impressions: curator.total_feed_impressions,
          profile_awards: curator.profile_awards,
          wallet_address: curator.wallet_address,
        };
        return profile;
      });
  }
  const data = {
    rankedCurators: topThreeCurators,
  };

  return topThreeCurators;
}


export async function getRank(slug: string) {
  const leaderboardUrl = `https://entropy-plus.herokuapp.com/api/leaderboard/`;
  const leaderboardResponse = await fetch(leaderboardUrl);
  const leaderboardResponseData = await leaderboardResponse.json();

  let topThreeCurators: Profile[] = [];
  if (
    Array.isArray(leaderboardResponseData) &&
    leaderboardResponseData.length > 0
  ) {
    topThreeCurators = leaderboardResponseData
      .map((curator: any) => {
        const profile = {
          profile_image: {
            url: curator.profile_image,
            height_field: 100,
            width_field: 100,
          },
          id: curator.id,
          bio: curator.bio,
          name: curator.name,
          handle: curator.handle,
          twitter_handle: curator.twitter_handle,
          ig_handle: curator.ig_handle,
          website: curator.website,
          slug: curator.slug,
          admin_approved: curator.admin_approved,
          profile_views: curator.profile_views,
          seen_feed_images: curator.seen_feed_images,
          linked_feed_images: curator.liked_feed_images,
          entropy_score: curator.entropy_score,
          total_feed_impressions: curator.total_feed_impressions,
          profile_awards: curator.profile_awards,
          wallet_address: curator.wallet_address,
        };
        return profile;
      });

  }
  const rankIndex = leaderboardResponseData.findIndex(
    (profile: any) => profile.handle === slug
  );
  const data = {
    rank: rankIndex,
  };

  return { data: data };
}


export const HttpForServer = EntropyHttp.createForServer();
export const HttpForClient = EntropyHttp.createForClient();
