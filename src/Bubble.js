import React, { useState, useEffect } from 'react';
import S from './style.js';
import { useMessage } from './MessageContext'; 
import axios from 'axios';

function Bubble() {
    const { message, setMessage, result, setResult } = useMessage(); 
    const [messages, setMessages] = useState([]); 
    const [prohibitedWords, setProhibitedWords] = useState([]);
    const [insultWords, setInsultWords] = useState([]);

    useEffect(() => {
        const getWordsFromDB = async () => {
            try {
                const prohibitedResponse = await axios.get('http://localhost:5000/prohibited-words');
                const insultResponse = await axios.get('http://localhost:5000/insult-words');
                setProhibitedWords(prohibitedResponse.data);
                setInsultWords(insultResponse.data);
            } catch (error) {
                console.error("단어를 가져오는 중 오류 발생:", error);
            }
        };
        getWordsFromDB();
    }, []);

    async function analyzeMessage(message) {
        const apiKey = 'AIzaSyBXapnrj-0_UrpSDIhT9flz_wc8zn-oWrA';  
        const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;
        
        const body = {
            document: {
                content: message,
                type: 'PLAIN_TEXT',
            },
            encodingType: 'UTF8',
        };
        console.log("Request Body:", body);

        try {
            const response = await axios.post(url, body);
            const sentimentScore = response.data.documentSentiment.score;
            return { negative: sentimentScore < 0 };
        } catch (error) {
            console.error("NLP API 호출 오류:", error);
        }
    }

    async function sendMessage() {
        console.log("sendMessage 호출됨");   
        const prohibitedWordIn = prohibitedWords.some(word => message.includes(word));
        const insultWordin = insultWords.some(word => message.includes(word));
    
        // 욕설이 포함 되어 있는 경우
        if (insultWordin) {
            setResult("욕설이 포함되어 전송이 불가합니다.");
            console.log("욕설 존재");
            return;
        }
        // 금칙어가 포함 되어 있는 경우 -> 긍/부정 판단
        if (prohibitedWordIn) {
            const analysisResult = await analyzeMessage(message);
            const negative = analysisResult.negative;
    
            if (negative) {
                setResult("부정적인 의도로 판단되어 전송이 불가합니다.");
                console.log("금칙어 존재 & 부정적 의도")
                return;
            } else {
                console.log("금칙어가 포함되어 있으나 긍정적 의도이므로 전송됩니다.");
            }
        }
        setMessages([...messages, { text: message, isUser: true }]); 
        setMessage(''); 
        setResult(''); 
    }

    return (
        <S.Container>
            <S.Title><br/>가상의인물</S.Title>
            <S.MessagesDisplay>
                <S.MessageContainer>
                    <S.ProfileImage src="/img/profile.jpg" alt="Profile" />
                    <div>
                        <S.SenderName>가상의 인물</S.SenderName>
                        <S.MessageBubble>
                            <S.MessageText>안녕하세요 만나서 반갑습니다.</S.MessageText>
                        </S.MessageBubble>
                        <S.MessageBubble>
                            <S.MessageText>저는 금칙어 설정 변경을 위해 만들어진 가상의 인물입니다. 저에겐 금칙어가 포함된 단어는 전송하실 수 없습니다.</S.MessageText>
                        </S.MessageBubble>
                    </div>
                </S.MessageContainer>
                {messages.map((msg, index) => (
                    <S.MessageBubble key={index} style={{ marginLeft: msg.isUser ? '100px' : '0', backgroundColor: msg.isUser ? 'lightyellow' : '#ffffff' }}>
                        <S.MessageText>{msg.text}</S.MessageText>
                    </S.MessageBubble>
                ))}
            </S.MessagesDisplay>
            <S.TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
            />
            <S.Button onClick={sendMessage}>전송</S.Button>
            <S.Result style={{ color: result.includes("불가") ? 'red' : 'black' }}>{result}</S.Result>
        </S.Container>
    );
}

export default Bubble;
