import React from 'react'

export default interface EmployeeProps{
    id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    salary: number;
    role:{
        id: number;
        description: string;
    }
}

