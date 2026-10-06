import {useCharacter} from "../../hooks/useCharacters.ts";
import {CharSkillsModule} from "./character_modules/CharSkillsModule.tsx";
import {CharElementModule} from "./character_modules/CharElementModule.tsx";
import {CharCoreStatsModule} from "./character_modules/CharCoreStatsModule.tsx";
import {CharEquipmentModule} from "./character_modules/CharEquipmentModule.tsx";
import {CharMainModule} from "./character_modules/CharMainModule.tsx";

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
                <CharMainModule current={current}/>
                <CharEquipmentModule current={current}/>
                <CharCoreStatsModule current={current}/>
                <CharElementModule current={current}/>
                <CharSkillsModule current={current}/>
            </div>
            <pre>{JSON.stringify(current, null, 2)}</pre>
        </div>
    );
}