import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Aquarium.css';
import silver_arowana from '../../assets/silver_arowana.png';
import red_arowana from '../../assets/red_arowana.png';
import golden_arowana from '../../assets/golden_arowana.png';
import blue_arowana from '../../assets/blue_arowana.png';
import rainbow_arowana from '../../assets/rainbow_arowana.png';
import axios from 'axios';
import backgroundMusic from '../../music/dazhanhongtu.mp3'; // Import your music file
import lyrics from './lyrics';

const Aquarium = () => {
    const [fishes, setFishes] = useState([]);
    const aquariumRef = useRef(null);
    const requestRef = useRef();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentLyric, setCurrentLyric] = useState("水池里面银龙鱼");

    // Initialize audio
    useEffect(() => {
        audioRef.current = new Audio(backgroundMusic);
        audioRef.current.loop = true;

        const updateLyrics = () => {
            if (audioRef.current && !audioRef.current.paused) {
                const time = audioRef.current.currentTime;
                const currentLine = [...lyrics].reverse().find(lyric => time >= lyric.time);
                if (currentLine) {
                    setCurrentLyric(currentLine.text);
                }
            }
        };

        const intervalId = setInterval(updateLyrics, 500); // Check every 0.5s

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            clearInterval(intervalId);
        };
    }, []);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setCurrentLyric("水池里面银龙鱼"); // Reset to default
        } else {
            audioRef.current.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
        setIsPlaying(!isPlaying);
    };


    // Default fish data and other existing code...
    const defaultFishData = [
        { name: "大展宏图", message: "大师亲手提笔字", skin: "golden_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
        { name: "银龙鱼", message: "一条银龙鱼", skin: "silver_arowana" },
    ];

    useEffect(() => {
        const fetchFishes = async () => {
            try {
                const response = await axios.get("https://project-arowana-server.onrender.com/api/fish");
                const mongoFishes = response.data.map(fish => ({
                    name: fish.name,
                    message: fish.author ? `${fish.message} (by ${fish.author})` : fish.message,
                    skin: fish.skin || 'silver_arowana'
                }));
                setFishes([...defaultFishData, ...mongoFishes]);
            } catch (error) {
                console.error("Failed to fetch fish: ", error);
            }
        };

        fetchFishes();

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="aquarium" ref={aquariumRef}>
            <button
                className="music-toggle"
                onClick={toggleMusic}
            >
                {isPlaying ? '🔊' : '🔇'}
            </button>
            <div className={`background-text ${isPlaying ? 'active' : ''}`}>
                {currentLyric}
            </div>
            {fishes.map((fish, index) => (
                <Fish
                    key={index}
                    fishData={fish}
                    aquariumRef={aquariumRef}
                />
            ))}
            <button className="nav-button" onClick={() => navigate('/new-fish')}>
                Get Your 龙鱼
            </button>
        </div>
    );
};
const Fish = ({ fishData, aquariumRef }) => {
    const fishRef = useRef(null);
    const nameTagRef = useRef(null);
    const messageTagRef = useRef(null);
    const requestRef = useRef();

    const skinImages = {
        silver_arowana: silver_arowana,
        red_arowana: red_arowana,
        golden_arowana: golden_arowana,
        blue_arowana: blue_arowana,
        rainbow_arowana: rainbow_arowana
    };

    const [position, setPosition] = useState({
        x: 100 + Math.random() * (window.innerWidth - 200),
        y: 100 + Math.random() * (window.innerHeight - 200)
    });
    const [angle, setAngle] = useState(randomAngle());
    const [speed, setSpeed] = useState(0.1 + Math.random() * 0.5);
    const [isMoving, setIsMoving] = useState(true);
    const [isLeft, setIsLeft] = useState(Math.cos(angle) < 0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const swim = () => {
            if (!isMoving || !aquariumRef.current) return;

            // Calculate new position
            const newX = position.x + Math.cos(angle) * speed;
            const newY = position.y + Math.sin(angle) * speed;

            const aquariumWidth = window.innerWidth;
            const aquariumHeight = window.innerHeight;

            // Boundary check with cooldown
            let newAngle = angle;
            if ((newX <= 0 || newX >= aquariumWidth - 80) ||
                (newY <= 15 || newY >= aquariumHeight - 80)) {
                newAngle = angle + Math.PI + (-0.523599 + Math.random() * 1.0472);
                if (newAngle > 2 * Math.PI) {
                    newAngle = newAngle - (2 * Math.PI);
                }
                setAngle(newAngle);
            }

            const movingLeft = Math.cos(newAngle) > 0;
            if (movingLeft !== isLeft) {
                setIsLeft(movingLeft);
            }

            setPosition({ x: newX, y: newY });

            // Update tags position
            if (nameTagRef.current && messageTagRef.current) {
                nameTagRef.current.style.left = `${newX + 40}px`;
                nameTagRef.current.style.top = `${newY - 20}px`;
                messageTagRef.current.style.left = `${newX + 40}px`;
                messageTagRef.current.style.top = `${newY + 55}px`;
            }

            requestRef.current = requestAnimationFrame(swim);
        };

        requestRef.current = requestAnimationFrame(swim);
        return () => cancelAnimationFrame(requestRef.current);
    }, [position, angle, speed, isMoving, isLeft]);

    useEffect(() => {
        // Random speed variation
        const speedInterval = setInterval(() => {
            setSpeed(0.1 + Math.random() * 0.5);
        }, 3000 + Math.random() * 3000);

        // Random angle variation
        const angleInterval = setInterval(() => {
            setAngle(randomAngle());
        }, 3000 + Math.random() * 3000);

        return () => {
            clearInterval(speedInterval);
            clearInterval(angleInterval);
        };
    }, []);

    const handleMouseEnter = () => {
        setIsMoving(false);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsMoving(true);
        setIsHovered(false);
    };

    return (
        <>
            <img
                ref={fishRef}
                src={skinImages[fishData.skin]}
                className={`fish ${isLeft ? 'flip-horizontal' : ''} ${isHovered ? 'fish-hover' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                alt={fishData.name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <div
                ref={nameTagRef}
                className="name-tag"
                style={{
                    left: `${position.x + 40}px`,
                    top: `${position.y - 20}px`,
                }}
            >
                {fishData.name}
            </div>
            <div
                ref={messageTagRef}
                className="message-tag"
                style={{
                    left: `${position.x + 40}px`,
                    top: `${position.y + 55}px`,
                    display: isHovered ? 'block' : 'none',
                }}
            >
                {fishData.message}
            </div>
        </>
    );
};

function randomAngle() {
    const degRanges = [
        [0, 30],
        [330, 360],
        [150, 210]
    ];
    const [min, max] = degRanges[Math.floor(Math.random() * degRanges.length)];
    const angleDeg = min + Math.random() * (max - min);
    return angleDeg * (Math.PI / 180);
}

export default Aquarium;