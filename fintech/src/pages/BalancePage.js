import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import HeaderWhite from "../components/HeaderWhite";
import BalanceCard from "../components/Balance/BalanceCard";
import TransactionList from "../components/Balance/TransactionList";

const BalancePage = () => {
    console.log(useLocation());
    useEffect(() => {
        getUserBalance();
        getTransaction();
    }, []);

    const { fintechUseNo } = queryString.parse(useLocation().search);
    // fintechUseNo값을 가져오는거임 ㅇㅇ 
    const [balance, setbalance] = useState("");
    const [transaction, set_transaction] = useState([]);
    //console.log(fintechUseNo);

    const genTransId = () => {
        let countnum = Math.floor(Math.random() * 1000000000) + 1;
        let transId = "본인 이용기관 번호 " + countnum; //이용기관번호 본인것 입력
        return transId;
    };

    const getUserBalance = () => {
        //   request 생성 / 응답을 text 출력
        const accessToken = localStorage.getItem("토큰 키 값 ");
        const sendData = {
            bank_tran_id: genTransId(),
            fintech_use_num: fintechUseNo, //이건 포스트맨에 있는거 그대로 가져오면 됨 
            tran_dtime: "20220224154030"
        };

        const option = {
            method: "GET",
            url: "/v2.0/account/balance/fin_num",//물음표 전까지만 ㅇㅇ 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: sendData, //object
        };

        axios(option).then(({ data }) => {
            console.log(data);
            setbalance(data);
        });

    };



    const getTransaction = () => {
        const accessToken = localStorage.getItem("토큰 키 값 ");
        const sendData = {
            bank_tran_id: genTransId(),
            fintech_use_num: fintechUseNo, //이건 포스트맨에 있는거 그대로 가져오면 됨 
            inquiry_type: "A",
            inquiry_base: "D",
            from_date: "20220101",
            to_date: "20220225",
            sort_order: "D",
            tran_dtime: "20220225101730"
        };

        const option = {
            method: "GET",
            url: "/v2.0/account/transaction_list/fin_num",//물음표 전까지만 ㅇㅇ 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: sendData, //object
        };

        axios(option).then(({ data }) => {
            console.log(data);
            set_transaction(data.res_list);
        });




    }
    //맵핑 부분하는거 코드 리뷰하기
    /*{transaction.map((data) => {
                return (
                    <p>
                        {data.print_content} / {data.tran_amt}
                    </p>
                    //맵핑할 때 매개변수가, 배열에 접근하는거임 -> 변수니까 반환할 때 {}타입으로 접근하고 
                );
            })}*/

    return (
        <div>
            <HeaderWhite title="잔액조회"></HeaderWhite>
            <BalanceCard
                bankName={balance.bank_name}
                fintechNo={balance.fintech_use_num}
                balance={balance.balance_amt}
            ></BalanceCard>
            <TransactionList transactionList={transaction}></TransactionList>


        </div>
    );
};

export default BalancePage;