import './App.css'
import {useAuthCredentials} from "./hooks/useAuthCredentials.ts";
import {useEffect} from "react";
import {setApiToken} from "./api/artifactsApi.ts";
import {CharacterDashboard} from "./components/dashboard/ChacterDashboard.tsx";
import {ItemsProvider} from "./context/ItemsContext.tsx";
import {Bank} from "./components/bank/Bank.tsx";
import {LoginScreen} from "./components/login-screen/login-screen.tsx";
import {ArtifactLogs} from "./components/artifact-logs/ArtifactLogs.tsx";

function App() {
  const {token,isPersisted, login, clearToken} = useAuthCredentials();

  useEffect(() => {
    setApiToken(token)
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => clearToken();
    window.addEventListener("artifacts:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("artifacts:unauthorized", handleUnauthorized);
  }, [clearToken]);

  if (!token) {
    return <LoginScreen onSubmit={login}/>;
  }

  return (
      <ItemsProvider>
        <div className="main-menu">
            <CharacterDashboard />
            <ArtifactLogs/>
            <Bank />
            <div className="-jobs dev">JOBS</div>
            <div className="-tasks dev">TASKS</div>
            <div className="-farm dev">FARM</div>
            <button className="-settigns" onClick={clearToken}>{isPersisted  ? 'Forget my token' : 'Terminate my session' }</button>
        </div>
      </ItemsProvider>
  )
}

export default App
