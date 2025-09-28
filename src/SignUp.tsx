'use client'

import { Box, Button, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const [error, seterror] = useState(false);
    const navigate = useNavigate();


    const submitForm = async (e: FormEvent) => {
        e.preventDefault();

        // const password = passref.current?.value;

        if (username != '' && username.length > 7) {
            seterror(false);
            console.log(password);
            const newUser = { username: username, password: password }
            // axios.post('http://localhost:3000/new-user', {newUser})

            navigate('/');
        }
        else seterror(true);


    }

    return (
        <>

            <div>
                <label> User Name</label>
                <Input id='username'
                    placeholder='username'
                    type='text'
                    onChange={(e) => setusername(e.target.value)}>
                </Input>
            </div>
            <div>
                <label> Password</label>
                <Input id='password'
                    placeholder='password'
                    type='password'
                    onChange={(e) => setpassword(e.target.value)}
                >
                </Input>
            </div >
            {error && <Text color={'red'}>error </Text>
            }
            <Button mt={5} variant="surface" type='submit'
                onClick={submitForm}> Submit</Button>


        </ >
    );
}

export default SignUp