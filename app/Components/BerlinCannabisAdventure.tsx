import { useState, useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
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
    imageUrl: string; // Add imageUrl to the club interface
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

    const {
        gameState,
        movePlayer,
        interactWithNPC,
        interactWithClub,
        interactionOptions,
        setInteractionOptions,
        interactionMessage,
        setInteractionMessage,
        isInitialized,
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
                const boundingBox = new THREE.Box3().setFromObject(child);
                if (
                    boundingBox.distanceToPoint(playerPosition) <=
                    interactionRadius
                ) {
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
        if (!mountRef.current || !isInitialized) return;

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

        // Add a ground plane with grey asphalt-like texture
        const groundTexture = new THREE.TextureLoader().load(
            'https://imgur.com/gallery/asphalt-road-texture-qpbCiAi'
        );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(20, 20);
        const groundMaterial = new THREE.MeshStandardMaterial({
            map: groundTexture,
        });
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        // Standardize size for player and NPCs
        const entityGeometry = new THREE.BoxGeometry(1, 2, 1);

        // Add player (green cube)
        const playerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const player = new THREE.Mesh(entityGeometry, playerMaterial);
        player.position.y = 1; // half of height to place it on the ground
        scene.add(player);
        playerRef.current = player;

        // Add shops and NPCs
        const textureLoader = new THREE.TextureLoader();

        const gridSize = Math.ceil(Math.sqrt(gameState.clubs.length));
        const spacing = 20;
        gameState.clubs.forEach((club, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;

            const clubWidth = Math.random() * 3 + 3; // Random width between 3 and 6
            const clubHeight = Math.random() * 6 + 6; // Random height between 6 and 12
            const clubDepth = Math.random() * 3 + 3; // Random depth between 3 and 6

            const clubGeometry = new THREE.BoxGeometry(
                clubWidth,
                clubHeight,
                clubDepth
            );

            const clubTexture = textureLoader.load(club.imageUrl, (texture) => {
                texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.minFilter = THREE.LinearFilter;
            });

            const clubMaterial = new THREE.MeshPhongMaterial({
                map: clubTexture,
            });
            const clubMesh = new THREE.Mesh(clubGeometry, clubMaterial);
            clubMesh.position.set(
                col * spacing - (gridSize * spacing) / 2,
                clubHeight / 2,
                row * spacing - (gridSize * spacing) / 2
            );
            clubMesh.userData = { type: 'club', name: club.name };
            scene.add(clubMesh);
        });

        gameState.npcs.forEach((npc) => {
            const npcMaterial = new THREE.MeshPhongMaterial({
                color: 0x0000ff,
            });
            const npcMesh = new THREE.Mesh(entityGeometry, npcMaterial);
            npcMesh.position.set(
                Math.random() * 160 - 80,
                1,
                Math.random() * 160 - 80
            );
            npcMesh.userData = { type: 'npc', name: npc.name };
            scene.add(npcMesh);
        });

        // Add white street markings
        const markingMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const markingGeometry = new THREE.PlaneGeometry(1, spacing - 1);
                const marking = new THREE.Mesh(
                    markingGeometry,
                    markingMaterial
                );
                marking.rotation.x = -Math.PI / 2;
                marking.position.set(
                    col * spacing - gridSize * spacing,
                    0.01, // Slightly above ground
                    row * spacing - (gridSize * spacing) / 2 - spacing / 2
                );
                scene.add(marking);

                const markingGeometry2 = new THREE.PlaneGeometry(
                    spacing - 1,
                    1
                );
                const marking2 = new THREE.Mesh(
                    markingGeometry2,
                    markingMaterial
                );
                marking2.rotation.x = -Math.PI / 2;
                marking2.position.set(
                    col * spacing - (gridSize * spacing) / 2 - spacing / 2,
                    0.01, // Slightly above ground
                    row * spacing - (gridSize * spacing) / 2
                );
                scene.add(marking2);
            }
        }

        camera.position.set(0, 30, 30);
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
    }, [gameState.clubs, gameState.npcs, isInitialized]);

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
            if (!playerRef.current || !isInitialized) return; // Ensure initialization

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
            const targetPosition = playerRef.current.position.clone();

            switch (event.key) {
                case 'ArrowUp':
                    targetPosition.z -= moveDistance;
                    break;
                case 'ArrowDown':
                    targetPosition.z += moveDistance;
                    break;
                case 'ArrowLeft':
                    targetPosition.x -= moveDistance;
                    break;
                case 'ArrowRight':
                    targetPosition.x += moveDistance;
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
            targetPosition.x = Math.max(-100, Math.min(100, targetPosition.x));
            targetPosition.z = Math.max(-100, Math.min(100, targetPosition.z));

            // Use gsap for smooth animation
            gsap.to(playerRef.current.position, {
                x: targetPosition.x,
                z: targetPosition.z,
                duration: 0.3,
                onUpdate: () => {
                    movePlayer(playerRef.current.position);
                },
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer, interactionOptions, isInitialized]);

    // Clear interaction message when leaving a club
    useEffect(() => {
        if (!gameState.player.currentClub) {
            setInteractionMessage(null);
        }
    }, [gameState.player.currentClub]);

    // Render only if initialized
    if (!isInitialized) {
        return <div>Loading...</div>;
    }

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
                    top: 90,
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
                        top: 120,
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
