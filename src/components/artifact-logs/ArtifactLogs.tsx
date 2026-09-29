import {useLogs} from "../../hooks/useLogs.ts";
import './artifactLogs.scss';
import {useEffect, useRef} from "react";

export function ArtifactLogs() {
    const logs = useLogs();

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    })

    return(
        <div className="-logs">
            <div className="logs-screen">
                {logs.map((log) => (
                    <p key={log.id} className={`log log--${log.level}`}>
                        {log.character && <span className="log-character">[{log.character}]</span>}
                        {" "}{log.message}
                    </p>
                ))}
                <div ref={bottomRef}/>
            </div>
            <div className="logs-menu">
                <div className="logs-menu-title">FILTER</div>
                <div className="logs-menu-buttons">
                    <button>ALL</button>
                    <button>CHAR 1</button>
                    <button>CHAR 2</button>
                    <button>CHAR 3</button>
                    <button>CHAR 4</button>
                    <button>CHAR 5</button>
                    <button>SUCCESS</button>
                    <button>INFO</button>
                    <button>WARN</button>
                    <button>ERROR</button>
                </div>
            </div>
        </div>
    );
}