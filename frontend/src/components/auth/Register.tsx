import React, { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { postRequest } from "../../AxiosRequest";
import { REGISTER_ENDPOINT } from "../../ApiEndpoints";
import { ChatState } from "../../Context/ChatProvider";

interface UserInterface {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { setRedirect } = ChatState();

  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    postRequest(REGISTER_ENDPOINT, user)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  };

  return (
    <>
      <div className="account-pages pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <Heading
                title="Sign up"
                description="Get your Chat App account now."
              />
              <div className="card">
                <div className="card-body p-4">
                  <div className="p-3">
                    <form method="post" onSubmit={(e) => handleSubmit(e)}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="input-group bg-soft-light rounded-3  mb-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon5"
                          >
                            <EmailIcon />
                          </span>
                          <input
                            type="email"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Email"
                            aria-label="Enter Email"
                            aria-describedby="basic-addon5"
                            name="email"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <div className="input-group bg-soft-light mb-3 rounded-3">
                          <span
                            className="input-group-text border-light text-muted"
                            id="basic-addon6"
                          >
                            <PersonIcon />
                          </span>
                          <input
                            type="text"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Username"
                            aria-label="Enter Username"
                            aria-describedby="basic-addon6"
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <div className="input-group bg-soft-light mb-3 rounded-3">
                          <span
                            className="input-group-text border-light text-muted"
                            id="basic-addon7"
                          >
                            <LockIcon />
                          </span>
                          <input
                            type="password"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Password"
                            aria-label="Enter Password"
                            aria-describedby="basic-addon7"
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
                          {loader ? "Please wait..." : "Sign up"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <a
                    onClick={() => setRedirect("/")}
                    className="fw-medium text-primary pointer"
                  >
                    {" "}
                    Signin{" "}
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

export default Register;
