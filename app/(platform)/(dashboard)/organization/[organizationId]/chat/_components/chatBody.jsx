"use client"

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import supabase from '@/lib/chat-client';
import { useAuth } from '@clerk/nextjs';

import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";

const ChatBody = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useAuth();
    
    const params = useParams();
    const orgId = params.organizationId;

    const chatBodyRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log('Fetching messages', orgId)
                let { data: messages, error } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('org_id', orgId);

                if (error) {
                    throw error;
                }

                setMessages(messages);

                const channels = supabase.channel('custom-insert-channel')
                    .on(
                        'postgres_changes',
                        { event: 'INSERT', schema: 'public', table: 'messages' },
                        (payload) => {
                            console.log('Change received!')
                            setMessages((messages) => [...messages, payload.new]);
                        }
                    )
                    .subscribe()

            } catch (error) {
                setError(error.message || 'An error occurred while fetching messages.');
            }
        };
        fetchMessages();
    }, [orgId]);

    useEffect(() => {
        setTimeout(() => {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }, 0);
    }, [messages]);
    return (
        <div
            ref={chatBodyRef}
            style={{
                height: '462px',
                paddingTop: '16px',
                backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)',
                borderRadius: '10px',
                overflow: 'auto',
            }}
        >
            {messages.map(message => (
                <MessageBox
                    key={message.id}
                    position={message.user_id === userId ? "right" : "left"}
                    type={"text"}
                    title={message.user_id != userId ? message.user_name : "You"}
                    text={message.content}
                    avatar={message.user_id != userId ? message.image_url : null}
                    date={message.created_at}
                />
            ))}

        </div>
    )
}

export { ChatBody }