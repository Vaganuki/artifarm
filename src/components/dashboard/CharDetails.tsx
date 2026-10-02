import {useCharacter} from "../../hooks/useCharacters.ts";

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

                <div className="details-grid">
                    <p><strong>Infos set</strong></p>
                    <p>HP Max : {current.max_hp}</p>
                    <p>XP Max : {current.max_xp}</p>
                </div>
            </div>
        </div>
    );
}