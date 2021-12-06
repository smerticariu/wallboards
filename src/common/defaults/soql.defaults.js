// Salesforce queries
export const SOQL = {
  GET_USERS_PHOTOS: "Select id, name, SmallPhotoUrl, FullPhotoUrl From User",
  GET_USERS_IDS: "Select name, nbavs__User__c,nbavs__Id__c, id From nbavs__User__c",
}