import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { CannabisClub, GameState, NPC, Task } from './BerlinCannabisAdventure';
import { pullClubsListContent } from '../helpers/clubsListContent';

const initialGameState: GameState = {
    player: {
        position: new THREE.Vector3(),
        budget: 100,
        inventory: [],
        currentClub: null,
    },
    clubs: [],
    npcs: [],
    tasks: [],
};

interface InteractionOption {
    label: string;
    action: () => void;
}

export default function useGameLogic() {
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [interactionOptions, setInteractionOptions] = useState<
        InteractionOption[]
    >([]);
    const createNPCs = () => {
        const npcNames = [
            'Friendly Frank',
            'Curious Clara',
            'Helpful Hans',
            'Mystic Mara',
            'Trendy Timo',
            'Artistic Anna',
            'Techie Tom',
            'Foodie Freya',
            'Musician Max',
            'Historian Hanna',
            'Fitness Fiona',
            'Eco Erich',
            'Designer Daphne',
            'Coder Carl',
            'Yoga Yvonne',
        ];
        return npcNames.map((name) => ({
            name,
            dialogue: [
                `Hi, I'm ${name}. How can I help you?`,
                "Beautiful day in Berlin, isn't it?",
                "I've got a task if you're interested in earning some money.",
            ],
            task: {
                description: `Help ${name} with a task`,
                reward: Math.floor(Math.random() * 30) + 20,
                completed: false,
            },
        }));
    };

    const initGame = useCallback(() => {
        const clubs = pullClubsListContent()
            .map((club) => club.name)
            .map((name) => ({
                name,
                information: `Welcome to ${name}! We offer a variety of cannabis products and a comfortable environment for our members.`,
                items: [
                    { name: 'Basic Membership', price: 50 },
                    { name: 'Premium Membership', price: 100 },
                    { name: 'Cannabis Starter Pack', price: 30 },
                    { name: 'Artisanal Edibles', price: 25 },
                    { name: 'Vaporizer Kit', price: 80 },
                ],
                members: [],
            }));

        const taskDescriptions = [
            'Deliver a package',
            'Find a lost item',
            'Take photos of landmarks',
            'Collect signatures',
            'Distribute flyers',
            'Guide a tourist',
            'Clean up a park',
            'Help set up an event',
            'Translate a document',
            'Fix a bicycle',
            'Water community plants',
            'Perform street music',
            'Assist in a local shop',
            'Participate in a survey',
            'Walk a dog',
        ];

        const npcs = createNPCs();

        const tasks: Task[] = taskDescriptions.map((description) => ({
            description,
            reward: Math.floor(Math.random() * 30) + 20,
            completed: false,
        }));

        npcs.forEach((npc, index) => {
            npc.task = tasks[index];
        });

        tasks.forEach((task, index) => {
            npcs[index].task = task;
        });

        setGameState((prevState) => ({
            ...prevState,
            clubs,
            npcs,
            tasks,
        }));
    }, []);

    const movePlayer = useCallback((newPosition: THREE.Vector3) => {
        setGameState((prevState) => ({
            ...prevState,
            player: {
                ...prevState.player,
                position: newPosition,
            },
        }));
    }, []);

    const earnMoney = useCallback((amount: number) => {
        setGameState((prevState) => ({
            ...prevState,
            player: {
                ...prevState.player,
                budget: prevState.player.budget + amount,
            },
        }));
    }, []);

    const spendMoney = useCallback(
        (amount: number): boolean => {
            if (gameState.player.budget >= amount) {
                setGameState((prevState) => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        budget: prevState.player.budget - amount,
                    },
                }));
                return true;
            }
            return false;
        },
        [gameState.player.budget]
    );

    const joinClub = useCallback((clubName: string) => {
        setGameState((prevState) => {
            const club = prevState.clubs.find((c) => c.name === clubName);
            if (!club) return prevState;

            const updatedClubs = prevState.clubs.map((c) =>
                c.name === clubName
                    ? { ...c, members: [...c.members, prevState.player] }
                    : c
            );

            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    currentClub: club,
                },
                clubs: updatedClubs,
            };
        });
    }, []);

    const buyItem = useCallback(
        (itemName: string) => {
            setGameState((prevState) => {
                const club = prevState.player.currentClub;
                if (!club) return prevState;

                const item = club.items.find((i) => i.name === itemName);
                if (!item || !spendMoney(item.price)) return prevState;

                return {
                    ...prevState,
                    player: {
                        ...prevState.player,
                        inventory: [...prevState.player.inventory, item],
                    },
                };
            });
        },
        [spendMoney]
    );

    const completeTask = useCallback(
        (npcName: string) => {
            setGameState((prevState: { npcs: any[] }) => {
                const npc = prevState.npcs.find((n) => n.name === npcName);
                if (!npc || !npc.task || npc.task.completed) return prevState;

                earnMoney(npc.task.reward);

                const updatedNPCs = prevState.npcs.map((n) =>
                    n.name === npcName
                        ? { ...n, task: { ...n.task, completed: true } }
                        : n
                );

                return {
                    ...prevState,
                    npcs: updatedNPCs,
                };
            });
        },
        [earnMoney]
    );

    const interactWithNPC = useCallback(
        (npcName: string) => {
            const npc = gameState.npcs.find((n) => n.name === npcName);
            if (!npc) {
                console.log('NPC not found:', npcName);
                console.log(
                    'Available NPCs:',
                    gameState.npcs.map((n) => n.name)
                );
                return 'NPC not found.';
            }

            if (npc.task && !npc.task.completed) {
                setInteractionOptions([
                    {
                        label: `Accept task: ${npc.task.description} (Reward: €${npc.task.reward})`,
                        action: () => {
                            completeTask(npcName);
                            setInteractionOptions([]);
                        },
                    },
                    {
                        label: 'Decline task',
                        action: () => setInteractionOptions([]),
                    },
                ]);
                return `${npc.name} offers you a task. What would you like to do?`;
            } else {
                const itemForSale = { name: 'Special Item', price: 30 };
                setInteractionOptions([
                    {
                        label: `Buy ${itemForSale.name} (€${itemForSale.price})`,
                        action: () => {
                            if (spendMoney(itemForSale.price)) {
                                gameState.player.inventory.push(itemForSale);
                                setInteractionOptions([]);
                                return `You bought ${itemForSale.name}!`;
                            } else {
                                return 'Not enough money!';
                            }
                        },
                    },
                    {
                        label: 'Leave',
                        action: () => setInteractionOptions([]),
                    },
                ]);
                return `${npc.name} greets you. Would you like to buy something?`;
            }
        },
        [gameState, completeTask, spendMoney]
    );

    const interactWithClub = useCallback(
        (clubName: string) => {
            const club = gameState.clubs.find((c) => c.name === clubName);
            if (!club) {
                console.log('Club not found:', clubName);
                console.log(
                    'Available clubs:',
                    gameState.clubs.map((c) => c.name)
                );
                return 'Club not found.';
            }

            setInteractionOptions([
                {
                    label: 'Join club (€50)',
                    action: () => {
                        if (spendMoney(50)) {
                            joinClub(clubName);
                            setInteractionOptions([]);
                            return `You've joined ${clubName}!`;
                        } else {
                            return 'Not enough money to join the club!';
                        }
                    },
                },
                {
                    label: 'Buy Cannabis Starter Pack (€30)',
                    action: () => {
                        if (spendMoney(30)) {
                            gameState.player.inventory.push({
                                name: 'Cannabis Starter Pack',
                                price: 30,
                            });
                            setInteractionOptions([]);
                            return 'You bought a Cannabis Starter Pack!';
                        } else {
                            return 'Not enough money!';
                        }
                    },
                },
                {
                    label: 'Leave',
                    action: () => setInteractionOptions([]),
                },
            ]);
            return `Welcome to ${clubName}. What would you like to do?`;
        },
        [gameState, joinClub, spendMoney]
    );

    useEffect(() => {
        initGame();
    }, [initGame]);

    return {
        gameState,
        movePlayer,
        earnMoney,
        spendMoney,
        joinClub,
        buyItem,
        interactWithNPC,
        completeTask,
        interactWithClub,
        interactionOptions,
        setInteractionOptions,
    };
}
