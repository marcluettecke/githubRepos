export interface UserInfo {
  name: string;
  avatarUrl: string;
  company: string;
  email: string;
  location: string;
  websiteUrl: string;
  repositories: {
    name: string;
    url: string;
  }[]
}
