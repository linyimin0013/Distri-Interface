import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getMachineList } from "../services/machine";
import DeviceList from "../components/DeviceList";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

function Home({ className }) {
  document.title = "Market";
  const wallet = useAnchorWallet();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadList = async () => {
    setLoading(true);
    try {
      let res = await getMachineList(true, 1, [], wallet.publicKey.toString());
      res.list.map((item) => (item.loading = false));
      setList(res.list);
    } catch (e) {
      setList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadList = async () => {
      setLoading(true);
      try {
        let res = await getMachineList(
          true,
          1,
          [],
          wallet.publicKey.toString()
        );
        res.list.map((item) => (item.loading = false));
        setList(res.list);
      } catch (e) {
        setList([]);
      }
      setLoading(false);
    };
    loadList();
  }, [wallet?.publicKey]);
  return (
    <div className={className}>
      <div className="hold"></div>
      <div className="con">
        <h1 className="title">Share My Device</h1>
        <div className="con-table">
          <DeviceList
            list={list}
            setList={setList}
            isMyDevice={true}
            loading={loading}
            reloadFunc={loadList}
          />
        </div>
      </div>
    </div>
  );
}

export default styled(Home)`
  display: block;
  width: 100%;
  color: #fff;
  .con {
    width: 1200px;
    margin: 10px auto;
    display: block;
    padding: 0 20px;
    .title {
      font-family: Montserrat Bold, Montserrat, sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 28px;
      color: #ffffff;
      padding-left: 36px;
      background-image: url(/img/market/2.png);
      background-repeat: no-repeat;
      background-size: 32px;
      background-position: left;
      margin-top: 25px;
    }
    .filter {
      padding: 11px 0;
      display: flex;
      flex-direction: row;
      line-height: 30px;
      .txt {
        font-size: 14px;
        line-height: 30px;
        height: 30px;
        display: block;
      }
      .sel {
        padding: 0px 7px;
      }
      .btn-txt {
        font-weight: 700;
        font-size: 14px;
        text-decoration: underline;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .block {
    display: block;
    overflow: hidden;
  }
  .pager {
    display: flex;
  }
`;
