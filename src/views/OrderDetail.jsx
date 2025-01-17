import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import React, { useState, useEffect } from "react";

import { getDetailByUuid } from "../services/order";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { formatAddress } from "../utils/format";

function Home({ className }) {
  const { uuid } = useParams();
  document.title = "Order detail";
  let navigate = useNavigate();
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(false);
  const wallet = useAnchorWallet();

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        let res = await getDetailByUuid(uuid, wallet.publicKey.toString());
        setRecord(res);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    if (wallet?.publicKey) {
      loadDetail();
    }
  }, [uuid, wallet]);

  return (
    <div className={className}>
      <div className="hold"></div>
      <div className="con">
        <h1 className="title">Details</h1>
        <div className="d" style={{ width: "70%" }}>
          {loading ? (
            <Spin />
          ) : record && record.Metadata.machineInfo ? (
            <div className="detail">
              <div className="info-box">
                <div className="info-box-title">Configuration</div>
                <div className="info-box-body">
                  <div className="title2">
                    # {record.Metadata.machineInfo.UuidShort}
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>Provider</span>
                      <span>{record.Metadata.machineInfo.Owner}</span>
                    </div>
                    <div className="r">
                      <span>Region</span>
                      <span>{record.Metadata.machineInfo.Region}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>
                        {record.Metadata.machineInfo.GpuCount +
                          "x " +
                          record.Metadata.machineInfo.Gpu}
                      </span>
                      <span>
                        {record.Metadata.machineInfo.TFLOPS || "--"} TFLOPS
                      </span>
                    </div>
                    <div className="r">
                      <span>RAM</span>
                      <span>{record.Metadata.machineInfo.RAM}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>CPU</span>
                      <span>{record.Metadata.machineInfo.Cpu}</span>
                    </div>
                    <div className="r">
                      <span>Reliability</span>
                      <span>{record.Metadata.machineInfo.Reliability}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>Internet Seed</span>
                      <span>
                        <img
                          src="/img/market/download.svg"
                          style={{ transform: "rotate(180deg)" }}
                          alt=""
                        />{" "}
                        {record.Metadata.machineInfo.UploadSpeed || "--"}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="/img/market/download.svg" alt="" />{" "}
                        {record.Metadata.machineInfo.DownloadSpeed || "--"}
                      </span>
                    </div>
                    <div className="r">
                      <span>CPS</span>
                      <span>{record.Metadata.machineInfo.Score}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-title">Task Info</div>
                <div className="info-box-body">
                  <div className="title2">
                    {record.Metadata.formData.taskName}
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>Start Time</span>
                      <span>{new Date(record.OrderTime).toLocaleString()}</span>
                    </div>
                    <div className="r">
                      <span>Remaining Time</span>
                      <span>{record.RemainingTime}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>Duration</span>
                      <span>{record.Duration}h</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>Price</span>
                      <span>{record.Metadata.machineInfo.Price} DIST / h</span>
                    </div>
                    <div className="r">
                      <span>Total</span>
                      <span>{record.Total} DIST</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-title">Blockchain Info</div>
                <div className="info-box-body">
                  <div className="line">
                    <div className="l">
                      <span>Hash</span>
                      <span>{record.Uuid}</span>
                    </div>
                  </div>
                  <div className="line">
                    <div className="l">
                      <span>From</span>
                      <span>{record.Seller}</span>
                    </div>
                    <div className="r">
                      <span>To</span>
                      <span>{record.Buyer}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="color-box">
                <div className="l">
                  <span>Status</span>
                  <label>{record.StatusName}</label>
                </div>
                <div className="r">
                  {record.Buyer ===
                    formatAddress(wallet.publicKey.toString()) && (
                    <>
                      {record.Status === 0 && (
                        <label
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate("/extend-duration/" + record.Uuid)
                          }>
                          Extend Duration
                        </label>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            "No Data"
          )}
        </div>
      </div>
    </div>
  );
}

export default styled(Home)`
  display: block;
  color: #fff;
  .con {
    width: 1160px;
    margin: 10px auto;
    padding: 0 20px;
    display: block;
    overflow: hidden;
    .title {
      font-family: Montserrat Bold, Montserrat, sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 28px;
      color: #ffffff;
      margin-top: 25px;
      line-height: 70px;
    }
  }
  .info-box {
    display: block;
    .info-box-title {
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      border-bottom: 1px solid #797979;
      line-height: 48px;
    }
    .info-box-body {
      padding: 5px 18px;
      display: block;
      .title2 {
        line-height: 20px;
        padding: 15px 0 7px;
        font-size: 18px;
        font-weight: bold;
      }
      .line {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        .f {
          width: 100%;
        }
        span {
          line-height: 24px;
          display: block;
          clear: both;
          font-size: 14px;
        }
        .l {
          width: 60%;
        }
        .r {
          width: 40%;
        }
      }
    }
  }
  .b-box {
    display: block;
    padding: 30px;
    border: 1px solid rgba(121, 121, 121, 1);
    border-radius: 5px;
    margin: 20px 0;
    .row {
      display: block;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      b {
        font-size: 24px;
      }
    }
  }
  .right-txt {
    display: block;
    overflow: hidden;
    text-align: right;
    line-height: 30px;
    font-size: 14px;
  }
  .color-box {
    border-radius: 5px;
    background-color: #151515;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 10px;
    .l {
      display: flex;
      flex-direction: column;
      span {
        font-size: 14px;
        color: #ffffff;
        line-height: 25px;
      }
      label {
        font-size: 18px;
        color: #faffa6;
        font-weight: bold;
        line-height: 25px;
      }
    }
    .r {
      display: flex;
      flex-direction: row;
      align-items: center;
      span,
      .pointer,
      .disable {
        width: 150px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #151515;
        text-align: center;
        margin: 0 5px;
        border-radius: 4px;
      }
      span {
        background-color: #e0c5bd;
      }
      span:hover {
        background-color: #f7dfd8;
      }
      .pointer {
        color: white !important;
        background-image: linear-gradient(to right, #20ae98, #0aab50);
      }
      .disable {
        cursor: not-allowed;
        background-color: #2f2f2f;
      }
    }
  }
`;
