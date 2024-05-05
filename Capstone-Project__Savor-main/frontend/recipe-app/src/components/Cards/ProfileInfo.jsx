import React from 'react'

const ProfileInfo = ({ onLogout }) => {
    return (
        <div className='flex items-center gap-3'>
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">ZW
          {getInitials("Zavion Williams")}
          </div>

          <div>
            <p className="text-sm font-medium">Zavion</p>
              <button className="" onClick={onLogout}>
                 Logout
               </button>
          </div>
        </div>
    );
};

export default ProfileInfo;