"use client";
// @ts-expect-error-error: Ignore the error regarding khqrData import

import axios from "axios";
import QRCode from "qrcode";
import { BakongKHQR, khqrData, IndividualInfo, SourceInfo } from "bakong-khqr";
import { useEffect, useState } from "react";
import downloadQrcode from "../utils/downloadQrcode";
import { LuDownload } from "react-icons/lu";
import Image from "next/image";
import KHQRLogo from "../assets/KHQR Logo.png";
import { PiHandsPrayingFill } from "react-icons/pi";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Link from "next/link";
export default function Payment() {
  const [qrCode, setQrCode] = useState<string>("");

  const [status, setStatus] = useState<boolean>(false); // Store transaction status
  const [currency, setCurrency] = useState<string>("USD");
  const [deepLink, setDeepLink] = useState<string>("");
  const [paymentData, setPaymentData] = useState({
    name: "",
    amount: "",
  });

  const generateQrcode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(false);
    if (!paymentData.amount) {
      enqueueSnackbar("Pleaes input amount!", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    if (parseFloat(paymentData.amount) < 100 && currency == "KHR") {
      enqueueSnackbar("Amount in KHR cannot be less than 100 KHR", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    // check if amount is string or number
    if (isNaN(parseFloat(paymentData.amount))) {
      enqueueSnackbar("Amount must be a number!", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    const optionalData = {
      currency:
        currency === "USD" ? khqrData.currency.usd : khqrData.currency.khr,
      amount: parseFloat(paymentData.amount) || 1,
      mobileNumber: "85512233455",
      storeLabel: "Coffee Shop",
      terminalLabel: "Cashier_1",
      purposeOfTransaction: "oversea",
      languagePreference: "km",
      merchantNameAlternateLanguage: paymentData.name || "Kimlong Chann",
      merchantCityAlternateLanguage: "ភ្នំពេញ",
      //   upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO",
    };

    const individualInfo = new IndividualInfo(
      "kimlong_chann@aclb",
      "Kimlong Chann",
      "PHNOM PENH",
      optionalData
    );

    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    const qrcode = await QRCode.toDataURL(individual?.data.qr);
    setQrCode(qrcode);
    localStorage.setItem("md5", individual.data.md5); // Store in localStorage

    // deep link

    const url = "https://api-bakong.nbc.gov.kh/v1/generate_deeplink_by_qr"; // Replace with your API URL
    const khqrString = individual?.data.qr; // Replace with the QR data
    const sourceInfo = new SourceInfo(
      "https://kimlongchann.vercel.app/logo.png",
      "Kimlong Chann App",
      "https://kimlongchann.vercel.app/"
    );

    const deeplink = BakongKHQR.generateDeepLink(url, khqrString, sourceInfo);
    deeplink.then((data) => {
      if (data.status.code == 0) {
        console.log(data.data.shortLink);
        setDeepLink(data.data.shortLink);
      } else {
        console.log(data.status.message);
      }
    });
  };

  const checkTransactionStatusByMD5 = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMTc2OTU2MmFiNTVjNDY5NCJ9LCJpYXQiOjE3MzY0MzY3MzYsImV4cCI6MTc0NDIxMjczNn0.XGrA6oESHwt5dr0-wMzRMo5nGxhZFwYqSN9F3b5UEzE";
    const baseUrl = "https://api-bakong.nbc.gov.kh";
    try {
      // Define the endpoint URL
      const endpoint = `${baseUrl}/v1/check_transaction_by_md5`;

      // Configure headers
      const headers = {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        "Content-Type": "application/json", // Ensure JSON content
      };

      console.log("md5", String(localStorage.getItem("md5")));

      // Define the request body
      const body = {
        md5: String(localStorage.getItem("md5")),
      };

      // Make the POST request
      const response = await axios.post(endpoint, body, { headers });

      // Update status from the API response
      const status = response.data?.errorCode === null ? true : false;
      setStatus(status);
      // console.log("res", response.data);
    } catch (error: any) {
      // Handle errors
      console.error(
        "Error checking transaction status:",
        error.response?.data || error.message
      );
      throw error; // Re-throw to allow further error handling
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
    if (name == "amount") {
      setQrCode("");
      setDeepLink("");
      setStatus(false);
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    setPaymentData((prev) => ({ ...prev, amount: "" }));
    setQrCode("");
    setDeepLink("");
    setStatus(false);
  };

  useEffect(() => {
    // Check the transaction status every 5 seconds

    const intervalId = setInterval(() => {
      if (qrCode !== "") {
        checkTransactionStatusByMD5();
        // console.log("Checking transaction status...");
      }
    }, 5000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [qrCode]); // Empty dependency array ensures the interval starts on mount

  return (
    <>
      <div
        id="payment"
        className="min-h-screen flex items-center justify-center text-white p-6"
      >
        <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-black/20 border">
          <div>
            {/* Currency Toggle */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => handleCurrencyChange("USD")}
                className={`px-4 py-2 border border-white rounded-l-md ${
                  currency === "USD" && "bg-red-500 font-bold"
                }`}
              >
                USD
              </button>
              <button
                onClick={() => handleCurrencyChange("KHR")}
                className={`px-4 py-2 border border-white rounded-r-md ${
                  currency === "KHR" && "bg-red-500 font-bold"
                }`}
              >
                KHR
              </button>
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl font-bold mb-4">
              Payment System for KimlongZ
            </h1>

            {/* Input Fields */}
            <form onSubmit={generateQrcode} className="space-y-4">
              <input
                type="text"
                name="name"
                onChange={handleOnChange}
                value={paymentData.name}
                placeholder="Your cute name"
                className="w-full px-4 py-2 border rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                onChange={handleOnChange}
                name="amount"
                value={paymentData.amount}
                placeholder={
                  currency === "USD" ? "Amount in USD" : "Amount in KHR"
                }
                className="w-full px-4 py-2 border rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                Generate QR Code ({currency === "USD" ? "$" : "៛"})
              </button>
            </form>
          </div>

          {!status ? (
            <div>
              {deepLink !== "" && (
                <div className="text-center font-bakong mt-6 text-sx ">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={deepLink}
                  >
                    🔗 Click here to pay in Bakong mobile app
                  </Link>
                  <p>
                    or simply scan the{" "}
                    <span className="font-bakong text-bakong-red font-bold">
                      KHQR
                    </span>{" "}
                    down below with any banking apps in cambodia (member of
                    Bakong)
                  </p>
                </div>
              )}
              {qrCode && (
                <div className="mt-6 font-bakong">
                  <div
                    id={`erobot_khqr`}
                    style={{ backgroundColor: "white" }}
                    className="rounded-2xl shadow-lg px-14 py-10 grid place-content-center bg-white"
                  >
                    <div className="rounded-2xl shadow-lg w-[265px] border border-gray-200/50">
                      {/* Header */}
                      <div className="bg-bakong-red  py-4 rounded-t-2xl grid place-content-center">
                        <Image
                          src={KHQRLogo}
                          alt="QR Code"
                          className="w-[60px]"
                          width={100}
                          height={100}
                        />
                      </div>

                      {/* Card Content */}
                      <div className="bg-white">
                        <p className="text-lg font-semibold  text-gray-800 px-8">
                          Kimlong Chann
                        </p>
                        <p className="text-2xl font-bold text-gray-800 font-bakong flex justify-start items-center gap-4 px-8 -my-1.5 break-all">
                          {parseFloat(paymentData.amount)}{" "}
                          <small className="text-xs font-normal">
                            {currency}
                          </small>
                        </p>

                        <div className="text-gray-400 text-center ">
                          ----------------------------------
                        </div>
                        {/* QR Code */}
                        <div className="mb-3 w-full flex justify-center ">
                          <Image
                            src={qrCode}
                            alt="QR Code"
                            className="min-w-[220px] "
                            width={192}
                            height={192}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-center text-gray-500 w-[265px] mt-5">
                      Scan with any Mobile Banking App supporting KHQR
                    </div>
                  </div>

                  <button
                    className="mt-2 w-full flex justify-center items-center gap-3 px-4 py-3 bg-bakong-red text-white font-medium text-sm rounded-xl hover:bg-blue-600 "
                    onClick={() => {
                      downloadQrcode({
                        currency: currency,
                        amount: paymentData.amount,
                      });
                    }}
                  >
                    <LuDownload /> Download QR
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-green-100 p-6 rounded-lg text-center shadow-md mt-5">
              <div className="text-center mb-3 p-4=2 bg-white rounded-full border w-[100px] h-[100px] grid place-content-center mx-auto shadow-md">
                <span className="text-[70px] text-green-700">
                  <PiHandsPrayingFill />
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-green-700">
                Thank you, {paymentData.name || "Sir/Madam"}!
              </h2>
              <p className="text-lg text-gray-700 mt-2">
                We greatly appreciate your generous donation of{" "}
                <span className="font-bold text-green-700">
                  {parseFloat(paymentData.amount)} {currency}
                </span>
                . <br /> Your generosity enables us to continue our work and
                make a lasting impact. May it be returned to you a thousand
                times, and may you always be blessed with health, happiness, and
                success.
              </p>
            </div>
          )}
          <SnackbarProvider />
        </div>
      </div>

      {/* <div className="flex items-center justify-center min-h-screen bg-blue-100 font-bakong">
        <div className="bg-white rounded-2xl shadow-lg px-14 py-10 grid place-content-center">
          <div className="bg-white rounded-2xl py-1 shadow-lg w-[265px]">
            {/* Header 
            <div className="bg-bakong-red  py-4 rounded-t-2xl grid place-content-center">
              <Image
                src={KHQRLogo}
                alt="QR Code"
                className="w-[60px]"
                width={100}
                height={100}
              />
            </div>

            Card Content
            <div className="">
              <p className="text-lg font-semibold  text-gray-800 px-8">
                Kimlong Chann
              </p>
              <p className="text-2xl font-bold text-gray-800 font-bakong flex justify-start items-center gap-4 px-8 -my-1.5">
                {paymentData.amount}{" "}
                <small className="text-xs font-normal">{currency}</small>
              </p>

              <div className="text-gray-400 text-center ">
                ----------------------------------
              </div>
              {/* QR Code 
              <div className="mb-3 w-full flex justify-center ">
                <Image
                  src={qrCode}
                  alt="QR Code"
                  className="min-w-[220px] "
                  width={192}
                  height={192}
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-gray-500 w-[265px] mt-5">
            Scan with any Mobile Banking App supporting KHQR
          </div>
        </div>
      </div> */}
    </>
  );
}
