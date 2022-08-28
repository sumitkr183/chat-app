import { MessageInterface, UserFilterInterface } from "./GlobalInterFaces";

export const getSenderName = (
  loggedInUserId: string,
  users: UserFilterInterface[]
) => {
  return users[0]._id === loggedInUserId ? users[1].name : users[0].name;
};

export const getSenderId = (
  loggedInUserId: string,
  users: UserFilterInterface[]
) => {
  return users[0]._id === loggedInUserId ? users[1]._id : users[0]._id;
};

export const getSenderImage = (
  loggedInUserId: string,
  users: UserFilterInterface[]
) => {
  return users[0]._id === loggedInUserId ? users[1].image : users[0].image;
};

export const checkLastMessageSender = (
  loggedInUserId: string,
  message: MessageInterface
) => {
  return message.sender._id === loggedInUserId ? "You" : message.sender.name;
};
