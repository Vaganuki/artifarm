import {useCharacter} from "../../hooks/useCharacters.ts";
import {CharSkillsModule} from "./character_modules/CharSkillsModule.tsx";
import {CharElementModule} from "./character_modules/CharElementModule.tsx";

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
                <CharElementModule current={current}/>
                <CharSkillsModule current={current}/>
                <pre>{JSON.stringify(current, null, 2)}</pre>
            </div>
        </div>
    );
}