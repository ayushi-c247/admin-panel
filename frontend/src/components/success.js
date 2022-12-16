import React,{useState} from "react";
import { Card } from "antd";
import { Button } from "antd";
import { useDispatch, } from "react-redux";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Email Sent"
        bordered={true}
        style={{
          width: 300,
        }}
        className="ant-card-block"
      >
        <p>
          Within 10 minutes you will receive a link to reset your password by
          email to aa**********@admin-panel.com . LOG IN
        </p>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Success;
