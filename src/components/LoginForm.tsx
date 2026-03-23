import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "./FireBase/firebaseConfig";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [view, setView] = useState<"login" | "register" | "reset">("login");
  const [message, setMessage] = useState("");

  // Funzione login classico
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Email o password non corretti.");
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Doppio check della password
    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setError(
        "Errore durante la registrazione. Email già in uso o password troppo debole",
      );
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError(
        "Per favore, inserisci la tua email per ricevere il link di ripristino",
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Email di ripristino inviata! Controlla la tua casella di posta.",
      );
      setTimeout(() => setView("login"), 5000);
    } catch (err: any) {
      setError("Errore: controlla che l'email sia corretta.");
    }
  };

  // Funzione per il login con Google
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError("Errore durante l'accesso con Google");
    }
  };

  // // Funzione per pulire i cambi ad ogni cambio form
  // const toggleForm = () => {
  //   setIsRegistering(!isRegistering);
  //   setError("");
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  //   setUsername("");
  // };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 py-3 sm:max-w-xl sm:mx-auto w-full">
      <div className="relative px-4 py-10 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto text-white">
          {/* LOGO */}
          <div className="flex items-center space-x-5 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img src="/emojione--movie-camera.png" alt="icon-camera" />
            </div>
            <span className="text-xl font-bold text-foreground">
              <img
                src="/logo_MoodFlix.png"
                alt="logo"
                className="h-10 object-contain"
              />
            </span>
          </div>

          {/* TITOLO FORM */}
          {/* <h2 className="text-center font-bold text-xl mb-4">
            {isRegistering ? "Crea un account" : "Bentornato"}
          </h2> */}

          {/* MESSAGGI DI ERRORE O SUCCESSO */}
          {error && (
            <p className="text-red-500 text-xs font-semibold mb-3 text-center">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-500 text-xs font-semibold mb-3 text-center">
              {message}
            </p>
          )}

          {/* LOGIN VIEW */}

          {view === "login" && (
            <form onSubmit={handleEmailLogin}>
              <h2 className="text-center font-bold text-xl mt-3 mb-3">
                Accedi a MoodFlix
              </h2>
              <label className="font-semibold text-sm text-gray-400 pb-1 block">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 focus:border-[#7c0c92] outline-none"
              />
              <label className="font-semibold text-sm text-gray-400 pb-1 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full bg-gray-700 focus:border-[#7c0c92] outline-none"
              />

              <div className="text-right mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setView("reset");
                    setError("");
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-[#7c0c92] transition-colors"
                >
                  Password dimenticata?
                </button>
              </div>

              <button
                type="submit"
                className="py-2 px-4 bg-[#7c0c92] hover:bg-[#620a74] text-white w-full transition duration-200 font-semibold rounded-lg"
              >
                Accedi
              </button>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-40"></span>
                <p
                  className="text-xs text-gray-500 uppercase dark:text-gray-500 hover:text-white cursor-pointer"
                  onClick={() => setView("register")}
                >
                  O registrati
                </p>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-40"></span>
              </div>
            </form>
          )}
          {/* REGISTER VIEW */}
          {view === "register" && (
            <form onSubmit={handleEmailRegister}>
              <h2 className="text-center font-bold text-xl mt-3 mb-3">
                Crea Account
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <div>
                  <label
                    className="font-semibold text-sm text-gray-400 pb-1 block"
                    htmlFor="reg-username"
                  >
                    Username
                  </label>
                  <input
                    id="reg-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-[#7c0c92] focus:ring-4 focus:ring-[#7c0c92]"
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-sm text-gray-400 pb-1 block"
                    htmlFor="reg-email"
                  >
                    Email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-[#7c0c92] focus:ring-4 focus:ring-[#7c0c92]"
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-sm text-gray-400 pb-1 block"
                    htmlFor="reg-password"
                  >
                    Password
                  </label>
                  <input
                    id="reg-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-[#7c0c92] focus:ring-4 focus:ring-[#7c0c92]"
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-sm text-gray-400 pb-1 block"
                    htmlFor="reg-confirm-password"
                  >
                    Conferma Password
                  </label>
                  <input
                    id="reg-confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-[#7c0c92] focus:ring-4 focus:ring-[#7c0c92]"
                  />
                </div>
              </div>

              <div className="mt-9">
                <button
                  type="submit"
                  className="py-2 px-4 bg-gray-800 hover:bg-[#7c0c92] text-white w-full transition-colors duration-300 text-center text-base font-semibold shadow-md rounded-lg"
                >
                  Registrati
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-24"></span>
                <p
                  className="text-xs text-center text-gray-500 uppercase dark:text-gray-500 hover:text-white cursor-pointer"
                  onClick={() => setView("login")}
                >
                  Hai già un account? Fai il Login
                </p>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-24"></span>
              </div>
            </form>
          )}

          {/* RESET PASSWORD VIEW */}
          {view === "reset" && (
            <form onSubmit={handlePasswordReset}>
              <h2 className="text-center font-bold text-xl mt-3 mb-3">
                Ripristina Password
              </h2>
              <p className="text-gray-400 text-xs text-center mb-6">
                Inserisci la tua email e ti invieremo un link per impostare una
                nuova password.
              </p>

              <label className="font-semibold text-sm text-gray-400 pb-1 block">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-600 rounded-lg px-3 py-2 mt-1 mb-6 text-sm w-full bg-gray-700 focus:border-[#7c0c92] outline-none"
              />

              <button
                type="submit"
                className="py-2 px-4 bg-[#7c0c92] hover:bg-[#620a74] text-white w-full transition duration-200 font-semibold rounded-lg mb-4"
              >
                Invia Link
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-xs font-semibold text-gray-500 hover:text-white"
                >
                  Torna al Login
                </button>
              </div>
            </form>
          )}

          {/* BOTTONI SOCIAL */}
          {view !== "reset" && (
            <div className="flex justify-center items-center flex-col gap-4 pt-5">
              {/* BOTTONE GOOGLE */}
              <p className="font-semibold text-sm text-gray-400 pb-1">
                Accedi con account Google
              </p>
              <svg
                className="cursor-pointer"
                onClick={handleGoogleLogin}
                viewBox="0 0 24 24"
                height={25}
                width={25}
                y="0px"
                x="0px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                  fill="#F44336"
                />
                <path
                  d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                  fill="#2196F3"
                />
                <path
                  d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                  fill="#FFC107"
                />
                <path
                  d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                  fill="#00B060"
                />
                <path
                  opacity=".1"
                  d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
                />
                <polygon
                  opacity=".1"
                  points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
                />
                <path
                  d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                  fill="#E6E6E6"
                />
                <path
                  opacity=".2"
                  d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                  fill="#FFF"
                />
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  y2={12}
                  y1={12}
                  x2={24}
                  x1={0}
                  id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1"
                >
                  <stop stopOpacity=".2" stopColor="#fff" offset={0} />
                  <stop stopOpacity={0} stopColor="#fff" offset={1} />
                </linearGradient>
                <path
                  d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                  fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"
                />
                <path
                  opacity=".1"
                  d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"
                />
                <path
                  opacity=".2"
                  d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                  fill="#FFF"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
