import './char_modules.scss';
import type {Character} from "../../../@types/character";
import {CORE_STATS} from "../../../data/characterConfigs.ts";

type CharCoreStatsModuleProps = {
    current: Character;
}

export function CharCoreStatsModule({current}: CharCoreStatsModuleProps) {

    return (
        <div className="modal-corestats">

            <div className="modal-corestats__header">
                Core stats
            </div>

            {CORE_STATS.map( stat => (
                <div className="corestats-container">
                    <img src={`https://play.artifactsmmo.com/images/effects/${stat.startsWith('max_') ? stat.replace('max_', '') : stat}.png`} alt={stat}
                         className="corestats-container__icon"/>
                    <span className="corestats-container__stats">
                        <span>{stat.replace('max_','')}</span>
                        <span>
                            {current[stat]}
                        </span>
                    </span>
                </div>
        ))}
        </div>
    )

}