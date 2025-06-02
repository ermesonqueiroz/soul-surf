import { useState } from "react"

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <img src="/images/logo.png" width={140} />
      <div className="bg-white max-w-lg w-full p-10 rounded-lg flex flex-col gap-4">
        <label htmlFor="Email" className="relative">
          <input
            type="email"
            id="Email"
            placeholder=""
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
          />

          <span
            className="absolute inset-y-0 start-3 bg-white -translate-y-5 px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2"
          >
            Email
          </span>
        </label>

        <input
          type="password"
          placeholder="Senha"
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
          value={password}
          onChange={({ target }) => setPassword(target?.value)}
        />
      </div>
    </div>
  )
}