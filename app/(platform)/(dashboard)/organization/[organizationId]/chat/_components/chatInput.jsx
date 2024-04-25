"use client"

import { useState, useRef } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

import supabase from '@/lib/chat-client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const ChatInput = () => {
    const [inputValue, setInputValue] = useState('');
    const { userId, orgId } = useAuth();
    const { user } = useUser();

    const inputRef = useRef(null);

    const sendMessage = async (event) => {
        event.preventDefault();
        const message = {
            user_name: user.fullName,
            content: inputRef.current.value,
            user_id: userId,
            org_id: orgId,
            image_url: user.imageUrl
        }
        try {
            
            await supabase
            .from('messages')
            .insert([
                message,
            ])
        } catch (error) {
            console.log(error)
        }
        
        setInputValue('');

    }
    const handleMessageChange = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <form onSubmit={sendMessage}>
            <div className="flex gap-2 mt-2">
                <Input
                    ref={inputRef}
                    type="text"
                    name="message"
                    value={inputValue}
                    onChange={handleMessageChange}
                    autoComplete='off'
                />
                <Button type="submit">Send</Button>
            </div>
        </form>
    )
}

export { ChatInput }