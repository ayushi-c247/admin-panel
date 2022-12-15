import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { clearMessage } from "../redux/slice/message-slice";
import { loginSlice } from "../redux/slice/auth-slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
       navigate("/dashboard")
    }
  }, [isLoggedIn]);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setLoading(true);
    dispatch(loginSlice({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="from-vertical-center">
      <div className="form-center">
        <h2 className="main-heading"> Admin-Panel</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="subHeading">
            <h3 className="user-login">Login</h3>
            <h4>Enter your details to login to your account:</h4>
          </div>
          <h4 className="input-lable">Email</h4>{" "}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "You are required to enter your Email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <h4 className="input-lable">Password</h4>{" "}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "You are required to enter your Password",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOG IN
            </Button>

            <a className="login-form-forgot" href="/forget-password">
              Forgot Password?
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
