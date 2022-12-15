// import React, { useEffect, useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import "./login.css";

// import { resetPasswordSlice } from "../redux/slice/auth-slice";

// const ResetPassword = () => {
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//     setLoading(true);
//     dispatch(resetPasswordSlice({ email: values.email }))
//       .unwrap()
//       .then(() => {
//         navigate("/success");
//         window.location.reload();
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="from-vertical-center">
//       <div className="form-center">
//         <Form
//           name="normal_login"
//           className="login-form"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//         >
//           <div className="subHeading">
//             <h3 className="user-login">Enter your Password</h3>
//             <h4>Enter your new password and confirm password</h4>
//           </div>
//           <h4 className="input-lable">Email</h4>{" "}
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "You are required to enter your new password",
//               },
//             ]}
//           >
//             <Input
//               prefix={<UserOutlined className="site-form-item-icon" />}
//               placeholder="New Password"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "You are required to enter your confirm password",
//               },
//             ]}
//           >
//             <Input
//               prefix={<UserOutlined className="site-form-item-icon" />}
//               placeholder="Confirm Password"
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="login-form-button"
//             >
//                Reset 
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
