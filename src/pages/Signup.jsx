import { useState } from "react";
import { supabase } from "../services/supabase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Send Welcome Email
    try {
      const response = await fetch("/api/send-welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      if (!response.ok) {
        console.log("Email could not be sent.");
      }
    } catch (err) {
      console.error("Email Error:", err);
    }

    alert("Signup Successful! Welcome email has been sent.");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;