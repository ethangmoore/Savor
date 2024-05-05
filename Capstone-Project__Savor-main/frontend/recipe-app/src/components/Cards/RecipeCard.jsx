import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const RecipeCard = ({
    title,
    date,
    servings,
    cuisineType,
    cookTime,
    description,
    ingredients,
    directions,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <span className="text-xs text-slate-500">{date}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
            </div>

            <p className="text-xs text-slate-600 mt-2">{servings?.slice(0, 60)}</p>

            <p className="text-xs text-slate-600 mt-2">{cuisineType?.slice(0, 60)}</p>

            <p className="text-xs text-slate-600 mt-2">{cookTime?.slice(0, 60)}</p>

            <p className="text-xs text-slate-600 mt-2">{description?.slice(0, 60)}</p>

            <p className="text-xs text-slate-600 mt-2">{ingredients?.slice(0, 60)}</p>

            <p className="text-xs text-slate-600 mt-2">{directions?.slice(0, 60)}</p>



            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500">{tags}</div>

                <div className="flex items-center gap-2">
                    <MdCreate
                        className="icon-btn hover:text-green-600"
                        onClick={onEdit}
                    />

                    <MdDelete
                        className="icon-btn hover:text-red-500"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;