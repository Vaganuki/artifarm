import './App.css'
import {useAuthCredentials} from "./hooks/useAuthCredentials.ts";
import {useEffect} from "react";
import {fetchToken, setApiToken} from "./api/artifactsApi.ts";
import {CharacterDashboard} from "./components/dashboard/ChacterDashboard.tsx";
import {ItemsProvider} from "./context/ItemsContext.tsx";
import {Bank} from "./components/bank/Bank.tsx";
import {LoginScreen} from "./components/login-screen/login-screen.tsx";
import {ArtifactLogs} from "./components/artifact-logs/ArtifactLogs.tsx";
import {Farm} from "./components/farm/Farm.tsx";

function App() {
  const {accessToken,isPersisted, setToken, clearToken} = useAuthCredentials();

  useEffect(() => {
    setApiToken(accessToken)
  }, [accessToken]);

  useEffect(() => {
    const handleUnauthorized = () => clearToken();
    window.addEventListener("artifacts:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("artifacts:unauthorized", handleUnauthorized);
  }, [clearToken]);

  const handleLogin = async (username : string, password: string, remember : boolean) => {
      try {
          const token = await fetchToken(username, password);
          setToken(token, remember);
          return {success: true};
      } catch (error:any) {
          return {
              success: false,
              error: error?.response?.data?.message ?? "Identifiants ou mot de passe incorrects"
          };
      }
  }


  if (!accessToken) {
    return <LoginScreen onSubmit={handleLogin} />;
  }

  return (
      <ItemsProvider>
        <div className="main-menu">
            <CharacterDashboard />
            <ArtifactLogs/>
            <Bank />
            <Farm/>
            <div className="-jobs dev">JOBS</div>
            <div className="-tasks dev">TASKS</div>
            <div className="-settings dev">SETTINGS</div>
            <button className="-log-out" onClick={clearToken}>{isPersisted  ? 'LOG OUT' : 'Terminate my session' }</button>
        </div>
      </ItemsProvider>
  )
}

export default App
