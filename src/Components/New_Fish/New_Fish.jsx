import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './New_Fish.css'
import silver_arowana from '../../assets/silver_arowana.png';
import red_arowana from '../../assets/red_arowana.png';
import golden_arowana from '../../assets/golden_arowana.png';
import blue_arowana from '../../assets/blue_arowana.png';
import rainbow_arowana from '../../assets/rainbow_arowana.png';
import axios from 'axios'

const NewFish = () => {
    const navigate = useNavigate();
    const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
    const [formData, setFormData] = useState({
        fishName: '',
        fishMessage: '',
        fishAuthor: ''
    });

    const skinImages = {
        silver_arowana: silver_arowana,
        red_arowana: red_arowana,
        golden_arowana: golden_arowana,
        blue_arowana: blue_arowana,
        rainbow_arowana: rainbow_arowana
    };

    // Fish skins data
    const fishSkins = [
        { name: "银 龙鱼", skin: "silver_arowana" },
        { name: "红 龙鱼", skin: "red_arowana" },
        { name: "金 龙鱼", skin: "golden_arowana" },
        { name: "蓝 龙鱼", skin: "blue_arowana" },
        { name: "彩色 龙鱼", skin: "rainbow_arowana" }
    ];

    const currentSkin = fishSkins[currentSkinIndex];

    const handleSkinChange = (direction) => {
        if (direction === 'prev') {
            setCurrentSkinIndex((prevIndex) =>
                (prevIndex - 1 + fishSkins.length) % fishSkins.length
            );
        } else {
            setCurrentSkinIndex((prevIndex) =>
                (prevIndex + 1) % fishSkins.length
            );
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFish = {
            name: formData.fishName,
            message: formData.fishMessage,
            author: formData.fishAuthor,
            skin: currentSkin.skin,
            timestamp: new Date().toISOString()
        };

        try {
            axios.post("https://project-arowana-server.onrender.com/api/fish", newFish)
        } catch (error) {
            console.error('Failed posting to MongoDB:', error);
        }

        alert('Fish added successfully!');
        setFormData({
            fishName: '',
            fishMessage: '',
            fishAuthor: ''
        });
        navigate('/');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="fish-form">
                <div className="form-group">
                    <div className="fish-skin">
                        <button
                            type="button"
                            className="skin-button left-button"
                            onClick={() => handleSkinChange('prev')}
                        >
                            &lt;
                        </button>
                        <div>
                            <img
                                src={skinImages[currentSkin.skin]}
                                alt={currentSkin.name}
                                className="fish-image"
                            />
                            <div className="skin-name">{currentSkin.name}</div>
                        </div>
                        <button
                            type="button"
                            className="skin-button right-button"
                            onClick={() => handleSkinChange('next')}
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="fishName">龙鱼 Name:</label>
                    <input
                        type="text"
                        id="fishName"
                        name="fishName"
                        value={formData.fishName}
                        onChange={handleInputChange}
                        placeholder="Enter 龙鱼's name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fishMessage">龙鱼 Message:</label>
                    <input
                        type="text"
                        id="fishMessage"
                        name="fishMessage"
                        value={formData.fishMessage}
                        onChange={handleInputChange}
                        placeholder="Enter 龙鱼's message"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fishAuthor">Your 大名:</label>
                    <input
                        type="text"
                        id="fishAuthor"
                        name="fishAuthor"
                        value={formData.fishAuthor}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <button className="submit" type="submit">Throw your 龙鱼 into 水池</button>
            </form>
            <div className="nav-btn">
                <a onClick={() => navigate('/')} className="back-button" style={{ cursor: 'pointer' }}>
                    ←  Back to 水池
                </a>
                <a onClick={() => navigate('/credit')} className="credit-button" style={{ cursor: 'pointer' }}>
                    Credit
                </a>
            </div>

        </div>
    );
};

export default NewFish;