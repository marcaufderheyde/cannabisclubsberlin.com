import { useLocale } from 'next-intl';
import EnglishFlag from '../EnglishFlag/EnglishFlag';
import GermanFlag from '../GermanFlag/GermanFlag';
import LanguageCaret from './LanguageCaret';
import { useCallback, useEffect, useState } from 'react';

type Props = {
    handleClick: any;
    dropdownRef: any;
    toggleCaret: any;
};

export default function DropdownTrigger({
    handleClick,
    dropdownRef,
    toggleCaret,
}: Props) {
    const localActive = useLocale();
    const [rotateCaret, toggleRotateCaret] = useState(true);

    const toggleCaretCallback = useCallback((): void => {
        toggleRotateCaret((rotateCaret) => !rotateCaret);
    }, []);

    useEffect(() => {
        toggleCaret && toggleCaret(toggleCaretCallback);
    }, [toggleCaret, toggleCaretCallback]);

    // if clicked, then hide caret
    return (
        <button
            id="states-button"
            ref={dropdownRef}
            className="flex-shrink-0 z-10 inline-flex items-center py-1 px-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            onClick={() => {
                handleClick();
                toggleRotateCaret(!rotateCaret);
            }}
            type="button"
        >
            {localActive === 'en' ? <EnglishFlag /> : <GermanFlag />}
            {localActive === 'en' ? 'ENG' : 'DEU'}
            {<LanguageCaret rotateToggle={rotateCaret} />}
        </button>
    );
}
