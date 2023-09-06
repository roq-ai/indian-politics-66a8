const mapping: Record<string, string> = {
  guests: 'guest',
  organizations: 'organization',
  'performance-assessments': 'performance_assessment',
  politicians: 'politician',
  'profile-usages': 'profile_usage',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
