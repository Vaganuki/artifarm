import './char_modules.scss'
import type {Character} from "../../../@types/character";
import {ELEMENTS} from "../../../data/characterConfigs.ts";

type CharElementModuleProps = {
    current: Character;
}

export function CharElementModule({current} : CharElementModuleProps) {



    return (
        <div className="modal-elements">

            <div className="modal-elements__header">
                Element attack+(DMG%) | Res
            </div>

            {ELEMENTS.map( element => (
                <div className="element-container">
                    <img src={`https://play.artifactsmmo.com/images/effects/attack_${element}.png`} alt={element} className="element-container__icon" />
                    <span className="element-container__stats">
                        <span>{element}</span>
                        <span>
                            {current[`attack_${element}` as keyof typeof current] as string} + ({current[`dmg_${element}` as keyof typeof current] as string}%) | {current[`res_${element}` as keyof typeof current] as string}%
                        </span>

                    </span>
                </div>
            ))}
        </div>
    )
}