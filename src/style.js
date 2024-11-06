import styled from 'styled-components';
const S = {};

S.Container = styled.div`
    width: 468px;
    min-height: 42rem; 
    max-height: 80vh; 
    background-color: #D3E9F5;
    margin: 0 auto;
    display: flex;
    flex-direction: column; 
`;

S.Title = styled.div`
    width: 100%;
    height: 4rem;
    border-radius: 0 0 10px 10px;
    border-bottom: solid 1.5px #cfcfcf;
    background-color: #ffffff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-weight: 700;
`;

S.MessagesDisplay = styled.div`
    flex-grow: 1; 
    overflow-y: auto; 
    padding: 10px; 
`;

S.MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 20px 0;
`;

S.ProfileImage = styled.img`
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 10px;
    width: 50px;
    height: 50px;
`;

S.MessageBubble = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    max-width: 70%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
`;

S.SenderName = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

S.MessageText = styled.div`
    font-size: 16px;
`;

S.TextArea = styled.textarea`
    width: 80%;
    height: 100px;
    background-color: #ffffff;
    border: solid 1px #000;
    margin: 20px auto; 
    display: block;
    border-radius: 10px;
`;

S.Button = styled.button`
    width: 200px;
    padding: 10px 10px;
    font-size: 16px;
    background-color: #FFE4E4;
    cursor: pointer;
    margin:0 auto;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 10px;
`;

S.Result = styled.p`
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
    
`;

export default S;
