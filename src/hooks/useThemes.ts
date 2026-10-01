import {useEffect, useState} from "react";

export const AVAILABLE_THEMES = [
    {id: 'default', label: 'Default', color: '#0B0F14'},
    {id: 'abyssal', label: 'Abyssal', color: '#624D73'},
    {id:'cloud', label: 'Cloud', color: '#8FA0BF'},
    {id:'berry', label: 'Berry', color: '#6CEDED'},
    {id:'dusk', label: 'Dusk', color: '#c4b087'},
    {id:'backroom', label: 'Backroom', color: '#c4b65d'},
    {id:'citric', label: 'Citric', color: '#b2e043'},
    {id:'retro', label: 'Retro', color: '#ff9e54'},
    {id:'opal', label: 'Opal', color: '#e5989b'},
    {id:'sanguine', label: 'Sanguine', color: '#e2546b'},
] as const;

export type ThemeID = typeof AVAILABLE_THEMES[number]['id'];

export function useTheme() {
    const [theme, setTheme] = useState<ThemeID>(() => {
        const saved = localStorage.getItem('data-theme') as ThemeID;
        return saved || 'default';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('data-theme', theme);
    },[theme]);

    return {theme, setTheme};
}