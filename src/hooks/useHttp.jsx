import { useState, useCallback } from "react";

export default function useHttp() {
  const [loading, setLoading] = useState(false)
  
  const sendRequest = useCallback(async (reqObj, transformData) => {
    setLoading(true)
    
    try {
      const res = await fetch(reqObj.url, {
        method: reqObj.method ?? "GET",
        header: reqObj.header ?? {},
        body: reqObj.body ?? null,
      });
      
      const data = await res.json();
      
      transformData(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  
  }, [])
  
  return {
    sendRequest,
    loading
  }
  
}