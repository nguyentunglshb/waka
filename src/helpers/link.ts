export const parseUrlFromWakaToCurrent = (url: string) => {
  //   const origin = window.location.origin;
  return url.replace(/(https?:\/\/)?(www.)?waka.vn/i, "");
};
