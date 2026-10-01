import {AVAILABLE_THEMES, type ThemeID, useTheme} from "../../hooks/useThemes.ts";

export function ThemeSelector() {
    const {theme, setTheme} = useTheme();

    return(
        <div className="theme-selector">
            <p className="theme-selector__title">Interface theme:</p>
            <div className="theme-selector__swatches">
                {AVAILABLE_THEMES.map(t => {
                    const isSelected = theme === t.id;
                    return (
                        <div
                            key={t.id}
                            className={`theme-swatch ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => setTheme(t.id as ThemeID)}
                            aria-label={`Theme ${t.label}`}
                        >
                            <span
                                className="theme-swatch__circle"
                                style={{backgroundColor : t.color}}
                            />
                            <span className="theme-swatch__label">{t.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}