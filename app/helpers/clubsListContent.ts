import { clubs } from "../data/clubs";

export type Club = {
    key: string;
    name: string;
    prices: string;
    location: string;
    description: string;
    offerings: string;
    harm_reduction: string;
    imageUrl: string;
    clubPageUrl: string;
    slug: string;
    geoLocation: number[];
    address: string;
};

// Function to generate slugs
// Probably can just make the key the slug...?
export function generateSlug(name: string): string {
    // Replace commas and periods, trim leading/trailing spaces, and replace multiple spaces with a single hyphen
    const slug: string = name
        .replace(/,/g, '')
        .replace(/\./g, '')
        .trim() // Trim leading and trailing spaces
        .replace(/\s+/g, '-') // Replace multiple spaces with a single hyphen
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9-]/g, ''); // Remove all other non-alphanumeric characters except hyphens

    return slug;
}

const geoLocationsCount: any = {};

// Add slugs to the clubs
clubs.forEach((club) => {
    if (club.slug === '') club.slug = generateSlug(club.name);
    const geoLocationsKey = JSON.stringify(club.geoLocation);
    // Used for debugging geolocation data
    if(!geoLocationsCount[geoLocationsKey]) {
        geoLocationsCount[geoLocationsKey] = {"clubs" : [club.name], "count" : 1}
    } else {
        geoLocationsCount[geoLocationsKey]["clubs"].push(club.name);
        geoLocationsCount[geoLocationsKey]["count"] += 1;
    }
});

// Used for debugging geolocation data
//console.log(geoLocationsCount);


export function pullClubsListContent(): Club[] {
    return clubs;
}
