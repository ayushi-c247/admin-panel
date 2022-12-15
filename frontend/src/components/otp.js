import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./login.css";

import { otpSlice } from "../redux/slice/auth-slice";

const Otp = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setLoading(true);
    dispatch(otpSlice({ otp: values.otp}))
      .unwrap()
      .then(() => {
        navigate("/success");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="from-vertical-center">
      <div className="form-center">
        <h2 className="main-heading"> Enter confirmation code</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="subHeading">
          <h3 className="user-login">Enter confirmation code</h3>
            <h4>Enter the 4-digit code we sent to your register mail</h4>
          </div>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "You are required to enter your Otp",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Otp"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Otp;
