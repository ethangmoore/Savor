import moment from 'moment';
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
        <div className="border rounded p-4 bg-gradient-to-br from-purple-300 to-blue-300 hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-md text-white font-medium">{title}</h6>
                    <span className="text-xs text-slate-500">{moment(date).format('MMM DD YYYY')}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-white'}`} onClick={onPinNote} />
            </div>

            <p className="text-xs text-black mt-2">{servings?.slice(0, 60)}</p>

            <p className="text-xs text-black mt-2">{cuisineType?.slice(0, 60)}</p>

            <p className="text-xs text-black mt-2">{cookTime?.slice(0, 60)}</p>

            <p className="text-xs text-black mt-2">{description?.slice(0, 60)}</p>

            <p className="text-xs text-black mt-2">{ingredients?.slice(0, 60)}</p>

            <p className="text-xs text-black mt-2">{directions?.slice(0, 60)}</p>



            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-white">{tags.map((item)=> `#${item} `)}</div>

                <div className="flex items-center gap-2">
                    <MdCreate
                        className="icon-btn text-white hover:text-green-600"
                        onClick={onEdit}
                    />

                    <MdDelete
                        className="icon-btn text-white hover:text-red-500"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;