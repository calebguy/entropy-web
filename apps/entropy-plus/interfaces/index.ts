export interface Photo {}

export interface Profile {}

export interface TwitterChannel {
  profile_image_url: string;
  screen_name: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
