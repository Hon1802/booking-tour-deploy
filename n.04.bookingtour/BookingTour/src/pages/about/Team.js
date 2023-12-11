import React from 'react'
import { avatar } from "../../assets";
const team = [
    {
        name: "Vu Hoang Truc Vy",
        role: "Founder & CEO",
        avatar: avatar
    },
    {
        name: "Nguyen Van Hon",
        role: "Manager",
        avatar: avatar
    },
    {
        name: "Nguyen Luong Nguyen",
        role: "Tour Guide",
        avatar: avatar
    }
]
const Team = () => {
    return (
        <div id="team">
            <div className='team-title text-center'>OUR TEAM</div>
            <div className='wrapper'>
                {team.map((item, index) => {
                    return (
                        <div className='team-item' key={index}>
                            <div className='image'>
                                <img src={item.avatar} />
                            </div>
                            <div className='content'>
                                <h3>{item.name}</h3>
                                <p>{item.role}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Team;
