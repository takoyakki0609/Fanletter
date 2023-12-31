import React, { useState } from "react";
import styled from "styled-components";
import dummy from "../shared/fakeData.json";
import { Link, useNavigate } from "react-router-dom";
import uuid from "react-uuid";


//버튼스타일
const style = {
  "border": "none",
  "padding": '10px',
  "margin":'10px',
  "cursor":"pointer",
  "background":"white"
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  background: url(../assets/nongdamgom.png);
`;

const Title = styled.h1`
  font-size: 30px;
  margin-top: 50px;
`;

const Form = styled.form`
  margin: 0 auto;
  margin-bottom: 20px;
  width: 500px;
  padding: 20px;
  background-color: gray;
`;

const SectionBox = styled.section`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 20%;
  display: flex;
  align-items: center;
`;
const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  margin: 0 auto;
  background-color: black;
`;
const Users = styled.li`
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: white;
  transition: all 0.5s;
  cursor: pointer;
  &:hover{
    transform: scale(1.05);
  }
`;

export default function Home() {
  const navigate = useNavigate();

  //항상 한번 바꾸면 하ㄴ번 테스트 하기
  const [data, setData] = useState(dummy)
  const [nickname, setNickname] = useState('')
  const [content, setContent] =useState('')
  const [seleted, setSeleted] = useState("")

  const enrollHandler = (e) => {
    e.preventDefault();
    const newArr = {
      id:uuid(),
      createdAt:new Date().toString(),
      nickname:nickname,
      avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMLq7qLjd3tJE_MxbQzSk5BGng5SXecU82AVzphYuloDHl-cVyTYOiLiGRwDF9jZ1Fig&usqp=CAU",
      content:content,
      writedTo:seleted
    }
    setData((prev)=>{return [...prev, newArr]})
  }

  const onChangeNickname = (e) => {
    setNickname(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }
  const onChangeSeleted = (e) => {
    setSeleted(e.target.value)
    console.log(onChangeSeleted)
  }
 


  return (
    <Container>
      <div>
        <Title>농담곰 팬레터 콜렉션</Title>
        <div>
            <button style={style}>전체보기</button>
            <button style={style}>농담곰</button>
            <button style={style}>두더지 고로케</button>
            <button style={style}>퍼그씨</button>
        </div>
      </div>

      <Form onSubmit={enrollHandler}>
        {/* 닉네임 */}
        <SectionBox>
          <Label>닉네임:</Label>
          <input
            type="text"
            value={nickname}
            onChange={(e)=>onChangeNickname(e)}
            placeholder="최대 20글자까지 작성할 수 있습니다"
            maxLength="20"
            style={{ width: "100%", padding: "5px 10px" }}
          />
        </SectionBox>
        {/* 내용 */}
        <SectionBox>
          <Label>내용:</Label>
          <textarea
            type="text"
            placeholder="최대 100자까지만 작성할 수 있습니다."
            maxLength="100"
            value={content}
            onChange={(e)=>onChangeContent(e)}
            style={{
              width: "100%",
              height: "80px",
              padding: "5px 10px",
            }}
          />
        </SectionBox>
        <SectionBox>
          <label>
            누구에게 보내실 건가요?&nbsp;
            <select value={seleted} onChange={onChangeSeleted}>
              <option value="농담곰">농담곰</option>
              <option value="두더지 고로케">두더지 고로케</option>
              <option value="퍼그씨">퍼그씨</option>
            </select>
          </label>
        </SectionBox>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button>팬레터 등록</button>
        </div>
      </Form>
      <div>
        <UserList>
          {data.map((item) => {
            return (
              <Users key={item.id}>
                {/* <Link to={`/detail/${item.id}`} style={{textDecoration:'none',color:'white'}}> */}
                <div onClick={()=>{
                  //1.경로 2.인자
                  navigate(`/detail/${item.id}`, { state: data })
                }}>
                  <section style={{ display: "flex", alignItems: "center" }}>
                    <figure style={{width:'100px'}}>
                      <img
                        src={item.avatar}
                        alt="유저아바타"
                        style={{ borderRadius: "50%", width: "50%" }}
                      />
                    </figure>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>{item.createdAt}</span>
                      <span>{item.nickname}</span>
                    </div>
                  </section>
                  <div>
                    <p
                      style={{
                        marginLeft: "90px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
                {/* </Link> */}
              </Users>
            );
          })}
        </UserList>
      </div>
    </Container>
  );
}
