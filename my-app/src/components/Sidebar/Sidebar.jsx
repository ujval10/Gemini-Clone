import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [showHistory, setShowHistory] = useState(false); // New state for toggling history
    const { onSent, prevPrompts, setRecentPrompt, historyData } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>

            <div className="bottom">
                {/* Toggle between Recent and History */}
                <div
                    className="bottom-item recent-entry"
                    onClick={() => setShowHistory(false)} // Show Recent Prompts
                >
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Recent</p> : null}
                </div>
                <div
                    className="bottom-item recent-entry"
                    onClick={() => setShowHistory(true)} // Show History
                >
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>History</p> : null}
                </div>
            </div>

            {/* Display the correct data based on the selected tab */}
            {showHistory ? (
                <div className="recent">
                    <p className="recent-title">History</p>
                    {historyData.map((item, index) => {
                        return (
                            <div key={index} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.prompt.slice(0, 18)} ...</p>
                                <p>{item.response.slice(0, 40)} ...</p>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default Sidebar;
