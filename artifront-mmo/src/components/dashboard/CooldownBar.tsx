import type {Character} from "../../@types/character";
import {useEffect, useRef} from "react";
import {gsap} from "../../lib/gsap.ts";


interface CooldownBarProps {
    character: Character;
}

export function CooldownBar({character}: CooldownBarProps) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        const remainingMs = character.cooldown * 1000;
        gsap.killTweensOf(bar)


        if (remainingMs <= 0) {
            gsap.set(bar,{
                width: "0%",
            });
            return;
        }

        gsap.set(bar,{
            width: "100%",
        });

        gsap.to(bar,{
            width: "0%",
            duration: character.cooldown,
            ease: 'power1.in',
        });

        return () => {
            gsap.killTweensOf(bar);
        };

    },[character.cooldown]);


    return <div className="char-cooldown" ref={barRef}/>

}