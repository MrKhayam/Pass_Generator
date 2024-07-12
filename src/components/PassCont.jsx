import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const PassCont = () => {
    const [length, setLength] = useState(8);
    const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
    const [isNumberAllowed, setIsNumberAllowed] = useState(false);
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(()=>{
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if(isNumberAllowed) str += '0123456789';
        if(isCharacterAllowed) str += '!@#$%^&*()';


        for(let i = 1; i <= length; i++){
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char);
        }

        setPassword(pass)


    }, [length,isCharacterAllowed,isNumberAllowed,setPassword]);


    useEffect(()=>{
        passwordGenerator();
    },[length,isCharacterAllowed,isNumberAllowed,passwordGenerator]);

    const copyText = useCallback(()=>{
        window.navigator.clipboard.writeText(password);
        toast.success('Password copied to clipboard.')
    },[password])
    
  return (
    <>
      <div className="w-[500px] h-auto p-5 bg-slate-500 rounded-md ">
            <h1 className='text-center text-white font-semibold '>Password Generator</h1>
            
            <div className="inpField my-3 flex w-full">
            <input
            readOnly
            placeholder='Password'
            ref={passwordRef}
            defaultValue={password}
            value={password}
            className='pass p-3 outline-none w-[85%] rounded-l-md h-9'
             type="text" />
             <button
             onClick={copyText}
              className='bg-blue-600 w-[15%] text-white font-semibold rounded-r-md'>Copy</button>
            </div>

            <div className="flex w-full gap-4">
                <div className="lengthInp gap-3 flex">
                <input
                className='cursor-pointer'
                defaultValue={length}
                onChange={(e)=> setLength(e.target.value)}
                id='inpRange'
                 type="range" />
                 <label htmlFor="inpRange" className='text-white'>Length : {length}</label>
                </div>

                <div className="charAllowed flex gap-1">
                <input
                className='cursor-pointer'
                onChange={() => {
                    setIsCharacterAllowed((prev)=>!prev);
                }}
                defaultChecked = {isCharacterAllowed}
                 type="checkbox" name="chk1" id="charAllowed" />
                 <label className='text-white ' htmlFor="charAllowed">Characters</label>
                </div>

                <div className="numAllowed flex gap-1">
                <input
                className='cursor-pointer'
                onChange={() => {
                    setIsNumberAllowed((prev)=>!prev);
                }}
                defaultChecked = {isNumberAllowed}
                 type="checkbox" name="chk1" id="numAllowed" />
                 <label className='text-white ' htmlFor="numAllowed">Numbers</label>
                </div>

            </div>
      </div>
    </>
  );
}

export default PassCont;
