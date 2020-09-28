export const getOrderRecordName = orderId => `hsa-dsOrder/${orderId}`;
export const getExternalOrderRecordName = orderId =>
  `hsa-dsExternalOrder/${orderId}`;
export const getWalletRecordName = userId => `hsa-dsClientWallet/${userId}`;
export const getChatListName = conversationID =>
  `hsa-ds-conversations/${conversationID}/messages`;
export const getChatTypingName = (conversationID, id) =>
  `${conversationID}/${id}`;
export const getChatCountRecordName = (userType, userId) =>
  `hsa-ds-conversations-messages-count/${userType}s/${userId}`;
export const getNotificationRecordName = userId =>
  `hsa-dsNotificationsCount/clients/${userId}`;

export const getIssueDetailsRecordName = (userId,recordId) =>
  `hsa-ds-comment/${userId}/${recordId}`;

export const getIssueDetailsListName = issueId =>
  `hsa-ds-comments/${issueId}/comments`;