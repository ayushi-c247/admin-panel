import React, { useState } from "react";
import {  UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../css/common.css";
import { otpSlice } from "../redux/slice/auth-slice";

const Otp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const verifyToken = searchParams.get("verifyToken");

  const onFinish = (values) => {
    const { otp } = values;
    setLoading(true);
    dispatch(otpSlice({ otp, email, verifyToken }))
      .then(() => {
        navigate("/reset-password");
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
            <h3 className="user-login">Enter confirmation code</h3>
            <h4>Enter the 6-digit code we sent to your register mail</h4>
          </div>
          <Form.Item
            name="otp"
            type="number"
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
