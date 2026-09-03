import './App.css'
import {useAuthToken} from "./hooks/useAuthToken.ts";
import {TokenPrompt} from "./components/TokenPrompt.tsx";
import {useEffect} from "react";
import {setApiToken} from "./api/artifactsApi.ts";
import {Dashboard} from "./components/Dashboard.tsx";

function App() {
  const {token,isPersisted, setToken, clearToken} = useAuthToken();

  useEffect(() => {
    setApiToken(token)
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => clearToken();
    window.addEventListener("artifacts:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("artifacts:unauthorized", handleUnauthorized);
  }, [clearToken]);

  if (!token) {
    return <TokenPrompt onSubmit={setToken}/>;
  }

  return (
    <div>
      <Dashboard />
      <button onClick={clearToken}>{isPersisted  ? 'Forget my token' : 'Terminate my session' }</button>
    </div>
  )
}

export default App
