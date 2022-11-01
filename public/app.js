window.addEventListener("load", () => {
    let msgButton = document.getElementById("msg-submit");
    msgButton.addEventListener("click", () => {
        let msgText = document.getElementById("msg-input").value;
        console.log(msgText);

        let msgObj = {
            "msg": msgText
        }
        let msgObjectJSON = JSON.stringify(msgObj)

        fetch('/message', {
            method: "POST",
            headers: { "Content-Type": "application/json"
                 },

            body: msgObjectJSON
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    })
    document.getElementById('info-button').addEventListener('click', () => {
            //get info on all the Cows we've had so far
            fetch('/cows')
            .then(resp=> resp.json())
            .then(data => {
                document.getElementById('cow-info').innerHTML = ''
                console.log(data.data)
                for(let i=0;i<data.data.length;i++){
                    let string=data.data[i]
                   let elt= document.createElement('p');
                   elt.innerHTML = string;
                   document.getElementById('cow-info').appendChild(elt);
                }
            })
    }) 
    //send the msgText to the sever
    

    //fetch("/food")
    //.then(resp => resp.json () )
    //.then(data => {
    //  console.log(data);
    // })
})