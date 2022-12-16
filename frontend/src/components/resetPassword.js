import React, { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../css/common.css";

import { resetPasswordSlice } from "../redux/slice/auth-slice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { otp } = useSelector((state) => state.auth);
  console.log("params 00000000000000->", otp);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(otp, "Received values of form:hjghjghjghjghjghjgjgj ", values);
    setLoading(true);
    dispatch(
      resetPasswordSlice({
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
        email: otp.email,
        verifyToken: otp.verifyToken,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/success")
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="from-vertical-center">
      <div className="form-center">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="subHeading">
            <h3 className="user-login">Enter your Password</h3>
            <h4>Enter your new password and confirm password</h4>
          </div>
          <h4 className="input-lable">New Password</h4>{" "}
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "You are required to enter your new password",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined  className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <h4 className="input-lable">Confirm Password</h4>{" "}
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "You are required to enter your confirm password",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined  className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
