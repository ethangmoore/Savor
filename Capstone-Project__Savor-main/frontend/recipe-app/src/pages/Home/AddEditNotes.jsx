import React from 'react'

const AddEditRecipes = () => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input
                type="text"
                classNam="text-2x1 text-slate-950 outline-none"
                placeholder="Go To Gym At 5"
                />
            </div>
        </div>
    )
}

export default AddEditRecipes