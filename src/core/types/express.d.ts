declare namespace Express {
  export interface Response {
    respond: (data: any) => void;
  }
  export interface Request {
    currentUser: import('user/schema').User;
    file: any;
    files: any;
  }
}
