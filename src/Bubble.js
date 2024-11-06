import React from 'react';
import S from './style.js';
import { useMessage } from './MessageContext'; 

const forbiddenWords = ["야해", "음탕", "덩어리","개","자식","미치","마귀","성기","돌은","거지"];

function Bubble() {
    const { message, setMessage, result, setResult } = useMessage(); 
    const [messages, setMessages] = React.useState([]); 

    const sendMessage = () => {
        for (let word of forbiddenWords) {
            if (message.includes(word)) {
                setResult("금칙어 '"+word+"'(으)로 인해 전송이 불가합니다.");
                return;
            }
        }
        setMessages([...messages, { text: message, isUser: true }]); 
        setMessage(''); 
        setResult(''); 
    };

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
                            <S.MessageText>저는 금칙어 설정 변경을 위해 만들어진 가상의 인물입니다. 저에게 금칙어가 포함된 단어는 전송하실 수 없습니다.</S.MessageText>
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