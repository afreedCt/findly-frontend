import commonAPI from "./commonAPI";
import SERVER_URL from "./server";

export const loginAPI = async (reqBody) => {
  return await commonAPI("post", `${SERVER_URL}/api/auth/login`, reqBody);
};

export const registerAPI = async (reqBody) => {
  return await commonAPI("post", `${SERVER_URL}/api/auth/register`, reqBody);
};

export const sendOtpAPI = async (reqBody) => {
  return await commonAPI("post", `${SERVER_URL}/api/auth/send-otp`, reqBody);
};
export const verifyOtpAPI = async (reqBody) => {
  return await commonAPI("post", `${SERVER_URL}/api/auth/verify-otp`, reqBody);
};

export const getAllPostsAPI = async (searchKey,reqHeader) => {
  return await commonAPI("get", `${SERVER_URL}/api/post/all-posts/?search=${searchKey}`, "",reqHeader);
};

export const addPostAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/post/create`,
    reqBody,
    reqHeader
  );
};

export const updatePostAPI = async (postId, reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/post/update-post/${postId}`,
    reqBody,
    reqHeader
  );
};

export const deletePostAPI = async (postId, reqHeader) => {
  return await commonAPI(
    "delete",
    `${SERVER_URL}/api/post/delete-post/${postId}`,
    "",
    reqHeader
  );
};

// {claims api} start
export const getAllClaimsAPI = async (reqHeader) => {
  return await commonAPI(
    "get",
    `${SERVER_URL}/api/claim/all-claims`,
    "",
    reqHeader
  );
};

export const addClaimRequestAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/claim/add-claim`,
    reqBody,
    reqHeader
  );
};

export const updateClaimAPI = async (claimId, reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/claim/update-claim/${claimId}`,
    reqBody,
    reqHeader
  );
};

export const adminClaimsAPI = async (searchKey, reqHeader) => {
  return await commonAPI(
    "get",
    `${SERVER_URL}/api/admin/all-claims?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const getGuestPagePostsAPI = async (limit) => {
  return await commonAPI(
    "get",
    `${SERVER_URL}/api/post/guest/?limit=${limit}`,
    ""
  );
};

export const addMessageAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/message`,
    reqBody,
    reqHeader
  );
};

export const getUserMessageAPI = async (reqHeader) => {
  return await commonAPI("get", `${SERVER_URL}/api/message`, "", reqHeader);
};

export const updateMessageStatusAPI = async (messageId, reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/message/${messageId}`,
    reqBody,
    reqHeader
  );
};

export const updateUserAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/auth/update`,
    reqBody,
    reqHeader
  );
};

export const createOrderAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/donation/create-order`,
    reqBody,
    reqHeader
  );
};

export const verifyOrderAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/donation/verify`,
    reqBody,
    reqHeader
  );
};

export const FailedOrderAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/donation/failed`,
    reqBody,
    reqHeader
  );
};

export const addDonationMessageAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/message/donation`,
    reqBody,
    reqHeader
  );
};

export const getAllUsersAPI = async (searchKey,reqHeader) => {
  return await commonAPI(
    "get",
    `${SERVER_URL}/api/admin/all-users/?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const blockUserAPI = async (userId, reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/admin/user/${userId}`,
    reqBody,
    reqHeader
  );
};

export const addPostReportAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/report/post`,
    reqBody,
    reqHeader
  );
};
export const addUserReportAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/report/user`,
    reqBody,
    reqHeader
  );
};

export const getAllReportsAPI = async (reqHeader) => {
  return await commonAPI("get", `${SERVER_URL}/api/report/`, "", reqHeader);
};

export const dismissReportAPI = async (reportId, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/report/dismiss/${reportId}`,
    "",
    reqHeader
  );
};

export const dismissMessageAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/message/dismiss`,
    reqBody,
    reqHeader
  );
};

export const updateReportAPI = async (reportId, reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/report/update/${reportId}`,
    reqBody,
    reqHeader
  );
};

export const restorePostAPI = async (postId, reqBody, reqHeader) => {
  return await commonAPI(
    "put",
    `${SERVER_URL}/api/post/restore/${postId}`,
    reqBody,
    reqHeader
  );
};

export const createWarningAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/admin/warning`,
    reqBody,
    reqHeader
  );
};

export const getAllDonationAPI = async (reqHeader) => {
  return await commonAPI("get", `${SERVER_URL}/api/donation/`, "", reqHeader);
};

export const sendContactMailAPI = async (reqBody) => {
  return await commonAPI("post", `${SERVER_URL}/api/admin/contact`, reqBody);
};

export const messageCountAPI = async (reqHeader) => {
  return await commonAPI(
    "post",
    `${SERVER_URL}/api/message/count`,
    "",
    reqHeader
  );
};

export const matchedPostsAPI = async (postId,reqHeader) => {
  return await commonAPI(
    "get",
    `${SERVER_URL}/api/post/match/${postId}`,
    "",
    reqHeader
  );
};
