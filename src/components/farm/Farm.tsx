import { useState} from "react";
import { useCharacters } from "../../hooks/useCharacters";
import { useCurrentRoutine } from "../../hooks/useCurrentRoutine";
import { startLoop } from "../../lib/loopManager";
import { ROUTINES, type Routine, type RoutineCategory } from "../../data/routines";
import type { Character } from "../../@types/character";
import "./farm.scss";

const CATEGORY_LABELS: Record<RoutineCategory | "all", string> = {
    all: "All",
    resource: "Resources",
    craft: "Craft",
    combat: "Combat",
};

export function Farm() {
    const { characters } = useCharacters();
    const [filter, setFilter] = useState<RoutineCategory | "all">("all");
    const [isOpen, setIsOpen] = useState(false);

    const routines = filter === "all" ? ROUTINES : ROUTINES.filter((r) => r.category === filter);

    function handleOpen() {
        setIsOpen( prev => !prev);
    }

    return (
        <>
        {isOpen &&
                <div className="farm-container">
                    <div className="header">
                        <p>Farming Loops</p>
                        <button onClick={handleOpen}>✕</button>
                    </div>
                    <div className="farm__filters">
                        {(Object.keys(CATEGORY_LABELS) as (RoutineCategory | "all")[]).map((key) => (
                            <button key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>
                                {CATEGORY_LABELS[key]}
                            </button>
                        ))}
                    </div>
                    <div className="farm__list">
                        {routines.map((routine) => (
                            <RoutineRow key={routine.id} routine={routine} characters={characters}/>
                        ))}
                    </div>
                </div>
        }
            <button className="-farm not-open" onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7zm1 3V8H2l-.75 1L2 10zm0-5h6l.75-1L14 3H8z"/>
                </svg>
                <p>FARM</p>
            </button>
        </>
    );
}

interface RoutineRowProps {
    routine: Routine;
    characters: Character[];
}

function RoutineRow({routine, characters}: RoutineRowProps) {
    const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
    const [selectedCharacter, setSelectedCharacter] = useState<string|null>(null);


    function handleStart() {
        if (!selectedCharacter) return;
        startLoop(selectedCharacter, routine.id, (signal) => routine.run(selectedCharacter, signal));

        setSelectedCharacter(null);
        setIsSelectorOpen(false);
    }



    return (

        //TODO: add refs for GSAP ?
        <div className="routine-container">
            <div className={`routine-row ${isSelectorOpen ? "has-selected" : ""}`}
                onClick={() => setIsSelectorOpen(prev => !prev)}
            >
                <div className="routine-row__header">
                    <div className="routine-badge">
                        {routine.category === 'combat' ?
                            (
                                <img src={`https://play.artifactsmmo.com/images/monsters/${routine.id}.png`} alt={routine.label}/>
                            ) : (
                                <img src={`https://play.artifactsmmo.com/images/items/${routine.id}.png`} alt={routine.label}/>
                            )
                        }
                    </div>
                <p className="routine-label">{routine.label}</p>
                </div>
            </div>

            {isSelectorOpen && (
                <div className="routine-row__character-picker">
                    <p className="picker-title">Select a character:</p>
                    <div className="character-grid">
                        {characters.map((char) => (
                            <CharacterCard
                                key={char.name}
                                character={char}
                                routineId={routine.id}
                                isSelected={selectedCharacter === char.name}
                                onSelect={ name => setSelectedCharacter(name)}
                            />
                        ))

                        }
                    </div>
                    <button
                        type="button"
                        className="routine-row__start-btn"
                        onClick={handleStart}
                        disabled={!selectedCharacter}
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    );
}

interface CharacterCardProps {
    character: Character;
    routineId: string;
    isSelected: boolean;
    onSelect: (name: string) => void;
}

function CharacterCard({character, routineId, isSelected, onSelect}: CharacterCardProps) {
    const runningId = useCurrentRoutine(character.name);
    const isBusy = runningId !== null && runningId !== routineId;

    return (
        <button
            type="button"
            className={`character-card ${isSelected ? 'is-selected' : ''} ${isBusy ? 'is-busy' : ''}`}
            disabled={isBusy}
            onClick={() => onSelect(character.name)}
        >
            <div className="character-card__avatar">
                <img src={`https://play.artifactsmmo.com/images/characters/${character.skin}.png`} alt={character.name}/>
                {isBusy && <span className="busy-tag">Busy</span>}
            </div>
            <span className="character-card__name">{character.name}</span>
        </button>
    )

}