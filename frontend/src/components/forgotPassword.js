import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/common.css";
import { forgetPasswordSlice } from "../redux/slice/auth-slice";

const ForgotPassword = () => {
  //const history = useHistory();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoading(true);
    dispatch(forgetPasswordSlice({ email: values.email }))
      .unwrap()
      .then(() => {
        navigate("/success");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // const handleClick=()=> {
  //   history.push("/");
  // }
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
            <h3 className="user-login">Forgot Password ?</h3>
            <h4>
              Enter your email address that you used to register. we'll send you
              an email with a link to reset your password.
            </h4>
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Send Reset Link
            </Button>
            <Link to={"/"} className="login-form-forgot">
              Back to Log in?
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
