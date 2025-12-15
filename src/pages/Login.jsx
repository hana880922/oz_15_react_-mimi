import { useState } from "react";
import { supabase } from "../supabase";
import FormInput from "../components/FormInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("로그인 실패: 이메일 또는 비밀번호가 틀렸습니다 ❌");
      return;
    }

    alert("🎀 로그인 성공!");
  }

  return (
    <div className="auth-container">
      <h2>로그인</h2>

      <FormInput label="이메일" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />

      <FormInput label="비밀번호" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} error={error}/>

      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
