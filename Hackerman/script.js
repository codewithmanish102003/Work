
let content = [
    "Intaializinng hack program....",
    "Finding Username....",
    "User Name Found....",
    "Matching 200K Passwords....",
    "Password Not Matched....",
    "Matching 400K Passwords....",
    "Password Not Matched....",
    "Matching 600K Passwords....",
    "Password Not Matched....",
    "Matching 800K Passwords....",
    "Password Not Matched....",
    "Matching 800K Passwords....",
    "Password Matched....",
    "Successfully Hacked...."
]

const sleep=async (seconds)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {resolve(true) },seconds*1000)
    })
}


const showHack=async (Message)=> {
    await sleep(2)
    text.innerHTML = text.innerHTML + Message + "<br>"
    console.log(Message)
}

let btn=document.getElementById("btn")
btn.addEventListener("click",(async () => {
    for (let i = 0; i < content.length; i++)
       await showHack(content[i])
})
)

