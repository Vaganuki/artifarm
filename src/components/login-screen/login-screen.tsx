import {useState} from "react";

interface LoginPromptProps {
    onSubmit: (
        username: string,
        password: string,
        remember: boolean,) => Promise<{success: boolean, error?: string}>;
}

export function LoginScreen({onSubmit}: LoginPromptProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        const result = await onSubmit(username, password, remember);
        setIsSubmitting(false);
        if(!result.success){
            setError(result.error ?? 'Unknown error');
        }
    }

    return (
        <div className="login-prompt">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    autoFocus
                    />
                <label htmlFor="password">Password</label>
                <input id="password" type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    />
                <label className="login-prompt--remember">
                    <input type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        />
                    Remember me on this browser.
                </label>

                {error && <p className="login-prompt__error">{error}</p>}
                <button type="submit">
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </div>
    );
}