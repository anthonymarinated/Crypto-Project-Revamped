import React, { useEffect, useState } from "react";

export default function todoList(){
    const [list, setList] = useState([]);
    async function requestList(){
        const res = await fetch(
            "http://localhost:3000/todos"
        );
        const json = await res.json();
        setList(json);
    }
    console.log(setList);
    // useEffect(() => {
    //     requestList();
    // },[])
    return (
        <h1>Hi</h1>
    )
}