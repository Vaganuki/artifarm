import './char_modules.scss'
import type {Character} from "../../../@types/character";
import {SKILL_KEYS} from "../../../data/characterConfigs.ts";


type CharSkillsModuleProps = {
    current: Character;
}

export function CharSkillsModule( {current }: CharSkillsModuleProps ) {
    return(
        <div className="modal-skills">
            {SKILL_KEYS.map( skill=> {
                        const level = current[`${skill}_level` as keyof typeof current ];
                        const currentXp = current[`${skill}_xp` as keyof typeof current];
                        const maxXp = current[`${skill}_max_xp` as keyof typeof current];
                        return (
                            <div className="skill-container" key={skill}>
                                <div className="skill-container__header">
                                    <img
                                        src={`https://play.artifactsmmo.com/images/skills/${skill}.png`}
                                        alt={skill}
                                        className={`skill-container__header-icon`}
                                    />
                                    <span>{skill}</span>
                                    <span>lvl. {level as string}</span>
                                </div>
                                <div className="xp-bar-container">
                                    <div className="xp-label">{currentXp as string} / {maxXp as string} XP</div>
                                    <div className="xp-bar" style={{ width: `${((currentXp as number) / (maxXp as number)) * 100}%` }} />
                                </div>
                            </div>

                        )
                    })
            }
            </div>
    )

}
