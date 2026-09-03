import './App.css'
import {useAuthToken} from "./hooks/useAuthToken.ts";
import {TokenPrompt} from "./components/TokenPrompt.tsx";
import {useEffect} from "react";
import {setApiToken} from "./api/artifactsApi.ts";
import {CharacterDashboard} from "./components/dashboard/ChacterDashboard.tsx";

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
    <div className="main-menu">
      <CharacterDashboard />
      <div className="-log dev">LOGS</div>
      <div className="-bank dev">BANK</div>
      <div className="-jobs dev">JOBS</div>
      <div className="-tasks dev">TASKS</div>
      <div className="-farm dev">FARM</div>
      <button className="-settigns" onClick={clearToken}>{isPersisted  ? 'Forget my token' : 'Terminate my session' }</button>
    </div>
  )
}

export default App
