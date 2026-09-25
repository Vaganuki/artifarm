import { useState } from "react";
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
        setIsOpen(!isOpen);
    }

    return (
        <>
        {isOpen &&
                <div>
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
            <div className="-farm not-open" onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7zm1 3V8H2l-.75 1L2 10zm0-5h6l.75-1L14 3H8z"/>
                </svg>
                <p>FARM</p>
            </div>
        </>
    );
}

interface RoutineRowProps {
    routine: Routine;
    characters: Character[];
}

function RoutineRow({routine, characters}: RoutineRowProps) {
    const [selected, setSelected] = useState("");

    function handleStart() {
        if (!selected) return;
        startLoop(selected, routine.id, (signal) => routine.run(selected, signal));
    }

    return (
        <div className="routine-row">
            <span className={`routine-badge routine-badge--${routine.category}`}>{routine.category}</span>
            <p className="routine-label">{routine.label}</p>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">-- character --</option>
                {characters.map((c) => (
                    <CharacterOption key={c.name} character={c} routineId={routine.id} />
                ))}
            </select>

            <button onClick={handleStart} disabled={!selected}>Start</button>
        </div>
    );
}

// Composant dedie : useCurrentRoutine doit etre appele au meme niveau pour
// CHAQUE personnage (pas dans une boucle .map() du parent), sinon on viole
// les Rules of Hooks des que le nombre de personnages change.
interface CharacterOptionProps {
    character: Character;
    routineId: string;
}

function CharacterOption({ character, routineId }: CharacterOptionProps) {
    const runningId = useCurrentRoutine(character.name);
    const busy = runningId !== null && runningId !== routineId;

    return (
        <option value={character.name} disabled={busy}>
        {character.name}{busy ? " (busy)" : ""}
    </option>
);
}
