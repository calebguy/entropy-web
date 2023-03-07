export const NamedRoutes = {
  Curator: "/curator",
  CuratorImage: "/curator/image/:id",
  InviteUsers: "/users/invite",
  Dashboard: "/dashboard",
  Leaderboard: "/leaderboard",
  Login: "/login",
  Me: "/me",
  Signup: "/signup",
  Sort: "/sort",
  Upload: "/upload",
};

export const AuthenticatedRoutes = [
  NamedRoutes.Curator,
  NamedRoutes.CuratorImage,
  NamedRoutes.InviteUsers,
  NamedRoutes.Dashboard,
  NamedRoutes.Leaderboard,
  NamedRoutes.Me,
  NamedRoutes.Sort,
  NamedRoutes.Upload,
];
