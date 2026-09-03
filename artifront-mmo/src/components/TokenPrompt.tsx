import {useState} from "react";

interface TokenPromptProps {
    onSubmit: (token: string, remember: boolean) => void;
}

export function TokenPrompt({onSubmit}: TokenPromptProps) {
    const [value, setValue] = useState('');
    const [remember, setRemember] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(value, remember);
    };

    return (
        <div className="token-prompt">
            <form onSubmit={handleSubmit}>
                <label htmlFor="token">Your Artifacts API TOKEN</label>
                <input id="token" type="text"
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       placeholder="Enter/paste your token here..."
                       autoFocus
                />

                <label className="token-prompt--remember">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me on this browser.
                </label>
                <p className="token-prompt__hint">{remember ? 'Your token will be stored in your browser (local storage).' : 'Your token won\'t be stored and will be lost if you refresh this page.' }</p>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}