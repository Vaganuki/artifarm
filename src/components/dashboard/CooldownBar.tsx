import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import type { Character } from "../../@types/character";

interface CooldownBarProps {
    character: Character;
}

export function CooldownBar({ character }: CooldownBarProps) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        const expiration = new Date(character.cooldown_expiration).getTime();
        const remainingMs = expiration - Date.now();

        gsap.killTweensOf(bar);

        if (remainingMs <= 0) {
            gsap.set(bar, { width: "0%" });
            return;
        }

        gsap.set(bar, { width: "100%" });
        gsap.to(bar, {
            width: "0%",
            duration: remainingMs / 1000,
            ease: "none",
        });

        return () => {
            gsap.killTweensOf(bar);
        };
    }, [character.cooldown_expiration]);

    return <div className="char-cooldown" ref={barRef} />;
}
