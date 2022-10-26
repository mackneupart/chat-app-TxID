import React from 'react';
import './Home.css';

export default () => {
    return (
        <div className='home'>
        <h1 className="page">Home page</h1>
            <div className='navBar'>
                this is navBar
            </div>
            <div className='box'>
                <div className='userBox'>
                    this is userBox
                </div>
                <div className='chatOverview'>
                    <div className='chat'>
                        this is chat 1
                    </div>
                    <div className='chat'>
                        this is chat 2
                    </div>
                    <div className='chat'>
                        this is chat 3
                    </div>
                    <div className='newChats'>
                        <div className='newChat'>
                            this is new chat
                        </div>
                        <div className='newGroupChat'>
                            this is new group chat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


