
const BASE_URL = "https://playerdb.co/api/player/hytale/";

function buildHeaders(custom = {}) {
  return {
    "Content-Type": "application/json",
    ...custom,
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.message ?? body.error ?? message;
    } catch {}
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function sendGet(path, headers = {}) {
  const res = await fetch(BASE_URL + path, {
    method: "GET",
    headers: buildHeaders(headers),
  });
  return handleResponse(res);
}

export async function post(path, body, headers = {}) {
  const res = await fetch("BASE_URL" + path, {
    method: "POST",
    headers: buildHeaders(headers),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function put(path, body, headers = {}) {
  const res = await fetch(BASE_URL + path, {
    method: "PUT",
    headers: buildHeaders(headers),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function patch(path, body, headers = {}) {
  const res = await fetch(BASE_URL + path, {
    method: "PATCH",
    headers: buildHeaders(headers),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function del(path, headers = {}) {
  const res = await fetch(BASE_URL + path, {
    method: "DELETE",
    headers: buildHeaders(headers),
  });
  return handleResponse(res);
}
