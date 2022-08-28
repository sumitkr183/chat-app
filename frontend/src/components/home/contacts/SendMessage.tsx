import React from "react";
import SendIcon from "@material-ui/icons/Send";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

interface PropsInterface {
  inputMessage: string;
  handleInputChange: (e: React.FormEvent<EventTarget>) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SendMessage = ({
  inputMessage,
  handleInputChange,
  handleSendMessage,
}: PropsInterface) => {
  return (
    <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
      <form
        method="post"
        className="row g-0"
        onSubmit={(e) => handleSendMessage(e)}
      >
        <div className="col">
          <input
            type="text"
            className="form-control form-control-lg bg-light border-light"
            placeholder="Enter Message..."
            value={inputMessage}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="col-auto">
          <div className="chat-input-links ms-md-2 me-md-0">
            <ul className="list-inline mb-0">
              <li
                className="list-inline-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Emoji"
              >
                <button
                  type="button"
                  className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                >
                  <EmojiEmotionsIcon className="ri-emotion-happy-line" />
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  type="submit"
                  className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light"
                >
                  <SendIcon className="ri-send-plane-2-fill" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
