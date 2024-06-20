import md5 from "crypto-js/md5";
import CryptoJS from "crypto-js";
import { api, urlEncrypt } from "@/constants/api";

const MD5 = (str: string) => {
  return md5(str).toString();
};

const encodeStr = (str: string) => {
  return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
};

const createSign = (
  url: keyof typeof api,
  params: Record<string, unknown> = {},
  token: string = "",
  config = {},
) => {
  let paramsString = "";

  urlEncrypt[url].forEach((key) => {
    const valueEncode =
      typeof params[key] === "string"
        ? (params[key] as string).trim()
        : params[key];
    paramsString += ` ${encodeStr(valueEncode as string)}`;
  });

  paramsString = paramsString.slice(1);
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(paramsString, token));
};

const uuid = () => {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};

const generateDeviceId = () => {
  return MD5(uuid());
};

export { MD5, createSign, generateDeviceId };
