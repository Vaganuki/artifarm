import './char_modules.scss'
import type {Character} from "../../../@types/character";

type CharMainModuleProps = {
    current : Character;
}

export function CharMainModule({current}: CharMainModuleProps ) {
    if (!current) return;
    return (
        <div className="modal-main">
            <div className="modal-main__icon">
                <img
                    src={`https://play.artifactsmmo.com/images/characters/${current.skin}.png`}
                    alt={`${current.name}'s icon`}/>
            </div>
            <div className="modal-main__data">
                <div className="modal-main__data__text">
                    <span>{current.name}</span>
                    <span>LVL.{current.level}</span>
                </div>
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
    )
}