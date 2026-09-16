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

    const routines = filter === "all" ? ROUTINES : ROUTINES.filter((r) => r.category === filter);

    return (
        <div className="farm">
        <div className="farm__filters">
            {(Object.keys(CATEGORY_LABELS) as (RoutineCategory | "all")[]).map((key) => (
                <button key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>
    {CATEGORY_LABELS[key]}
    </button>
))}
    </div>

    <div className="farm__list">
        {routines.map((routine) => (
                <RoutineRow key={routine.id} routine={routine} characters={characters} />
))}
    </div>
    </div>
);
}

interface RoutineRowProps {
    routine: Routine;
    characters: Character[];
}

function RoutineRow({ routine, characters }: RoutineRowProps) {
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
