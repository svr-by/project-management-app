export type TSignInRes = {
  token: 'string';
};

export type TUserReq = {
  name: 'string';
  login: 'string';
  password: 'string';
};

export type TUserRes = {
  _id: 'string';
  name: 'string';
  login: 'string';
};
