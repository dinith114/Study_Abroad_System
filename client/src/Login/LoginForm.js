import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import Login from "../Images/login.jpg";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data.success) {
        const isAdmin = response.data.isAdmin;
        localStorage.setItem("isAdmin", isAdmin);
        navigate("/");
      } else {
        message.error("Invalid username or password");
      }
    } catch (err) {
      message.error("Invalid username or password");
    }
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img
          src={Login} // Replace this with the actual image URL
          alt="Handshake"
          style={styles.image}
        />
      </div>
      <div style={styles.loginSection}>
        <div style={styles.loginBox}>
          <h2 style={styles.heading}>Staff Login</h2>
          <p style={styles.welcomeText}>Welcome back!</p>
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Member Name"
              name="username"
              rules={[
                { required: true, message: "Please input your Staff ID!" },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={styles.loginButton}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
    padding: "0 20px", // Add some padding to bring the image and form closer
  },
  imageSection: {
    flex: 0.8, // Make the image section smaller
    display: "flex",
    justifyContent: "flex-end", // Align the image section to the right
    marginRight: "-300px", // Reduce space between the image and the form
  },
  image: {
    maxWidth: "80%",
    height: "auto",
  },
  loginSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    backgroundColor: "#e7f0fb",
    padding: "60px",
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#000",
  },
  welcomeText: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #d1d9e6",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#1e90ff",
    color: "#fff",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default LoginForm;
