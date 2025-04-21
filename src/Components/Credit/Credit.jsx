import React from 'react';
import './Credit.css';
import { useNavigate } from 'react-router-dom';

const techs = [
    {
        name: 'React.js + Vite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        link: 'https://vitejs.dev/',
    },
    {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        link: 'https://www.mongodb.com/',
    },
    {
        name: 'Express.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        link: 'https://expressjs.com/',
    },
    {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        link: 'https://nodejs.org/',
    },
];

const Credit = () => {
    const navigate = useNavigate();
    return (
        <div className="credit-dark-container">
            <h1 className="credit-dark-title">Credits</h1>

            <div className="credit-dark-grid">
                {techs.map((tech) => (
                    <a
                        key={tech.name}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="credit-dark-box"
                    >
                        <img src={tech.icon} alt={tech.name} className="credit-dark-icon" />
                        <p>{tech.name}</p>
                    </a>
                ))}
            </div>

            <div className="credit-dark-footer">
                <a onClick={() => navigate('/aquarium')} className="back-button" style={{ cursor: 'pointer' }}>
                    ← 我懂你按错了，按这里回去🐟
                </a>
                <a
                    href="https://github.com/kztan2004/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="credit-dark-link"
                >
                    View on GitHub →
                </a>
                <p className="credit-dark-copy">©{new Date().getFullYear()} kztan2004.</p>
            </div>
        </div>
    );
};

export default Credit;
