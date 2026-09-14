import { useCharacters } from "../../hooks/useCharacters";
import { useCurrentRoutine } from "../../hooks/useCurrentRoutine";
import { stopLoop } from "../../lib/loopManager";
import { ROUTINES } from "../../data/routines";
import { CooldownBar } from "./CooldownBar";
import type { Character } from "../../@types/character";
import "./character_dashboard.scss";

export function CharacterDashboard() {
    const { characters, isLoading, error } = useCharacters();

    if (isLoading) return <p>Chargement des personnages...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="dashboard">
            {characters.map((character) => (
                <CharacterCard character={character} key={character.name} />
            ))}
        </div>
    );
}

function CharacterCard({ character }: { character: Character }) {
    const routineId = useCurrentRoutine(character.name);
    const routineLabel = ROUTINES.find((r) => r.id === routineId)?.label;

    return (
        <div className="char-card">
            <CooldownBar character={character} />
            <div className="char-card-left">
                <img
                    src={`https://play.artifactsmmo.com/images/characters/${character.skin}.png`}
                    alt={`${character.name}'s skin`}
                />
                <p>LVL {character.level}</p>
            </div>
            <div className="char-card-right">
                <p className="char-card-name">{character.name}</p>
                <div className="char-card-data">
                    <div className="hp-bar-container">
                        <div className="hp-label">{character.hp} / {character.max_hp} HP</div>
                        <div className="hp-bar" style={{ width: `${(character.hp / character.max_hp) * 100}%` }} />
                    </div>
                    <div className="xp-bar-container">
                        <div className="xp-label">{character.xp} / {character.max_xp} XP</div>
                        <div className="xp-bar" style={{ width: `${(character.xp / character.max_xp) * 100}%` }} />
                    </div>
                    <p>({character.x},{character.y})</p>
                </div>

                {routineId ? (
                    <div className="char-card-activity">
                        <p>{routineLabel}</p>
                        <button onClick={() => stopLoop(character.name)}>Stop</button>
                    </div>
                ) : (
                    <p className="char-card-activity char-card-activity--idle">Idle</p>
                )}
            </div>
        </div>
    );
}
