import { TIMEOUT_SEC } from "./config.js";

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`Session has expired after ${s} seconds!`);
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
