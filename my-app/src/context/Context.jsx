import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]); // Holds user input prompts
    const [historyData, setHistoryData] = useState([]); // Holds chat responses for history
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const escapeHtml = (str) => {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let textToSend = prompt !== undefined ? prompt : input;

        if (!textToSend.trim()) {
            setLoading(false);
            return;
        }

        setPrevPrompts((prev) => {
            if (!prev.includes(textToSend)) {
                return [...prev, textToSend];
            }
            return prev;
        });

        setRecentPrompt(textToSend);

        try {
            const response = await runChat(textToSend);

            // Escape raw HTML first
            let safeResponse = escapeHtml(response);

            // Apply lightweight formatting:
            // **bold** → <b>bold</b>
            safeResponse = safeResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

            // Add line breaks before numbered lists like "1.", "2."
            safeResponse = safeResponse.replace(/(^|\s)(\d\.)/g, "$1<br><br>$2");

            // Replace stray asterisks * with <br>
            safeResponse = safeResponse.replace(/\*/g, "<br>");

            // Animate word by word
            let words = safeResponse.split(" ");

            words.forEach((word, index) => {
                setTimeout(() => {
                    setResultData((prev) => prev + word + " ");
                }, index * 10); // 10 ms per word
            });

            // Store response to historyData
            setHistoryData((prevHistory) => [
                ...prevHistory,
                { prompt: textToSend, response: safeResponse },
            ]);

        } catch (error) {
            console.error("Error running chat:", error);
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        input,
        setInput,
        historyData, // Pass the history data to the context
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
