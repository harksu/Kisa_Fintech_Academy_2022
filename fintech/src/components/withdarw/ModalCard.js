import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const ModalCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  padding: 20px;
  border: 1px #112211 solid;
`;
const CardTitle = styled.div`
  font-size: 1rem;
  color: black;
`;
const FintechUseNo = styled.div`
  font-size: 0.7rem;
  margin-bottom: 30px;
`;

const WithDrawButton = styled.button`
  border: none;
  padding: 0.3rem;
  background: #2aa450;
  color: white;
  margin-top: 0.3rem;
`;

const ModalCard = ({ bankName, fintechUseNo, tofintechno }) => {
    // input data 받아온다음에 결제 버튼을 눌렀을때 axios 출금 이체를 바생시키기;
    const [amount, setamount] = useState("");
    const handleAmountChange = (e) => {
        const { value } = e.target;
        setamount(value);
    };
    const genTransId = () => {
        let countnum = Math.floor(Math.random() * 1000000000) + 1;
        let transId = "본인의 이용기관 번호" + countnum; //이용기과번호 본인것 입력
        return transId;
    };

    const handleWithdraw = () => {
        //axios call
        const accessToken = localStorage.getItem("토큰 키값");
        const sendData = JSON.stringify(
            {
                bank_tran_id: genTransId(),
                cntr_account_type: "N",
                cntr_account_num: "출금 계좌번호",
                dps_print_content: "이용료(홍길동)",
                fintech_use_num: "핀테크 번호",
                //이건 포스트맨에 있는거 그대로 가져오면 됨, 일단은 하드 코딩(좋은 습관 x)
                tran_amt: "000000001000",
                tran_dtime: "20220224154030",
                req_client_name: "송신자 이름",
                req_client_num: "H1234",
                req_client_fintech_use_num: "핀테크 번호",
                transfer_purpose: "ST",
                recv_client_name: "수신자 이름",
                recv_client_bank_code: "은행 코드",
                recv_client_account_num: "수신 계좌 번호"
            }
        );


        const option = { //데이터 요청 형식(금융 api 참조)
            method: "POST",
            url: "/v2.0/transfer/withdraw/fin_num",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: sendData, //object
        };

        axios(option).then(({ data }) => {
            console.log(data);

        });



    };

    const deposit = () => {
        //입금 이체 
        const two_leg_token = "발금받은 2레그 토큰 "
        const sendData = JSON.stringify(
            {

                cntr_account_type: "N",
                cntr_account_num: "출금 계좌번호",
                wd_pass_phrase: "NONE",
                wd_print_content: "이용료",
                name_check_option: "off",
                tran_dtime: "20220225014230",
                req_cnt: "1",
                req_list: [
                    {
                        tran_no: "1",
                        bank_tran_id: genTransId(),
                        fintech_use_num: "핀테크 번호 ",
                        print_content: "오픈서비스캐시백",
                        tran_amt: "000000000500",
                        req_client_name: "수신자 이름",
                        req_client_fintech_use_num: "수신 계좌 번호",
                        req_client_num: "H1234",
                        transfer_purpose: "ST"
                    }
                ]

            }
        );

        const option = {
            method: "POST",
            url: "/v2.0/transfer/deposit/fin_num",//물음표 전까지만 ㅇㅇ 
            headers: {
                Authorization: `Bearer ${two_leg_token}`
            },
            data: sendData, //object
        };

        axios(option).then(({ data }) => {
            console.log(data);
            if (data.rsp_code === "A0000") {
                alert("결제 성공");
            }
        });

    };

    return (
        <ModalCardBlock>
            <CardTitle>{bankName}</CardTitle>
            <FintechUseNo>{fintechUseNo}</FintechUseNo>
            <p>{tofintechno}에 출금이체를 발생시킵니다.</p>
            <input onChange={handleAmountChange}></input>

            <WithDrawButton onClick={handleWithdraw}>결제하기</WithDrawButton>
        </ModalCardBlock>
    );
};

export default ModalCard;