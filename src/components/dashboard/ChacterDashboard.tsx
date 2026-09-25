import {useCharacter, useCharacters} from "../../hooks/useCharacters";
import { useCurrentRoutine } from "../../hooks/useCurrentRoutine";
import { stopLoop } from "../../lib/loopManager";
import { ROUTINES } from "../../data/routines";
import { CooldownBar } from "./CooldownBar";
import type { Character } from "../../@types/character";
import "./character_dashboard.scss";

export function CharacterDashboard() {
    const { characters, isLoading, error } = useCharacters();

    if (isLoading) return <p>Loading characters...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="character-dashboard">
            {characters.map((character) => (
                <CharacterCard character={character} key={character.name} />
            ))}
        </div>
    );
}

function CharacterCard({ character }: { character: Character }) {
    const current = useCharacter(character.name);
    const routineId = useCurrentRoutine(character.name);
    const routineLabel = ROUTINES.find((r) => r.id === routineId)?.label;

    if(!current) return null;

    return (
        <div className="char-card">
            <CooldownBar character={current} />
            <div className="char-card-left">
                <img
                    src={`https://play.artifactsmmo.com/images/characters/${current.skin}.png`}
                    alt={`${current.name}'s skin`}
                />
                <p>LVL {current.level}</p>
            </div>
            <div className="char-card-right">
                <p className="char-card-name">{current.name}</p>
                <div className="char-card-data">
                    <div className="hp-bar-container">
                        <div className="hp-label">{current.hp} / {current.max_hp} HP</div>
                        <div className="hp-bar" style={{ width: `${(current.hp / current.max_hp) * 100}%` }} />
                    </div>
                    <div className="xp-bar-container">
                        <div className="xp-label">{current.xp} / {current.max_xp} XP</div>
                        <div className="xp-bar" style={{ width: `${(current.xp / current.max_xp) * 100}%` }} />
                    </div>
                    <p>({current.x},{current.y})</p>
                </div>

                {routineId ? (
                    <div className="char-card-activity">
                        <p>{routineLabel}</p>
                        <button onClick={() => stopLoop(current.name)}>Stop</button>
                    </div>
                ) : (
                    <p className="char-card-activity char-card-activity--idle">Idle</p>
                )}
            </div>
        </div>
    );
}
