import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { supabase } from "../supabase"; 
import "./Auth.scss"; // 스타일 적용

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // 에러 상태
  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validate = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "이름은 필수 입력입니다.";
    else if (name.length < 2) newErrors.name = "이름은 2글자 이상 입력해주세요.";

    if (!email.includes("@")) newErrors.email = "올바른 이메일 형식이 아닙니다.";

    if (password.length < 8)
      newErrors.password = "비밀번호는 최소 8자리 이상이어야 합니다.";

    if (password !== confirmPw)
      newErrors.confirmPw = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // 유저 이름도 함께 저장
      },
    });

    if (error) {
      alert("회원가입 실패 😢 → " + error.message);
    } else {
      alert("🎀 회원가입 완료! 이메일을 확인해주세요.");
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">🎀 회원가입</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <FormInput
          label="이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <FormInput
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <FormInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <FormInput
          label="비밀번호 확인"
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          error={errors.confirmPw}
        />

        <button className="auth-btn" type="submit">
          회원가입 💜
        </button>

      </form>

      <p className="redirect">
        이미 계정이 있나요? 👉{" "}
        <span onClick={() => navigate("/login")} className="link-text">
          로그인
        </span>
      </p>
    </div>
  );
}
