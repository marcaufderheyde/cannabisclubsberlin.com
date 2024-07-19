import { useState, useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import useGameLogic from './useGameLogic';

export interface Player {
    position: THREE.Vector3;
    budget: number;
    inventory: Item[];
    currentClub: CannabisClub | null;
}

export interface Item {
    name: string;
    price: number;
}

export interface CannabisClub {
    name: string;
    information: string;
    items: Item[];
    members: Player[];
}

export interface NPC {
    name: string;
    dialogue: string[];
    task: Task | null;
}

export interface Task {
    description: string;
    reward: number;
    completed: boolean;
}

export interface GameState {
    player: Player;
    clubs: CannabisClub[];
    npcs: NPC[];
    tasks: Task[];
}

const BerlinCannabisAdventure: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const playerRef = useRef<THREE.Mesh | null>(null);
    const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
    const [interactionMessage, setInteractionMessage] = useState<string | null>(
        null
    );

    const {
        gameState,
        movePlayer,
        interactWithNPC,
        interactWithClub,
        interactionOptions,
        setInteractionOptions,
    } = useGameLogic();

    const interactWithNearbyEntity = () => {
        if (!playerRef.current || !sceneRef.current) return;

        const interactionRadius = 3;
        const playerPosition = playerRef.current.position;

        let interacted = false;

        sceneRef.current.children.forEach((child) => {
            if (
                child.userData &&
                (child.userData.type === 'npc' ||
                    child.userData.type === 'club')
            ) {
                const distance = playerPosition.distanceTo(child.position);
                if (distance <= interactionRadius) {
                    interacted = true;
                    if (child.userData.type === 'npc') {
                        const npcResponse = interactWithNPC(
                            child.userData.name
                        );
                        setInteractionMessage(npcResponse);
                    } else if (child.userData.type === 'club') {
                        const clubResponse = interactWithClub(
                            child.userData.name
                        );
                        setInteractionMessage(clubResponse);
                    }
                }
            }
        });

        if (!interacted) {
            setInteractionMessage('No nearby entities to interact with.');
        }
    };

    useEffect(() => {
        if (!mountRef.current) return;

        mountRef.current.focus();

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Add basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(ambientLight);
        scene.add(directionalLight);

        // Add a ground plane
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        // Add player (green cube)
        const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
        const playerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.y = 0.5;
        scene.add(player);
        playerRef.current = player;

        // Add shops and NPCs
        gameState.clubs.forEach((club: { name: any }, index: any) => {
            const entityGeometry = new THREE.BoxGeometry(
                Math.random() * 8,
                Math.random() * 8,
                Math.random() * 8
            );

            const clubMaterial = new THREE.MeshPhongMaterial({
                color: 0xff0000,
            });
            const clubMesh = new THREE.Mesh(entityGeometry, clubMaterial);
            clubMesh.position.set(
                Math.random() * 80 - 40,
                1,
                Math.random() * 80 - 40
            );
            clubMesh.userData = { type: 'club', name: club.name };
            scene.add(clubMesh);
        });

        gameState.npcs.forEach((npc: { name: any }, index: any) => {
            const entityGeometry = new THREE.BoxGeometry(
                Math.random() * 2,
                Math.random() * 4,
                Math.random() * 2
            );

            const npcMaterial = new THREE.MeshPhongMaterial({
                color: 0x0000ff,
            });
            const npcMesh = new THREE.Mesh(entityGeometry, npcMaterial);
            npcMesh.position.set(
                Math.random() * 80 - 40,
                1,
                Math.random() * 80 - 40
            );
            npcMesh.userData = { type: 'npc', name: npc.name };
            scene.add(npcMesh);
        });

        camera.position.set(0, 10, 10);
        camera.lookAt(player.position);

        // Raycaster for entity interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (
                    intersectedObject.userData &&
                    intersectedObject.userData.name
                ) {
                    setHoveredEntity(
                        `${intersectedObject.userData.type}: ${intersectedObject.userData.name}`
                    );
                } else {
                    setHoveredEntity(null);
                }
            } else {
                setHoveredEntity(null);
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            if (playerRef.current) {
                // Update camera position to follow player
                camera.position.x = playerRef.current.position.x;
                camera.position.z = playerRef.current.position.z + 10;
                camera.lookAt(playerRef.current.position);
            }

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            renderer.dispose();
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [gameState.clubs, gameState.npcs]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect =
                    window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(
                    window.innerWidth,
                    window.innerHeight
                );
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!playerRef.current) return;

            // Prevent default behavior for arrow keys and space bar
            if (
                [
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight',
                    ' ',
                ].includes(event.key)
            ) {
                event.preventDefault();
            }

            const moveDistance = 0.5;
            let newPosition = playerRef.current.position.clone();

            switch (event.key) {
                case 'ArrowUp':
                    newPosition.z -= moveDistance;
                    break;
                case 'ArrowDown':
                    newPosition.z += moveDistance;
                    break;
                case 'ArrowLeft':
                    newPosition.x -= moveDistance;
                    break;
                case 'ArrowRight':
                    newPosition.x += moveDistance;
                    break;
                case ' ': // Space bar for interaction
                    interactWithNearbyEntity();
                    break;
            }

            if (event.key === ' ') {
                interactWithNearbyEntity();
            } else if (event.key >= '1' && event.key <= '9') {
                const optionIndex = parseInt(event.key) - 1;
                if (interactionOptions[optionIndex]) {
                    const result = interactionOptions[optionIndex].action();
                    if (result) {
                        setInteractionMessage(result);
                    }
                }
            }

            // Constrain movement within the ground plane
            newPosition.x = Math.max(-50, Math.min(50, newPosition.x));
            newPosition.z = Math.max(-50, Math.min(50, newPosition.z));

            playerRef.current.position.copy(newPosition);
            movePlayer(newPosition);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer, interactionOptions]);
    return (
        <div>
            <div
                ref={mountRef}
                style={{ width: '100%', height: '100vh' }}
                tabIndex={0}
                onBlur={() => mountRef.current?.focus()}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: 'white',
                }}
            >
                Budget: €{gameState.player.budget}
            </div>
            {hoveredEntity && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        color: 'white',
                    }}
                >
                    {hoveredEntity}
                </div>
            )}
            {interactionMessage && (
                <div
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 10,
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        padding: '10px',
                    }}
                >
                    {interactionMessage}
                    {interactionOptions.length > 0 && (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {interactionOptions.map((option, index) => (
                                <li key={index}>
                                    {index + 1}. {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default BerlinCannabisAdventure;
