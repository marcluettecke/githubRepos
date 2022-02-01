export interface RepositoryInfo {
  name: string,
  owner: string,
  avatarUrl: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  homepageUrl: string
}

export interface AllRepositoryInfo {
  count: number,
  endCursor: string
  data: RepositoryInfo[]
}
