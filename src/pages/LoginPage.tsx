import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <img src="/images/logo.png" width={140} />
      <form className="bg-white max-w-lg w-full p-10 rounded-lg flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          type="email"
          id="Email"
          placeholder="Email"
          className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
          value={email}
          onChange={({ target }) => setEmail(target?.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
          value={password}
          onChange={({ target }) => setPassword(target?.value)}
        />
        <button
          type="submit"
          className="inline-block rounded bg-primary p-3 text-sm text-center font-medium text-white focus:ring-3 focus:outline-hidden"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}