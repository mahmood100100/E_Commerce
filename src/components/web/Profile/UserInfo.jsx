import React, { useContext } from 'react';
import { UserContext } from '../Context/User';

export default function UserInfo() {
    let { loading, userData } = useContext(UserContext);

    if (loading) {
        return <h2>Loading ...</h2>;
    }

    return (
        <div>
            {userData && (
                <>
                    <h2>{userData.userName}</h2>
                    <h3>{userData.role}</h3>
                    <img src={userData.image.secure_url} alt="" className='w-100 h-50' />
                </>
            )}
        </div>
    );
}
