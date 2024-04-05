// import { useState } from "react";
// import DropdownContent from "./DropdownContent";
// import DropdownTrigger from "./DropdownTrigger";


// export default function DropdownMenu() {
//     const [showDropdownContent, setShowDropdownContent] = useState(false);

//     const dropdownTrigger = (
//         <DropdownTrigger handleClick={() => setShowDropdownContent(true)} />
//     );
//     const dropdownContent = (
//         <DropdownContent handleClickAndChangeLanguage={(currentLocale) => {
//             setShowDropdownContent(false);

//         }
//         }/>
//     );
//     return (
//         <div>
//             {dropdownTrigger}
//             {showDropdownContent && (dropdownContent)}
//         </div>
//     );
// }