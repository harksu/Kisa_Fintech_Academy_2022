import React, { useState } from 'react'
import Welcome from './Welcome'

const ListComponents = () => {
    const [users, setUsers] = useState([
        { name: "홍길동", age: 12, height: 180 },
        { name: "길동", age: 12, height: 180 },
        { name: "동", age: 12, height: 180 },
    ])

    return (
        <div>
            {
                users.map((user) => {
                    return <Welcome username={user.name} age={user.age}></Welcome>
                })
            }
        </div>
    )
}

export default ListComponents