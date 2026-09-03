import { useCharacters } from "../hooks/useCharacters";

export function Dashboard() {
    const { characters, isLoading, error, refresh } = useCharacters(10000); // refresh 10s

    if (isLoading) return <p>Chargement des personnages...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h2>Mes personnages</h2>
                <button onClick={refresh}>Rafraîchir</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Niveau</th>
                    <th>HP</th>
                    <th>Position</th>
                    <th>Tâche</th>
                    <th>Cooldown</th>
                </tr>
                </thead>
                <tbody>
                {characters.map((char) => (
                    <tr key={char.name}>
                        <td>{char.name}</td>
                        <td>{char.level}</td>
                        <td>{char.hp} / {char.max_hp}</td>
                        <td>({char.x}, {char.y})</td>
                        <td>{char.task || "—"}</td>
                        <td>
                            {new Date(char.cooldown_expiration) > new Date()
                                ? `${char.cooldown}s`
                                : "Prêt"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}