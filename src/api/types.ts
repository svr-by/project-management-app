export type TSignInParams = {
  login: string;
  password: string;
};

export type TSignInRes = {
  token: string;
};

export type TUserPrams = {
  name: string;
  login: string;
  password: string;
};

export type TUserRes = {
  _id: string;
  name: string;
  login: string;
};

export type TBoardParams = {
  title: string;
  owner: string;
  users: string[];
};

export type TBoardRes = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type TColParams = {
  title: string;
  order: number;
};

export type TColParamsExt = TColParams & { boardId: string };

export type TListColParams = {
  _id: string;
  order: number;
};

export type TColRes = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type TTaskParams = {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
};

export type TTaskParamsExt = TTaskParams & { columnId: string };

export type TTaskRes = {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
};

export type TTaskResExt = TTaskRes & { _id: string; boardId: string; columnId: string };

export type TTaskSet = {
  _id: string;
  order: number;
  columnId: string;
};
