import { Separator } from '@/components/ui/separator';
import { ChatHeader } from './_components/chatHeader';
import { ChatBody } from './_components/chatBody';
import { ChatInput } from './_components/chatInput';


import { checkSubscription } from "@/lib/subscription";

const ChatPage = async() => {
    const isPro = await checkSubscription()
    return (
        <div className='w-full border-2 h-fit p-2 rounded-md'>
            <ChatHeader isPro={isPro}/>
            <Separator />
            <ChatBody/>
            <ChatInput/>
        </div>
    );
};

export default ChatPage;
