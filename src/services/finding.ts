export const getAllGroupData = () => {
  console.log(process.env);
    // alert(userId)
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return fetch(`${process.env.REACT_APP_API_URL}/finding/group`, {
      method: "GET",
      headers: headers,
    });
  }

  export const getAllRawData = () => {
    // alert(userId)
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return fetch(`${process.env.REACT_APP_API_URL}/finding/raw`, {
      method: "GET",
      headers: headers,
    });
  }