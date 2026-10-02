import {useCharacter, useCharacters} from "../../hooks/useCharacters";
import { useCurrentRoutine } from "../../hooks/useCurrentRoutine";
import { stopLoop } from "../../lib/loopManager";
import { ROUTINES } from "../../data/routines";
import { CooldownBar } from "./CooldownBar";
import type { Character } from "../../@types/character";
import "./character_dashboard.scss";
import {useState} from "react";
import {CharDetails} from "./CharDetails.tsx";

export function CharacterDashboard() {
    const { characters, isLoading, error } = useCharacters();

    const [selectedChar, setSelectedChar] = useState<string | null>(null);


    if (isLoading) return <p>Loading characters...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="character-dashboard">
            {characters.map((character) => (
                <CharacterCard character={character} key={character.name}
                    onClick={() => setSelectedChar(character.name)}
                />
            ))}

            {selectedChar && (
                <CharDetails
                    characterName={selectedChar}
                    onClose={() => setSelectedChar(null)}
                />
            )}

        </div>
    );
}

function CharacterCard({ character, onClick }: { character: Character; onClick: () => void }) {
    const current = useCharacter(character.name);
    const routineId = useCurrentRoutine(character.name);
    const {label, category} = ROUTINES.find(r => r.id === routineId) ?? {};

    if(!current) return null;

    return (
        <div className="char-card" onClick={onClick}>

            <div className="char-card-title">
                <span>{current.name}</span>
                <span>LVL. {current.level}</span>
            </div>



            <div className="char-card-left">
                <img
                    src={`https://play.artifactsmmo.com/images/characters/${current.skin}.png`}
                    alt={`${current.name}'s skin`}
                />
            </div>
            <div className="char-card-middle">
                <div className="char-card-data">
                    <div className="hp-bar-container">
                        <div className="hp-label">{current.hp} / {current.max_hp} HP</div>
                        <div className="hp-bar" style={{ width: `${(current.hp / current.max_hp) * 100}%` }} />
                    </div>
                    <div className="xp-bar-container">
                        <div className="xp-label">{current.xp} / {current.max_xp} XP</div>
                        <div className="xp-bar" style={{ width: `${(current.xp / current.max_xp) * 100}%` }} />
                    </div>
                </div>

            </div>
            <div className="char-card-right">
                {routineId && (
                    <div className="char-card-routine-img">
                        {category == 'combat' ? (
                            <img src={`https://play.artifactsmmo.com/images/monsters/${routineId}.png`} alt={label}/>

                        ) : (
                            <img src={`https://play.artifactsmmo.com/images/items/${routineId}.png`} alt={label}/>
                        )
                        }
                    </div>
                )}
                <p>({current.x},{current.y})</p>
                {routineId && (
                    <button onClick={() => stopLoop(current.name)}>Stop</button>
                )}
            </div>
            {routineId ? (
                <div className="char-card-activity">
                    <p>{label}</p>
                </div>
            ) : (
                <p className="char-card-activity char-card-activity--idle">Idle</p>
            )}
            <CooldownBar character={current} />
        </div>
    );
}
