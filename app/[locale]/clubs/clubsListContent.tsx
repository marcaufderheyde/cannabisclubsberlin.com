const clubs = [
    {
        key: 'club1',
        name: 'CSC High Ground Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club1.png',
        clubPageUrl: 'https://csc-highground.de/',
        slug: "",
    },
    {
        key: 'club2',
        name: 'Green Social Club e.V., im Norden von Berlin',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club2.webp',
        clubPageUrl: 'https://www.green-social-club.de/',
        slug: "",
    },
    {
        key: 'club3',
        name: 'Aero Cannabis Club e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club3.svg',
        clubPageUrl: 'https://www.aerocannabisberlin.com/',
        slug: "",
    },
    {
        key: 'club4',
        name: 'Green Leaf Society e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club4.png',
        clubPageUrl: 'https://greenleafsociety.de/',
        slug: "",
    },
    {
        key: 'club5',
        name: '420 Club Berlin',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club5.jpeg',
        clubPageUrl: 'https://twitter.com/420_club_berlin',
        slug: "",
    },
    {
        key: 'club6',
        name: 'Bastardo CSC Berlin',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club6.png',
        clubPageUrl: 'https://www.bastardo-berlin.de/',
        slug: "",
    },
    {
        key: 'club7',
        name: 'CSC Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club7.png',
        clubPageUrl: 'https://csc.berlin/',
        slug: "",
    },
    {
        key: 'club8',
        name: '1000 Berlin 15 e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club8.jpeg',
        clubPageUrl: 'https://www.1000berlin15.de/',
        slug: "",
    },
    {
        key: 'club9',
        name: 'Cannabis Social Club Köpenick',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club9.webp',
        clubPageUrl: 'https://www.csckoepenick.de/',
        slug: "",
    },
    {
        key: 'club10',
        name: 'CSC High on Earth e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club10.png',
        clubPageUrl: 'https://highonearth.de/',
        slug: "",
    },
    {
        key: 'club11',
        name: 'CSC Home of Hemp Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club12',
        name: 'Cannabis Social Club Prenzlauer Berg Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club13',
        name: 'Cannabis Social Club meridiem Brandenburgo et Berolina e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club14',
        name: 'Cannabis-Club Lammbock e. V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club15',
        name: 'Cannamo Cannabis Club e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club15.svg',
        clubPageUrl: 'https://cannamo.de/',
        slug: "",
    },
    {
        key: 'club16',
        name: 'High Society Cannabis Club e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club17',
        name: 'Hype and Dope, Cannabis Club Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club18',
        name: 'Koala Cannabis Social Club Berlin e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club19',
        name: 'We Love Weed (WLW) – Cannabis Social Club Berlin Kreuzberg e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club20',
        name: 'Anbaufreunde Berlin Social Club e. V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/berlinBud1.webp',
        clubPageUrl: '',
        slug: "",
    },
    {
        key: 'club21',
        name: 'Cannabis Club Lammbock e.V.',
        description: '',
        offerings: '',
        harm_reduction: '',
        imageUrl: '/club21.webp',
        clubPageUrl: 'https://club-lammbock.de/',
        slug: "",
    },
];

// Function to generate slugs
// Probably can just make the key the slug...?
export function generateSlug(name: string): string {
    // Replace commas and periods, then lower and replace spaces
    let slug: string = name.replace(/,/g, '').replace(/\./g, '').toLowerCase().replace(/ /g, '-');
    // Replace German Umlauts and "ß"
    slug = slug.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    // Remove all other non-alphanumeric characters except hyphens
    slug = slug.replace(/[^a-z0-9-]/g, '');
    return slug;
  }
  
  
// Add slugs to the clubs
clubs.forEach(club => {
    club.slug = generateSlug(club.name);
});

export function pullClubsListContent() {
    return clubs; 
}