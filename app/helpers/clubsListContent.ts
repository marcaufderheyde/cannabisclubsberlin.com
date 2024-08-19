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

export function generateSlug(name: string): string {
    const slug: string = name
        .replace(/,/g, '')
        .replace(/\./g, '')
        .trim() 
        .replace(/\s+/g, '-') 
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9-]/g, ''); 

    return slug;
}

const geoLocationsCount: any = {};

clubs.forEach((club) => {
    if (club.slug === '') club.slug = generateSlug(club.name);
    const geoLocationsKey = JSON.stringify(club.geoLocation);
    if(!geoLocationsCount[geoLocationsKey]) {
        geoLocationsCount[geoLocationsKey] = {"clubs" : [club.name], "count" : 1}
    } else {
        geoLocationsCount[geoLocationsKey]["clubs"].push(club.name);
        geoLocationsCount[geoLocationsKey]["count"] += 1;
    }
});




export function pullClubsListContent(): Club[] {
    return clubs;
}
