/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { LOGIN_ENDPOINT } from "../../ApiEndpoints";
import { postRequest } from "../../AxiosRequest";
import { ChatState } from "../../Context/ChatProvider";

interface UserInterface {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setRedirect } = ChatState();

  const [loader, setLoader] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<UserInterface>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement;

    setUserValue({ ...userValue, [name]: value });
  };

  const handleLoginSuccess = (userData: any) => {
    localStorage.setItem("userDetails", JSON.stringify(userData.data));
    setUser(userData.data);
    setTimeout(() => navigate("/chats"), 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    postRequest(LOGIN_ENDPOINT, userValue)
      .then((response: any) => handleLoginSuccess(response))
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  };

  console.log(localStorage.getItem("userDetails"), "local");

  useEffect(() => {
    if (localStorage.getItem("userDetails") !== null) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <>
      <div className="account-pages pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <Heading
                title="Sign in"
                description="Sign in to continue to Chat App."
              />
              <div className="card">
                <div className="card-body p-4">
                  <div className="p-3">
                    <form method="post" onSubmit={(e) => handleSubmit(e)}>
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <div className="input-group mb-3 bg-soft-light rounded-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon3"
                          >
                            <EmailIcon />
                          </span>
                          <input
                            type="text"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter Username"
                            aria-label="Enter Username"
                            aria-describedby="basic-addon3"
                            name="email"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="float-end">
                          <span
                            className="text-muted font-size-13"
                            style={{ cursor: "pointer" }}
                          >
                            Show Password
                          </span>
                        </div>
                        <label className="form-label">Password</label>
                        <div className="input-group mb-3 bg-soft-light rounded-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon4"
                          >
                            <LockIcon />
                          </span>
                          <input
                            type="password"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter Password"
                            aria-label="Enter Password"
                            aria-describedby="basic-addon4"
                            name="password"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-primary waves-effect waves-light"
                          type="submit"
                          disabled={loader}
                        >
                          {loader ? "Please wait..." : "Sign in"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Don't have an account ?{" "}
                  <a
                    onClick={() => setRedirect("/register")}
                    className="fw-medium text-primary pointer"
                  >
                    {" "}
                    Signup now{" "}
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
