import React,{useState,useEffect} from "react";
import axios from "axios"
import "./App.css";

const ShortURL = () => {
    const [longURL,setLongURL] = useState("");
    const [isLongURL,setIsLongURL] = useState(false);
    const [isValid,setIsValid] = useState(true);
    const [chotaURL,setChotaURL] = useState("");
    const [isError, setIsError] = useState(false);
    const [isCopied,setIsCopied] = useState(false);
    
    useEffect(()=> {
        if (longURL === "") {
            setIsLongURL(false);
        }
    },[longURL])

    const HandelShorten = async ()=> {
        const urlRegex = /^(https?|ftp?| http):\/\/[^\s/$.?#].[^\s]*$/;

        try {
            if (urlRegex.test(longURL)) {
                setIsValid(true);
                
                const data = await axios.post(`https://chotaurl.onrender.com/url/shorten`,{longUrl: longURL});
                if (data) {
                    setIsLongURL(true);
                    setChotaURL(data.data.data.shortUrl);
                }
            }
            else {
                setIsValid(false)
            }
        } catch(err) {
            console.log(err);
            setIsValid(true);
            setIsError(true);
        }
    }
    
    const copyToClipboard= async ()=> {
        try {
            navigator.clipboard.writeText(chotaURL)
                .then(()=> {
                    setIsCopied(true);
                })
                .catch((err)=>  {
                    console.log(err)
                })
            
            setTimeout(()=> {
                setIsCopied(false)
            },5000)

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="ShortURL">
            <div className="heading">
                <h1 className="headingData">URL Shortner</h1>
            </div>
            <div className="convertorContainer">
            <div className="convertor">
                <div className="convertorInput">
                    <label htmlFor="convertorHead" className="inputLevel">Shorten a long URL</label>
                    <input 
                        type="text" 
                        placeholder="Enter long link here"
                        className="inputData" 
                        name="longUrl"
                        onChange={(e)=>setLongURL(e.target.value)}
                    />
                    {
                        !isValid &&  
                            <p className="ErrorURL">Please enter a valid URL</p>
                    }
                    {
                        isError &&  
                            <p className="ErrorURL">Something going wrong.</p>
                    }
                </div>
                {
                    isLongURL &&
                        <div className="convertorInput">
                            <label htmlFor="convertorHead" className="inputLevel">Chota URL</label>
                            <div className="innerConverted">
                                <input 
                                    type="text" 
                                    value={chotaURL}
                                    className="inputData convertedInputData" 
                                    name="longUrl" 
                                    disabled 
                                />
                                <button className="copyBtn" onClick={()=>copyToClipboard()}>Copy</button>
                            </div>
                            {
                                isCopied &&  
                                    <p className="SuccessURL">Copied to clipboard</p>
                            }
                         </div>
                }
                <button className="btn" onClick={()=> {HandelShorten()}}>Shorten URL</button>
            </div>
            </div>
        </div>
    )
}

export default ShortURL;