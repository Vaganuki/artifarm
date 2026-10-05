import {useCharacter} from "../../hooks/useCharacters.ts";
import {CharSkillsModule} from "./character_modules/CharSkillsModule.tsx";

type CharDetailsProps = {
    characterName : string;
    onClose: ()  => void;
};

export function CharDetails({characterName, onClose}: CharDetailsProps) {
    const current = useCharacter(characterName);

    if (!current) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <h2>{current.name} (Niv. {current.level})</h2>

                <CharSkillsModule current={current}/>
                <pre>{JSON.stringify(current, null, 2)}</pre>
            </div>
        </div>
    );
}