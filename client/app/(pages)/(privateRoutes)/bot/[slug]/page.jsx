import { useParams } from "next/navigation";

const BotChatPage = ()=> {
    const {slug} = useParams()
    return (
        <>
        Bot Page
        </>
    )
}

export default BotChatPage;