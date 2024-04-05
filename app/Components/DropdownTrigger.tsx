import { useLocale } from "next-intl";
import EnglishFlag from "./EnglishFlag";
import GermanFlag from "./GermanFlag";
import LanguageCaret from "../ui/Navigation/LanguageCaret"
import { useState } from "react";

export default function DropdownTrigger({ handleClick }) {
    const localActive = useLocale();
    const [rotateCaret, toggleRotateCaret] = useState(true);
    // if clicked, then hide caret
    return (
        <button id="states-button"
            onMouseEnter={() => {
                handleClick();
                toggleRotateCaret(!rotateCaret);
            }}
            className="flex-shrink-0 z-10 inline-flex items-center py-1 px-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
            {localActive === "en" ? <EnglishFlag /> : <GermanFlag />}
            {localActive === "en" ? "ENG" : "DEU"}
            {<LanguageCaret rotateToggle={rotateCaret}/>}
        </button>
    );
}