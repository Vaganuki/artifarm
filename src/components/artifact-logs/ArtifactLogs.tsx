import {useLogs} from "../../hooks/useLogs.ts";
import './artifactLogs.scss';

export function ArtifactLogs() {
    const logs = useLogs();

    return(
        <div className="-logs artifact-logs">
            {logs.map((log) => (
                <p key={log.id} className={`log log--${log.level}`}>
                    {log.character && <span className="log-character">[{log.character}]</span>}
                    {" "}{log.message}
                </p>
            ))}
        </div>
    );
}