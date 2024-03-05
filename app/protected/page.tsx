
import { ClerkProvider, UserButton } from "@clerk/nextjs";

const ProtectedPage = () => {
    return (
        <ClerkProvider>
            <div>
                <UserButton 
                afterSignOutUrl="/"
                />
            </div>
        </ClerkProvider>
    );
};

export default ProtectedPage;
