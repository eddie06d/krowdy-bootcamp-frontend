import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ChannelScreen from "./pages/ChannelScreen";
import MessagesScreen from "./pages/MessagesScreen";
import TypeMessageScreen from "./pages/TypeMessageScreen";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TypeMessageScreen />} />
                <Route path="/channel" element={<ChannelScreen />} />
                <Route path="/messages" element={<MessagesScreen />} />
            </Routes>
        </BrowserRouter>
    );
}