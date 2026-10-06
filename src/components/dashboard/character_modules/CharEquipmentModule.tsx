import type {Character} from "../../../@types/character";
import {EQUIPED_INVENTORY_KEYS} from "../../../data/characterConfigs.ts";

type CharEquipmentModuleProps = {
    current: Character;
}

export function CharEquipmentModule({current}: CharEquipmentModuleProps) {
    const quantity1 = current['utility1_slot_quantity'];
    const quantity2 = current['utility2_slot_quantity'];
    return (
        <div className="modal-equipment">
            <div className="modal-equipment__header">Equipment</div>
            <div className="equipment-container">
                {EQUIPED_INVENTORY_KEYS.filter(k => !k.endsWith('_quantity'))
                .map(k => {
                    if (current[k] === '') {
                        return (
                            <div className={`equipment-item__container ${k.replace('_slot','')}`} key={k}>
                                <span>{k.replace('_slot','').toUpperCase()}</span>
                                <span className="equipment-item__empty">Empty container</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className={`equipment-item__container ${k.replace('_slot','')}`} key={k}>
                                <span className="equipment-item__title">{k.replace('_slot', '').toUpperCase()}</span>
                                <img className="equipment-item__icon" src={`https://play.artifactsmmo.com/images/items/${current[k]}.png`} alt={`${current[k]}.png`} />
                                <span className="invetory-item__name">{String(current[k]).replaceAll('_',' ')}</span>
                                {k === 'utility1_slot' && <span className="equipment-item__quantity">{quantity1}</span>}
                                {k === 'utility2_slot' && <span className="equipment-item__quantity">{quantity2}</span>}
                            </div>
                        )
                    }
                })}
            </div>

        </div>
    )
}