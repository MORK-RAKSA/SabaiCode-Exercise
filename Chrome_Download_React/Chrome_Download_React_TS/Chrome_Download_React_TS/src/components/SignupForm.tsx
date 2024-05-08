import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "morkraksa@gmail.com",
    username: "raksamork",
    password: "123",
    confirmPassword: "1234",
  });
  const [errors, setErrors] = useState({
    email: false,
    passwordMatch: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: any) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    setErrors({ email: false, passwordMatch: false });

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordMatch: true }));
      setIsSubmitting(false);
      return;
    }

    console.log("Form Data:", formData);
    setFormData({ email: "", username: "", password: "", confirmPassword: "" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderRadius: 10,
        maxWidth: 400,
        margin: "auto",
        marginTop: 5,
        backgroundColor: "#fff",
        border: "1px solid #eee",
      }}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1 style={{color:'#1976d2'}}>Signup Form</h1>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "Invalid email address" : ""}
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        {/* <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          variant="outlined"
        /> */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.passwordMatch}
          helperText={errors.passwordMatch ? "Passwords do not match" : ""}
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled= {isSubmitting}
          sx={{
            mt: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};
export default SignupForm;
