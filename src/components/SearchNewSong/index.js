import React from 'react'

export default function SearchNewSong({ inputs, handleInputChange }) {
    return (


        <>< div className="form-group left-align">
            <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleInputChange}
            />
            <label htmlFor="title">title</label>
        </div>
            <div className="form-group left-align">
                <input
                    type="text"
                    name="artist"
                    value={inputs.artist}
                    onChange={handleInputChange}
                />
                <label htmlFor="artist">artist</label>
            </div>
        </>
    )
}
