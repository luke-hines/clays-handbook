type UserLike = {
  publicMetadata?: Record<string, unknown>
} | null | undefined

export function hasCourseAccess(user: UserLike): boolean {
  return user?.publicMetadata?.courseAccess === true
}

export function hasSubscription(user: UserLike): boolean {
  return user?.publicMetadata?.subscriptionActive === true
}
