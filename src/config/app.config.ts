interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Guest'],
  tenantRoles: ['Administrator', 'Politician', 'Data Analyst', 'Profile Manager'],
  tenantName: 'Organization',
  applicationName: 'Indian Politics',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    "View Politician's profiles",
    'Search for Politicians by name',
    'View the most popular Politician profiles',
  ],
  ownerAbilities: [
    'Manage Politician profiles and information',
    'Manage users and their roles',
    'Invite new users to the application',
    "Manage the organization's data and profiles",
  ],
};
