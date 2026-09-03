import './character_dashboard.scss';
import { useCharacters } from "../../hooks/useCharacters.ts";
import {CooldownBar} from "./CooldownBar.tsx";

export function CharacterDashboard() {
    const { characters, isLoading, error} = useCharacters();

    if (isLoading) return <p>Chargement des personnages...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (

        <div className="character-dashboard">
            {characters.map((character) => (
                <div className="char-card" key={character.name}>
                    <CooldownBar character={character} />
                    <div className="char-card-left">
                        <img src={`https://play.artifactsmmo.com/images/characters/${character.skin}.png`} alt={`${character.name}'s skin`} />
                        <p>LVL {character.level}</p>
                    </div>
                    <div className="char-card-right">
                        <p className="char-card-name">{character.name}</p>
                        <div className="char-card-data">
                            <div className="hp-bar-container">
                                <div className="hp-label">{ character.hp } / {character.max_hp} HP</div>
                                <div className="hp-bar" style={{width: `${(character.hp / character.max_hp) * 100}%`}}/>
                            </div>
                            <div className="xp-bar-container">
                                <div className="xp-label">{character.xp} / {character.max_xp} XP</div>
                                <div className="xp-bar" style={{width: `${(character.xp / character.max_xp) * 100}%`}}></div>
                            </div>
                            <p>({character.x},{character.y})</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>



        /*
        <div className="dashboard">
            <div className="dashboard__header">
                <h2>Mes personnages</h2>
                <button onClick={refresh}>Rafraîchir</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>SKIN</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>HP</th>
                    <th>Position</th>
                    <th>Task</th>
                    <th>Cooldown</th>
                </tr>
                </thead>
                <tbody>
                {characters.map((char) => (
                    <tr key={char.name}>
                        <td><img src={`https://play.artifactsmmo.com/images/characters/${char.skin}.png`} alt="CHAR SKIN"/></td>
                        <td>{char.name}</td>
                        <td>{char.level}</td>
                        <td>{char.hp} / {char.max_hp}</td>
                        <td>({char.x}, {char.y})</td>
                        <td>{char.task || "—"}</td>
                        <td>
                            {new Date(char.cooldown_expiration) > new Date()
                                ? `${char.cooldown}s`
                                : "Ready"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

         */
    );
}