import './char_modules.scss'
import type {Character} from "../../../@types/character";


type CharSkillsModuleProps = {
    current: Character;
}

export function CharSkillsModule( {current }: CharSkillsModuleProps ) {
    return(
        <div className="modal-skills">
            {Object.entries(current)
                    .filter(([k]) => k.endsWith('_level'))
                    .map(([k,v]) => {
                        const cSkill = k.replace('_level', '');
                        const currentXp = current[`${cSkill}_xp` as keyof typeof current];
                        const maxXp = current[`${cSkill}_max_xp` as keyof typeof current];
                        return (
                            <div className="skill-container" key={k}>
                                <div className="skill-container__header">
                                    <img
                                        src={`https://play.artifactsmmo.com/images/skills/${cSkill}.png`}
                                        alt={k}
                                        className={`skill-container__header-icon`}
                                    />
                                    <span>{cSkill}</span>
                                    <span>lvl. {v}</span>
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
