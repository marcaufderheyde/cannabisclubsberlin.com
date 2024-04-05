import { useLocale } from "next-intl";
import EnglishFlag from "./EnglishFlag";
import GermanFlag from "./GermanFlag";

export default function DropdownContent({ handleClickAndChangeLanguage }) {
    const localActive = useLocale(); 
    return (
        <div id="dropdown-states" className="flex-shrink-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
            <div className="text-sm rounded-lg text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                <button type="button"
                        // inside of onClick hide the element
                        onClick={() => {
                            var currentLocale = localActive === "en" ? "de" : "en";
                            handleClickAndChangeLanguage(currentLocale);
                        }}
                        className="inline-flex w-full py-1 px-2 text-sm text-gray-700 hover:rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                    <div className="inline-flex items-center">
                        {localActive === "en" ? <GermanFlag/> : <EnglishFlag/>}
                        {localActive === "en" ? "DEU" : "ENG"}
                    </div>
                    <div className="inline-flex px-2.5">
                    </div>
                </button>
            </div>
        </div>
    );
}