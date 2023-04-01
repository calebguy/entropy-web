import axios, { AxiosInstance } from "axios";
import React, { useContext } from 'react';
import { PROXY_PREFIX } from "../constants";
import env from "../environment";
import { LoginDto, PostLoginResponse, Profile, GetLeaderboardResponse } from "../interfaces";
import { AuthTokens } from "./../interfaces/index";
import {
  GET_MOCK_DASHBAORD_RESPONSE,
  GET_MOCK_GET_CURATOR_IMAGE_RESPONSE,
  GET_MOCK_GET_SORT_RESPONSE,
  GET_MOCK_LEADERBOARD_RESPONSE,
  GET_MOCK_PROFILE_RESPONSE,
} from "./mocks";
import AppStore from "../store/App.store";
import { Console } from "console";

interface MeProps {
  me: Profile;
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
    formData.append("picture", image[0]);

    formData.append("image_source", imageSource);
    return this.http.post("/api/upload/image/", formData);
  }

  async joinWaitlist(email: string) {
    return this.http.post("/api/waitlist/", { email });
  }

  async getProfileSlug() {
    const me = await this.getProfile("brian");
    const profile = me.data.profile.slug;
    const url = `https://entropy-plus.herokuapp.com/api/profiles/${profile}/`;
    const response = await fetch(url);
    const profileData = await response.json();
    const data = profileData[0]
    console.log("data", data)
    return data;
  }


  async getProfile(slug: string) {
    return { data: GET_MOCK_PROFILE_RESPONSE() };
  }

  async getCurrentProfile() {
    return { data: GET_MOCK_PROFILE_RESPONSE() };
    // return this.http.get<GetProfileResponse>(`/profile/${slug}`);
  }



  async getImageData() {
    const profile = await this.getProfile("brian");
    const slug = profile.data.profile.slug;
    const url = `https://entropy-plus.herokuapp.com/api/v1/images/?slug=${slug}`;
    const response = await fetch(url);
    const imageData = await response.json();
    const data = imageData[0]
    console.log("data", data)
    return data;
  }
  async getTwitterChannels() {
    const response = await fetch("https://entropy-plus.herokuapp.com/api/v1/twitter-channels/");
    const data = await response.json();
    return data;
  }
  async getSort() {
    const imageData = await this.getImageData();
    const twitterChannels = await this.getTwitterChannels();
    const data = { image: imageData, twitter_channels: twitterChannels, current_channel: twitterChannels[0] }
    return { data: data };
    // return this.http.get<GetSortResponse>("/sort");
  }
  async approveImage() {
    const httpServer = new _HttpForServer(); // create instance of _HttpForServer
    await httpServer.updateInterceptor(); // Set up interceptor before making request

    try {
      const profile = await this.getProfile("brian");
      const slug = profile.data.profile.slug;
      const imageData = await this.getImageData();
      const url = `https://entropy-plus.herokuapp.com/api/images/${imageData.id}/update/?slug=${slug}`;

      const response = await this.http.patch(url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async declineImage() {
    const httpServer = new _HttpForServer(); // create instance of _HttpForServer
    await httpServer.updateInterceptor(); // Set up interceptor before making request

    try {
      const profile = await this.getProfile("brian");
      const slug = profile.data.profile.slug;
      const imageData = await this.getImageData();
      const url = `https://entropy-plus.herokuapp.com/api/images/${imageData.id}/update/decline/?slug=${slug}`;

      const response = await this.http.patch(url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getCuratorImage(curatorSlug: string, id: string) {
    return { data: GET_MOCK_GET_CURATOR_IMAGE_RESPONSE(Number(id)) };
    // return this.http.get<GetCuratorImageResponse>(`${curatorSlug}/image/${id}`);
  }

  async getDashboard() {
    try {
      const me = await this.getProfile("brian");
      const slug = me.data.profile.slug;
      const url = `https://entropy-plus.herokuapp.com/api/profiles/${slug}/`;

      // leaderboard data
      const leaderboardUrl = `https://entropy-plus.herokuapp.com/api/leaderboard/`;
      const leaderboardResponse = await fetch(leaderboardUrl);
      const leaderboardResponseData = await leaderboardResponse.json();

      const topThreeCurators = leaderboardResponseData.slice(0, 3).map((curator) => {
        const profile = {
          profile_image: {
            url: curator.profile_image,
            height_field: 100,
            width_field: 100,
          },
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

      console.log(topThreeCurators)


      const response = await fetch(url);
      const responseData = await response.json();
      const profile = { profile_image: { url: responseData.profile_image, height_field: 100, width_field: 100 }, name: responseData.name, handle: responseData.handle, twitter_handle: responseData.twitter_handle, ig_handle: responseData.ig_handle, website: responseData.website, slug: responseData.slug, admin_approved: responseData.admin_approved, profile_views: responseData.profile_views, seen_feed_images: responseData.seen_feed_images, linked_feed_images: responseData.liked_feed_images, entropy_score: responseData.entropy_score, total_feed_impressions: responseData.total_feed_impressions, profile_awards: responseData.profile_awards, wallet_address: responseData.wallet_address }

      const data = {
        profile: profile, rankedCurators: topThreeCurators, rank: 10, userInvitesCount: 4, curatedPhotosCount: 103, allPhotosCount: responseData.seen_feed_images, acheivements: { isCoreCurator: true, isTopFivePercent: true, isJuiced: true, isArchivist: true, }
      }
      return { data: data };
    } catch (error) {
      console.error(error);
    }
    return { data: data };
  }


  async getLeaderboard() {
    const url = `https://entropy-plus.herokuapp.com/api/leaderboard/`;
    const response = await fetch(url);
    const responseData = await response.json();
    const curators: Profile[] = []; // create an array variable

    // iterate through each object in responseData and push to curators array
    for (const data of responseData) {
      const profile = {
        profile_image: { url: data.profile_image, height_field: 100, width_field: 100 },
        name: data.name,
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
        wallet_address: data.wallet_address
      }
      curators.push(profile);
    }

    const GET_MOCK_LEADERBOARD_RESPONSE = (): GetLeaderboardResponse => ({
      curators: curators // set the array as the value for curators property
    });

    return { data: GET_MOCK_LEADERBOARD_RESPONSE() };

    // return this.http.get<GetLeaderboardResponse>("/leaderboard");
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

export const HttpForServer = EntropyHttp.createForServer();
export const HttpForClient = EntropyHttp.createForClient();
