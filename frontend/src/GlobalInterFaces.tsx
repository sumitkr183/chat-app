export interface UserFilterInterface {
  _id: string;
  name: string;
  image: string;
}

export interface MessageInterface {
  readBy: [];
  _id: string;
  sender: {
    image: string;
    _id: string;
    name: string;
    email: string;
  };
  content: string;
  chat: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ChatInterface {
  isGroupChat: boolean;
  users: [];
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  lastMessage: {
    readBy: [];
    _id: string;
    sender: {
      image: string;
      _id: string;
      name: string;
      email: string;
    };
    content: string;
    chat: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}
